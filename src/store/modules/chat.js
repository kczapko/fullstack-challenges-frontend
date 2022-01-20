import api from '@/api';

import Message from '@/utils/Message';

const PER_PAGE = 30;

const ACTION_NEW_MEMBER = 'NEW_MEMBER';
const ACTION_NEW_MESSAGE = 'NEW_MESSAGE';
const ACTION_NEW_CHANNEL = 'NEW_CHANNEL';
const ACTION_JOINED_CHANNEL = 'JOIN_CHANNEL';
const ACTION_CHAT_ERROR = 'CHAT_ERROR';
const ACTION_STATUS_CHANGED = 'STATUS_CHANGE';
const ACTION_MESSAGE_UPDATED = 'UPDATE_MESSAGE';

export default {
  namespaced: true,
  state() {
    return {
      channels: [],
      activeChannel: null,
      messages: [],
      unsubscribe: [],
      messageAudio: null,
      clientConnectionStatus: '',
      wasClosed: false,
      skip: 0,
      perPage: PER_PAGE,
      total: 0,
      password: '',
    };
  },
  mutations: {
    setChannels(state, payload) {
      state.channels = payload;
    },
    addChannel(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      state.channels.push({ _id: payload._id, name: payload.name, isPrivate: payload.isPrivate });
    },
    removeChannel(state, payload) {
      const index = state.channels.findIndex((c) => c.name === payload);
      if (index > -1) state.channels.splice(index, 1);
    },
    setMessages(state, payload) {
      state.skip += state.perPage;
      state.total = payload.total;
      state.messages = payload.messages.reverse();
    },
    addMessages(state, payload) {
      state.skip += state.perPage;
      state.total = payload.total;
      state.messages.unshift(...payload.messages.reverse());
    },
    addChatMessage(state, payload) {
      state.skip += 1;
      state.total += 1;
      state.messages.push(payload);
    },
    updateChatMessage(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      const message = state.messages.find((m) => m._id === payload._id);
      if (message) message.meta = payload.meta;
    },
    setUnsubscribe(state, payload) {
      state.unsubscribe = payload;
    },
    addUnsubscribe(state, payload) {
      state.unsubscribe.push(payload);
    },
    removeUnsubscribe(state, payload) {
      let index = state.unsubscribe.findIndex((u) => u.name === payload);
      while (index > -1) {
        state.unsubscribe.splice(index, 1);
        index = state.unsubscribe.findIndex((u) => u.name === payload);
      }
    },
    setChannel(state, payload) {
      state.activeChannel = payload;
    },
    leaveChannel(state, payload) {
      if (payload) {
        state.activeChannel = null;
      }
      state.messages = [];
      state.skip = 0;
      state.perPage = PER_PAGE;
      state.total = 0;
      state.password = '';
    },
    addChannelMember(state, payload) {
      state.activeChannel.members.push(payload);
    },
    setMessageAudio(state, payload) {
      state.messageAudio = payload;
    },
    setClientConnectionStatus(state, payload) {
      state.clientConnectionStatus = payload;
    },
    setWasClosed(state, payload) {
      state.wasClosed = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
    },
    updateUserStatus(state, payload) {
      if (state.activeChannel) {
        const member = state.activeChannel.members.find((m) => m.username === payload.username);
        if (member) member.online = payload.online;
      }
    },
  },
  actions: {
    async getChannels({ commit }) {
      const res = await api.chat.getChannels();

      commit('setChannels', res.data.data.getChannels);
    },
    async addChannel(_, payload) {
      await api.chat.addChannel(payload);
    },
    removeChannel({ commit }, payload) {
      commit('removeChannel', payload);
    },
    async connectChannel({ commit, dispatch }, payload) {
      commit('setChannel', payload.channel);
      if (payload.password) dispatch('setPassword', payload.password);
      await dispatch('getChannelMessages');
      dispatch('addMessage', new Message(`Joined ${payload.channel.name} channel`), {
        root: true,
      });
    },
    async getChannelMessages({ commit, state, dispatch }) {
      if (!state.activeChannel) throw new Error('You must select channel to get messages.');

      try {
        const res = await api.chat.getMessages({
          // eslint-disable-next-line no-underscore-dangle
          channelId: state.activeChannel._id,
          skip: state.skip,
          perPage: state.perPage,
          password: state.password,
        });

        if (state.skip === 0) {
          commit('setMessages', res.data.data.getMessages);
        } else {
          commit('addMessages', res.data.data.getMessages);
        }
      } catch (err) {
        dispatch('addMessage', new Message(err.message, 'error'), { root: true });
      }
    },
    async addChatMessage({ state }, payload) {
      if (!state.activeChannel) throw new Error('You must select channel to send a message.');
      if (state.clientConnectionStatus !== 'connected') throw new Error('You are not connected.');

      await api.chat.addMessage({
        msg: payload.message,
        // eslint-disable-next-line no-underscore-dangle
        channelId: state.activeChannel._id,
      });
    },
    // eslint-disable-next-line object-curly-newline
    async joinChannel({ commit, rootGetters, state, dispatch }, payload) {
      dispatch('setLoading', true, { root: true });

      try {
        const params = {};

        if (typeof payload === 'string') {
          params.name = payload;
          params.password = '';
        } else {
          params.name = payload.name;
          params.password = payload.password;
        }

        await api.chat.joinChannel(
          {
            ...params,
            token: rootGetters.token,
          },
          async (data) => {
            if (data.errors) throw data.errors;
            dispatch('setLoading', false, { root: true });
            // prettier-ignore
            const {
              type,
              member,
              channel,
              message,
              error,
            } = data.data.joinChannel;

            switch (type) {
              case ACTION_CHAT_ERROR:
                dispatch('addMessage', new Message(error, 'error'), { root: true });
                dispatch('unsubscribeChannel', params.name);
                if (error === 'Channel not found!') {
                  commit('removeChannel', params.name);
                }
                break;
              case ACTION_JOINED_CHANNEL:
                if (state.activeChannel) {
                  if (state.wasClosed) {
                    dispatch('setWasClosed', false);

                    if (state.activeChannel.name === params.name) {
                      commit('leaveChannel', false);
                      await dispatch('connectChannel', {
                        channel: state.activeChannel,
                        password: params.password,
                      });
                    } else {
                      commit('leaveChannel', true);
                      await dispatch('connectChannel', {
                        channel,
                        password: params.password,
                      });
                    }
                  } else {
                    dispatch('unsubscribeChannel', state.activeChannel.name);
                    commit('leaveChannel', true);
                  }
                } else {
                  await dispatch('connectChannel', {
                    channel,
                    password: params.password,
                  });
                }
                break;
              case ACTION_NEW_MEMBER:
                commit('addChannelMember', member);
                break;
              case ACTION_NEW_CHANNEL:
                commit('addChannel', channel);
                break;
              case ACTION_NEW_MESSAGE:
                commit('addChatMessage', message);
                dispatch('sendNewMessageNotification', message);
                break;
              case ACTION_STATUS_CHANGED:
                dispatch('updateUserStatus', member);
                break;
              case ACTION_MESSAGE_UPDATED:
                commit('updateChatMessage', message);
                break;
              default:
                break;
            }
          },
          (name, unsubscribe) => {
            commit('addUnsubscribe', { name, unsubscribe });
          },
        );
      } catch (err) {
        dispatch('setLoading', false, { root: true });

        if (Array.isArray(err)) {
          const error = err[0];
          const { message } = error;

          // prettier-ignore
          if (
            message === 'Wrong token'
            || message === 'Token expired'
            || message === 'Your account has been blocked.'
            || message === 'User does not exist or was deleted.'
            || message === 'You recently changed password. Please login again.'
          ) {
            dispatch('auth/setAuthError', error, { root: true });
            await this.$logoutUser();
          } else {
            dispatch('unsubscribeAllChannels');
            commit('leaveChannel', true);
            dispatch('addMessage', new Message(message, 'error'), { root: true });
          }
        }
      }
    },
    setMessageAudio({ commit }, payload) {
      commit('setMessageAudio', payload);
    },
    playMessageAudio({ state }) {
      if (state.messageAudio) {
        state.messageAudio.currentTime = 0;
        state.messageAudio.play();
      }
    },
    setClientConnectionStatus({ commit }, payload) {
      commit('setClientConnectionStatus', payload);
    },
    sendNewMessageNotification({ rootGetters, dispatch }, payload) {
      if (rootGetters.pageVisible === 'hidden') {
        const title = `${payload.user.username} ${
          payload.type === 'image' ? 'add image.' : 'wrote:'
        }`;
        const options = {};
        if (payload.type === 'message') options.body = payload.message;
        if (payload.type === 'image') options.image = payload.message;
        if (payload.user.photo) options.icon = payload.user.photo;
        dispatch(
          'sendNotification',
          {
            title,
            options,
          },
          { root: true },
        );
      }

      if (
        // prettier-ignore
        rootGetters.pageVisible === 'visible'
        || rootGetters.notificationsPermission !== 'granted'
      ) {
        dispatch('playMessageAudio');
      }
    },
    unsubscribeChannel({ state, commit }, payload) {
      if (state.unsubscribe.length) {
        state.unsubscribe.forEach((u) => u.name === payload && u.unsubscribe());
        commit('removeUnsubscribe', payload);
      }
    },
    unsubscribeAllChannels({ state, commit }) {
      if (state.unsubscribe.length) {
        state.unsubscribe.forEach((u) => u.unsubscribe());
        commit('setUnsubscribe', []);
      }
    },
    setWasClosed({ commit }, payload) {
      commit('setWasClosed', payload);
    },
    setPassword({ commit }, payload) {
      commit('setPassword', payload);
    },
    updateUserStatus({ commit }, payload) {
      commit('updateUserStatus', payload);
    },
  },
};

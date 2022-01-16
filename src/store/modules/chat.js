import api from '@/api';

import Message from '@/utils/Message';

const PER_PAGE = 50;

const ACTION_NEW_MEMBER = 'NEW_MEMBER';
const ACTION_NEW_MESSAGE = 'NEW_MESSAGE';
const ACTION_NEW_CHANNEL = 'NEW_CHANNEL';
const ACTION_JOINED_CHANNEL = 'JOIN_CHANNEL';
const ACTION_CHAT_ERROR = 'CHAT_ERROR';

export default {
  namespaced: true,
  state() {
    return {
      channels: [],
      activeChannel: null,
      messages: [],
      unsubscribe: [],
      messageAudio: null,
      clientConntionStatus: '',
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
        state.password = '';
      }
      state.messages = [];
      state.skip = 0;
      state.perPage = PER_PAGE;
      state.total = 0;
    },
    addChannelMember(state, payload) {
      state.activeChannel.members.push(payload);
    },
    setMessageAudio(state, payload) {
      state.messageAudio = payload;
    },
    setClientConntionStatus(state, payload) {
      state.clientConntionStatus = payload;
    },
    setWasClosed(state, payload) {
      state.wasClosed = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
    },
  },
  actions: {
    async getChannels({ commit }) {
      const res = await api.chat.getChannels();

      commit('setChannels', res.data.data.getChannels);
    },
    async addChannel({ commit }, payload) {
      const res = await api.chat.addChannel(payload);

      commit('addChannel', res.data.data.addChannel);
    },
    removeChannel({ commit }, payload) {
      commit('removeChannel', payload);
    },
    async reconnectChannel({ commit, dispatch }, payload) {
      dispatch('setWasClosed', false);
      commit('leaveChannel', false);
      commit('setChannel', payload);
      await dispatch('getChannelMessages');
      dispatch('addMessage', new Message(`Joined ${payload.name} channel`), {
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
    async addChatMessage({ commit, state }, payload) {
      if (!state.activeChannel) throw new Error('You must select channel to send a message.');
      if (state.clientConntionStatus !== 'connected') throw new Error('You are not connected.');

      const res = await api.chat.addMessage({
        msg: payload.message,
        // eslint-disable-next-line no-underscore-dangle
        channelId: state.activeChannel._id,
      });

      commit('addChatMessage', res.data.data.addMessage);
    },
    // eslint-disable-next-line object-curly-newline
    async joinChannel({ commit, rootGetters, state, dispatch }, payload) {
      dispatch('setLoading', true, { root: true });

      try {
        const params = {};

        if (typeof payload === 'string') {
          params.name = payload;
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
            // prettier-ignore
            const {
              type,
              member,
              channel,
              message,
              error,
            } = data.data.joinChannel;

            // console.log(data.data.joinChannel);

            switch (type) {
              case ACTION_CHAT_ERROR:
                dispatch('setLoading', false, { root: true });
                dispatch('addMessage', new Message(error, 'error'), { root: true });
                dispatch('unsubscribe', params.name);
                if (error === 'Channel not found!') {
                  commit('removeChannel', params.name);
                }
                break;
              case ACTION_JOINED_CHANNEL:
                if (state.activeChannel) {
                  if (state.wasClosed) {
                    if (state.activeChannel.name === params.name) {
                      if (params.password) dispatch('setPassword', params.password);
                      await dispatch('reconnectChannel', state.activeChannel);
                    } else {
                      dispatch('setWasClosed', false);
                      commit('leaveChannel', true);
                      commit('setChannel', channel);
                      if (params.password) dispatch('setPassword', params.password);
                      await dispatch('getChannelMessages');
                      dispatch('addMessage', new Message(`Joined ${channel.name} channel`), {
                        root: true,
                      });
                    }
                  } else {
                    dispatch('unsubscribe', state.activeChannel.name);
                    commit('leaveChannel', true);
                  }
                } else {
                  commit('setChannel', channel);
                  if (params.password) dispatch('setPassword', params.password);
                  await dispatch('getChannelMessages');
                  dispatch('addMessage', new Message(`Joined ${channel.name} channel`), {
                    root: true,
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
            dispatch('unsubscribeAll');
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
    setClientConntionStatus({ commit }, payload) {
      commit('setClientConntionStatus', payload);
    },
    sendNewMessageNotification({ rootGetters, dispatch }, payload) {
      if (rootGetters.pageVisible === 'hidden') {
        const title = `${payload.user.username} wrote:`;
        const options = { body: payload.message };
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
    unsubscribe({ state, commit }, payload) {
      if (state.unsubscribe.length) {
        state.unsubscribe.forEach((u) => u.name === payload && u.unsubscribe());
        commit('removeUnsubscribe', payload);
      }
    },
    unsubscribeAll({ state, commit }) {
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
  },
};

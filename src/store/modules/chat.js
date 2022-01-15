import api from '@/api';

import Message from '@/utils/Message';

const PER_PAGE = 50;

export default {
  namespaced: true,
  state() {
    return {
      channels: [],
      activeChannel: null,
      messages: [],
      unsubscribe: null,
      messageAudio: null,
      clientConntionStatus: '',
      skip: 0,
      perPage: PER_PAGE,
      total: 0,
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
    setChannel(state, payload) {
      state.activeChannel = payload;
    },
    leaveChannel(state) {
      state.activeChannel = null;
      state.messages = [];
      state.unsubscribe = null;
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
    async getChannelMessages({ commit, state }) {
      if (!state.activeChannel) throw new Error('You must select channel to get messages.');

      const res = await api.chat.getMessages({
        // eslint-disable-next-line no-underscore-dangle
        channelId: state.activeChannel._id,
        skip: state.skip,
        perPage: state.perPage,
      });

      if (state.skip === 0) {
        commit('setMessages', res.data.data.getMessages);
      } else {
        commit('addMessages', res.data.data.getMessages);
      }
    },
    async addChatMessage({ commit, state }, payload) {
      if (!state.activeChannel) throw new Error('You must select channel to send a message.');

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

      if (state.activeChannel) {
        dispatch('unsubscribe');
        commit('leaveChannel');
      }

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
          (data) => {
            if (data.errors) throw data.errors;
            // prettier-ignore
            const {
              type,
              member,
              channel,
              message,
            } = data.data.joinChannel;

            switch (type) {
              case 'JOIN_CHANNEL':
                commit('setChannel', channel);
                dispatch('getChannelMessages');
                dispatch('addMessage', new Message(`Joined ${channel.name} channel`), {
                  root: true,
                });
                break;
              case 'NEW_MEMBER':
                commit('addChannelMember', member);
                break;
              case 'NEW_CHANNEL':
                commit('addChannel', channel);
                break;
              case 'NEW_MESSAGE':
                commit('addChatMessage', message);
                dispatch('playMessageAudio');
                dispatch('sendNewMessageNotification', message);
                break;
              default:
                break;
            }
          },
          (unsubscribe) => {
            commit('setUnsubscribe', unsubscribe);
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
    },
    unsubscribe({ state }) {
      if (state.unsubscribe) state.unsubscribe();
    },
  },
  getters: {},
};

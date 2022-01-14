import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {
      channels: [],
      activeChannel: null,
      messages: [],
      unsubscribe: null,
    };
  },
  mutations: {
    setChannels(state, payload) {
      state.channels = payload;
    },
    addChannel(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      state.channels.push({ _id: payload._id, name: payload.name });
    },
    setMessages(state, payload) {
      state.messages = payload;
    },
    addMessage(state, payload) {
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
    },
    addChannelMember(state, payload) {
      state.activeChannel.members.push(payload);
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
      });
      commit('setMessages', res.data.data.getMessages);
    },
    async addChatMessage({ commit, state }, payload) {
      if (!state.activeChannel) throw new Error('You must select channel to send a message.');

      const res = await api.chat.addMessage({
        msg: payload.message,
        // eslint-disable-next-line no-underscore-dangle
        channelId: state.activeChannel._id,
      });

      commit('addMessage', res.data.data.addMessage);
    },
    // eslint-disable-next-line object-curly-newline
    async joinChannel({ commit, rootGetters, state, dispatch }, payload) {
      if (state.activeChannel) {
        state.unsubscribe();
        commit('leaveChannel');
      }

      try {
        await api.chat.joinChannel(
          {
            name: payload,
            token: rootGetters.token,
          },
          (data) => {
            // prettier-ignore
            const {
              type,
              member,
              channel,
              message,
            } = data.data.joinChannel;

            if (data.errors) throw data.errors;

            switch (type) {
              case 'JOIN_CHANNEL':
                commit('setChannel', channel);
                dispatch('getChannelMessages');
                break;
              case 'NEW_MEMBER':
                commit('addChannelMember', member);
                break;
              case 'NEW_CHANNEL':
                commit('addChannel', channel);
                break;
              case 'NEW_MESSAGE':
                commit('addMessage', message);
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
        console.log('socket error');
        console.log(err);
      }
    },
  },
  getters: {},
};

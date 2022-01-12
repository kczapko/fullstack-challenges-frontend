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
      state.channels.push(payload);
    },
    addMessage(state, payload) {
      state.messages.push(payload);
    },
    setUnsubscribe(state, payload) {
      state.unsubscribe = payload;
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
    async addChatMessage({ commit }, payload) {
      const res = await api.chat.addMessage({
        msg: payload.message,
      });

      commit('addMessage', res.data.data.addMessage);
    },
    async joinChannel({ commit, rootGetters }, payload) {
      try {
        await api.chat.joinChannel(
          {
            name: payload,
            token: rootGetters.token,
          },
          (data) => {
            console.log('socket data');
            console.log(data);
            if (data.errors) throw data.errors;
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

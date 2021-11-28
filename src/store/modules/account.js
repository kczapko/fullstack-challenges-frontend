import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {};
  },
  actions: {
    async confirmEmail({ commit }, payload) {
      const res = await api.account.confirmEmail(payload);

      if (res.data.data.confirmEmail) {
        commit('confirmEmail', null, { root: true });
      }

      return res.data.data.confirmEmail;
    },
  },
};

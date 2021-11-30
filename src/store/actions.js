export default {
  setPageTitle({ commit }, payload) {
    commit('setPageTitle', payload);
  },
  addBodyClass({ commit }, payload) {
    commit('addBodyClass', payload);
  },
  removeBodyClass({ commit }, payload) {
    commit('removeBodyClass', payload);
  },
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
  },
  addMessage({ commit }, payload) {
    commit('addMessage', payload);

    setTimeout(() => {
      commit('removeMessage', payload.id);
    }, 5000);
  },
};

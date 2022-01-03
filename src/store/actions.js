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
  setColorSchema({ commit, dispatch }, payload) {
    let colorSchema = payload;

    if (colorSchema === 'dark') {
      dispatch('addBodyClass', 'dark');
    } else if (colorSchema === 'light') {
      dispatch('removeBodyClass', 'dark');
    } else {
      colorSchema = 'auto';
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dispatch('addBodyClass', 'dark');
      } else {
        dispatch('removeBodyClass', 'dark');
      }
    }
    commit('setColorSchema', colorSchema);
  },
};

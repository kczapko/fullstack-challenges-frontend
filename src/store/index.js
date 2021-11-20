import { createStore } from 'vuex';

import auth from './modules/auth';

export default createStore({
  state() {
    return {
      pageTitle: '',
      bodyClasses: [],
    };
  },
  mutations: {
    setPageTitle(state, payload) {
      state.pageTitle = payload;
    },
    addBodyClass(state, payload) {
      state.bodyClasses.push(payload);
    },
    removeBodyClass(state, payload) {
      const index = state.bodyClasses.indexOf(payload);
      if (index >= 0) state.bodyClasses.splice(index, 1);
    },
  },
  actions: {
    setPageTitle({ commit }, payload) {
      commit('setPageTitle', payload);
    },
    addBodyClass({ commit }, payload) {
      commit('addBodyClass', payload);
    },
    removeBodyClass({ commit }, payload) {
      commit('removeBodyClass', payload);
    },
  },
  modules: {
    auth,
  },
});

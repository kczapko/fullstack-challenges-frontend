import { createStore } from 'vuex';

import auth from './modules/auth';

export default createStore({
  state() {
    return {
      loggedIn: false,
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
      state.bodyClasses.splice(state.bodyClasses.indexOf(payload), 1);
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

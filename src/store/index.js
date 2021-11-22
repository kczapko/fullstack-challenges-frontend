import { createStore } from 'vuex';

import auth from './modules/auth';

export default createStore({
  state() {
    return {
      pageTitle: '',
      bodyClasses: [],
      loading: false,
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
    setLoading(state, payload) {
      state.loading = payload;
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
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
  },
  modules: {
    auth,
  },
});

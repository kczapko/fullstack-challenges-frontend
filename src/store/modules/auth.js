import axios from '../../api/axios';
import api from '../../api';

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      token: '',
      user: {},
    };
  },
  mutations: {
    loginUser(state, payload) {
      state.loggedIn = true;
      state.user = payload.user;
      state.token = payload.token;

      localStorage.setItem('token', payload.token);
      axios.defaults.headers.common.authorization = `Bearer ${payload.token}`;
    },
  },
  actions: {
    async signup({ commit }, payload) {
      const res = await api.auth.signup(payload);

      commit('loginUser', res.data.data.signup);
    },
    async login({ commit }, payload) {
      const res = await api.auth.login(payload);

      commit('loginUser', res.data.data.login);
    },
    async signinWithGoogle({ commit }, payload) {
      const res = await api.auth.signinWithGoogle(payload);

      commit('loginUser', res.data.data.signinWithGoogle);
    },
  },
  getters: {},
};

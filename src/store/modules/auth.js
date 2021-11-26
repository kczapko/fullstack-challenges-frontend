import axios from '@/api/axios';
import api from '@/api';
import { username, initials } from '@/utils/user';

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      token: '',
      user: {},
      authError: null,
    };
  },
  mutations: {
    loginUser(state, payload) {
      state.loggedIn = true;
      state.user = payload.user;
      state.token = payload.token;

      localStorage.setItem('token', payload.token);
      axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
    },
    logoutUser(state) {
      state.loggedIn = false;
      state.user = {};
      state.token = '';

      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    },
    setAuthError(state, payload) {
      state.authError = payload;
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
    async autologin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.auth.autologin(token);
        const data = res.data.data.autologin;

        if (data) {
          commit('loginUser', { user: data.user, token });
        }
      } catch (e) {
        // fall off silently
        localStorage.removeItem('token');
      }
    },
    async signinWithGoogle({ commit }, payload) {
      const res = await api.auth.signinWithGoogle(payload);

      commit('loginUser', res.data.data.signinWithGoogle);
    },
    async signinWithFacebook({ commit }, payload) {
      const res = await api.auth.signinWithFacebook(payload);

      commit('loginUser', res.data.data.signinWithFacebook);
    },
    async authWithTwitter() {
      const res = await api.auth.authWithTwitter();

      document.location.href = res.data.data.authWithTwitter;
    },
    async signinWithTwitter({ commit }, payload) {
      const res = await api.auth.signinWithTwitter(payload);

      commit('loginUser', res.data.data.signinWithTwitter);
    },
    async authWithGithub() {
      const res = await api.auth.authWithGithub();

      sessionStorage.setItem('githubState', res.data.data.authWithGithub.state);
      document.location.href = res.data.data.authWithGithub.url;
    },
    async signinWithGithub({ commit }, payload) {
      if (payload.state !== sessionStorage.getItem('githubState')) return;

      sessionStorage.removeItem('githubState');
      const res = await api.auth.signinWithGithub(payload.code);

      commit('loginUser', res.data.data.signinWithGithub);
    },
    setAuthError({ commit }, payload) {
      commit('setAuthError', payload);
    },
    logout({ commit }) {
      commit('logoutUser');
    },
  },
  getters: {
    username(state) {
      return username(state.user);
    },
    initials(state, getters) {
      return initials(getters.username);
    },
  },
};

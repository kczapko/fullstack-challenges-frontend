import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {
      authError: null,
    };
  },
  mutations: {
    setAuthError(state, payload) {
      state.authError = payload;
    },
  },
  actions: {
    async signup({ commit }, payload) {
      const res = await api.auth.signup(payload);

      commit('loginUser', res.data.data.signup, { root: true });
    },
    async login({ commit }, payload) {
      const res = await api.auth.login(payload);

      commit('loginUser', res.data.data.login, { root: true });
    },
    async autologin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.auth.autologin(token);
        const data = res.data.data.autologin;

        if (data) {
          commit('loginUser', { user: data.user, token }, { root: true });
        }
      } catch (e) {
        // fall off silently
        localStorage.removeItem('token');
      }
    },
    async signinWithGoogle({ commit }, payload) {
      const res = await api.auth.signinWithGoogle(payload);

      commit('loginUser', res.data.data.signinWithGoogle, { root: true });
    },
    async signinWithFacebook({ commit }, payload) {
      const res = await api.auth.signinWithFacebook(payload);

      commit('loginUser', res.data.data.signinWithFacebook, { root: true });
    },
    async authWithTwitter() {
      const res = await api.auth.authWithTwitter();

      document.location.href = res.data.data.authWithTwitter;
    },
    async signinWithTwitter({ commit }, payload) {
      const res = await api.auth.signinWithTwitter(payload);

      commit('loginUser', res.data.data.signinWithTwitter, { root: true });
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

      commit('loginUser', res.data.data.signinWithGithub, { root: true });
    },
    setAuthError({ commit }, payload) {
      commit('setAuthError', payload);
    },
    logout({ commit }) {
      commit('logoutUser', null, { root: true });
    },
  },
};

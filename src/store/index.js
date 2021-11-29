import { createStore } from 'vuex';

import axios from '@/api/axios';
import { username, initials } from '@/utils/user';

import auth from './modules/auth';
import account from './modules/account';

let errorInterceptor;

export default createStore({
  state() {
    return {
      pageTitle: '',
      bodyClasses: [],
      loading: false,
      loggedIn: false,
      user: {},
      messages: [],
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
    loginUser(state, payload) {
      state.loggedIn = true;
      state.user = payload.user;

      localStorage.setItem('token', payload.token);
      axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
      errorInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          // eslint-disable-next-line operator-linebreak
          const message =
            error.response?.data?.errors[0]?.message || error.response?.message || error.message;
          if (message === 'Wrong token' || message === 'Token expired') await this.$logoutUser();
          return Promise.reject(error);
        },
      );
    },
    logoutUser(state) {
      state.loggedIn = false;
      state.user = {};

      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      axios.interceptors.response.eject(errorInterceptor);
    },
    updateUser(state, payload) {
      const fileds = ['email', 'name', 'photo'];
      const payloadKeys = Object.keys(payload);
      fileds.forEach((field) => {
        if (payloadKeys.includes(field)) state.user[field] = payload[field];
      });
    },
    confirmEmail(state) {
      state.user.emailConfirmed = true;
    },
    addMessage(state, payload) {
      state.messages.unshift(payload);
    },
    removeMessage(state, payload) {
      const index = state.messages.findIndex((m) => m.id === payload);

      if (index >= 0) state.messages.splice(index, 1);
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
    addMessage({ commit }, payload) {
      commit('addMessage', payload);

      setTimeout(() => {
        commit('removeMessage', payload.id);
      }, 5000);
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
  modules: {
    auth,
    account,
  },
});

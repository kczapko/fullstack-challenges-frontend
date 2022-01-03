import { createStore } from 'vuex';

import axios from '@/api/axios';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import auth from './modules/auth';
import account from './modules/account';

const store = createStore({
  state() {
    return {
      pageTitle: '',
      bodyClasses: [],
      loading: false,
      loggedIn: false,
      user: {},
      messages: [],
      colorSchema: 'auto',
    };
  },
  mutations,
  actions,
  getters,
  modules: {
    auth,
    account,
  },
});

/* axios loading interceptors */
axios.interceptors.request.use(
  (config) => {
    store.dispatch('setLoading', true);
    return config;
  },
  (error) => {
    store.dispatch('setLoading', false);
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => {
    store.dispatch('setLoading', false);
    return response;
  },
  (error) => {
    store.dispatch('setLoading', false);
    return Promise.reject(error);
  },
);

export default store;

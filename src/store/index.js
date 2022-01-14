import { createStore } from 'vuex';

import axios from '@/api/axios';
import wsClient from '@/api/wsClient';

import Message from '@/utils/Message';

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
      token: null,
      messages: [],
      colorSchema: 'auto',
      pageVisible: null,
      notificationsPermission: false,
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

/* wsclient status */
wsClient.on('connecting', () => {
  if (store.hasModule('chat')) {
    store.dispatch('chat/setClientConntionStatus', 'connecting');
  }
});

wsClient.on('connected', () => {
  if (store.hasModule('chat')) {
    store.dispatch('chat/setClientConntionStatus', 'connected');
  }
});

wsClient.on('closed', (err) => {
  if (store.hasModule('chat')) {
    store.dispatch('chat/setClientConntionStatus', 'closed');
  }
  store.dispatch(
    'addMessage',
    new Message(`Connection lost. ${err.reason ? `Reason: ${err.reason}` : ''}`, 'error'),
  );
});

export default store;

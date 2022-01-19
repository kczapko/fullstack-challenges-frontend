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
      notificationsPermission: null,
      online: 'offline',
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
    if (!config.dontShowLoading) store.dispatch('setLoading', true);
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
  if (store.state.loggedIn) {
    store.dispatch('account/changeMyOnlineStatus', 'online');
  }
  if (store.hasModule('chat')) {
    store.dispatch('chat/setClientConntionStatus', 'connected');
  }
});

wsClient.on('closed', () => {
  if (store.state.loggedIn) {
    store.dispatch('account/changeMyOnlineStatus', 'offline');
  }
  if (store.hasModule('chat')) {
    store.dispatch('chat/unsubscribeAllChannels');
    store.dispatch('chat/setWasClosed', true);
    store.dispatch('chat/setClientConntionStatus', 'closed');
    store.dispatch('addMessage', new Message('Chat Connection lost.', 'error'));
    store.dispatch('setLoading', false);
    // wsClient.dispose();
  }
});

export default store;

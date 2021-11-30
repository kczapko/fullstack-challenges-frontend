import { createStore } from 'vuex';

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

export default store;

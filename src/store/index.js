import { createStore } from 'vuex';

import auth from './modules/auth';

export default createStore({
  state: {
    loggedIn: false,
  },
  modules: {
    auth,
  },
});

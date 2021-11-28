import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';

import App from './App.vue';
import router from './router';
import store from './store';

import veeValidate from './plugins/veeValidate';
import globalComponents from './plugins/globalComponents';

import logout from './utils/logout';

import '@/assets/scss/main.scss';
import 'nprogress/nprogress.css';

const logoutUser = logout(store, router);

const init = async () => {
  const app = createApp(App);

  app.use(store);
  await store.dispatch('auth/autologin');

  app.use(router);
  await router.isReady();

  app.use(createMetaManager());
  app.use(veeValidate);
  app.use(globalComponents);

  app.config.globalProperties.$logoutUser = logoutUser;
  store.$logoutUser = logoutUser;

  app.mount('#app');
};

init();

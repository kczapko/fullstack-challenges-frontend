import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';

import App from './App.vue';
import router from './router';
import store from './store';

import veeValidate from './plugins/veeValidate';
import globalComponents from './plugins/globalComponents';

import '@/assets/scss/main.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(createMetaManager());
app.use(veeValidate);
app.use(globalComponents);

app.mount('#app');

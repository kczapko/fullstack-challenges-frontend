import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import routes from './routes';

import Message from '@/utils/Message';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: 'smooth' };
  },
  linkActiveClass: 'active',
  linkExactActiveClass: 'active--exact',
});

router.beforeEach(async (to) => {
  /* twitter auth callback */
  if (to.path === '/' && to.query.oauth_token && to.query.oauth_verifier) {
    try {
      await store.dispatch('auth/signinWithTwitter', {
        token: to.query.oauth_token,
        verifier: to.query.oauth_verifier,
      });
      return { name: 'dashboard' };
    } catch (e) {
      store.dispatch('auth/setAuthError', e);
      return { name: 'login' };
    }
  }

  /* github auth callback */
  if (to.path === '/' && to.query.code && to.query.state) {
    try {
      await store.dispatch('auth/signinWithGithub', {
        code: to.query.code,
        state: to.query.state,
      });
      return { name: 'dashboard' };
    } catch (e) {
      store.dispatch('auth/setAuthError', e);
      return { name: 'login' };
    }
  }

  return true;
});

router.beforeEach((to) => {
  if (!to.meta.requireAuth) return true;
  if (!store.state.loggedIn) return { name: 'login' };
  return true;
});

router.beforeEach((to) => {
  if (!to.meta.requireConfirm) return true;
  if (!store.state.user.emailConfirmed) {
    store.dispatch('addMessage', new Message('You need to confirm your account first!'));
    return { name: 'dashboard' };
  }
  return true;
});

router.afterEach((to) => {
  if (to.meta.title) store.dispatch('setPageTitle', to.meta.title);
});

export default router;

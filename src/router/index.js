import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Test from '@/views/Test.vue';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';

import HomeDashboard from '@/components/home/HomeDashboard.vue';

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true,
      title: 'Home',
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: HomeDashboard,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Auth,
    props: { action: 'login' },
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Auth,
    props: { action: 'signup' },
    meta: {
      title: 'Signup',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: Home,
  },
  {
    path: '/password-rest',
    name: 'password-reset',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  /* twitter auth callback */
  if (to.path === '/' && to.query.oauth_token && to.query.oauth_verifier) {
    try {
      await store.dispatch('auth/signinWithTwitter', {
        token: to.query.oauth_token,
        verifier: to.query.oauth_verifier,
      });
      return { name: 'home' };
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
      return { name: 'home' };
    } catch (e) {
      store.dispatch('auth/setAuthError', e);
      return { name: 'login' };
    }
  }

  return true;
});

router.beforeEach((to) => {
  if (!to.meta.requireAuth) return true;
  if (!store.state.auth.loggedIn) return { name: 'login' };
  return true;
});

router.afterEach((to) => {
  if (to.meta.title) store.dispatch('setPageTitle', to.meta.title);
});

export default router;

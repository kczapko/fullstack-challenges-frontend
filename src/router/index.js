import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Message from '@/utils/Message';

import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';

import HomeDashboard from '@/components/home/HomeDashboard.vue';

// prettier-ignore
const UserProfile = () => import(/* webpackChunkName: "profile" */ '@/components/home/UserProfile.vue');
// prettier-ignore
const UserProfileEdit = () => import(/* webpackChunkName: "profile" */ '@/components/home/UserProfileEdit.vue');

const routes = [
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
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
        meta: {
          requireConfirm: true,
          title: 'Profile',
        },
      },
      {
        path: 'profile-edit',
        name: 'profile-edit',
        component: UserProfileEdit,
        meta: {
          requireConfirm: true,
          title: 'Edit Profile',
        },
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
    component: Auth,
    props: { action: 'forgot-password' },
    meta: {
      title: 'Forgot Password',
    },
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: Auth,
    props: { action: 'change-password' },
    meta: {
      title: 'Change Password',
    },
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

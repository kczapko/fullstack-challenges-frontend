import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Test from '@/views/Test.vue';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';

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

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) return next();
  if (!store.state.auth.loggedIn) return next({ name: 'login' });
  return next();
});

router.afterEach((to) => {
  if (to.meta.title) store.dispatch('setPageTitle', to.meta.title);
});

export default router;

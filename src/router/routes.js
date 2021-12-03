import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';

import HomeDashboard from '@/components/home/HomeDashboard.vue';

// prettier-ignore
const UserProfile = () => import(/* webpackChunkName: "profile" */ '@/components/home/UserProfile.vue');
// prettier-ignore
const UserProfileEdit = () => import(/* webpackChunkName: "profile" */ '@/components/home/UserProfileEdit.vue');

export default [
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

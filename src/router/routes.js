// import Home from '@/views/Home.vue';
// import Auth from '@/views/Auth.vue';

// import HomeDashboard from '@/components/home/HomeDashboard.vue';

// prettier-ignore
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
// prettier-ignore
const HomeDashboard = () => import(/* webpackChunkName: "home" */ '@/components/home/HomeDashboard.vue');

// prettier-ignore
const Auth = () => import(/* webpackChunkName: "auth" */ '@/views/Auth.vue');

// prettier-ignore
const UserProfile = () => import(/* webpackChunkName: "profile" */ '@/components/home/profile/UserProfile.vue');
// prettier-ignore
const UserProfileEdit = () => import(/* webpackChunkName: "profile" */ '@/components/home/profile/UserProfileEdit.vue');

// prettier-ignore
const Unsplash = () => import(/* webpackChunkName: "unsplash" */ '@/views/Unsplash.vue');

// prettier-ignore
const Shoppingify = () => import(/* webpackChunkName: "shoppingify" */ '@/views/Shoppingify.vue');

// prettier-ignore
const Chat = () => import(/* webpackChunkName: "chat" */ '@/views/Chat.vue');

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
  {
    path: '/unsplash',
    name: 'unsplash',
    component: Unsplash,
    meta: {
      title: 'My Unsplash',
      requireAuth: true,
      requireConfirm: true,
    },
  },
  {
    path: '/shoppingify',
    name: 'shoppingify',
    component: Shoppingify,
    props: { action: 'items' },
    meta: {
      title: 'Shoppingify',
      requireAuth: true,
      requireConfirm: true,
    },
  },
  {
    path: '/shoppingify/history',
    name: 'shoppingify-history',
    component: Shoppingify,
    props: { action: 'history' },
    meta: {
      title: 'Shoppingify - History',
      requireAuth: true,
      requireConfirm: true,
    },
  },
  {
    path: '/shoppingify/history/:id',
    name: 'shoppingify-single-history',
    component: Shoppingify,
    props: { action: 'single-history' },
    meta: {
      title: 'Shoppingify - History',
      requireAuth: true,
      requireConfirm: true,
    },
  },
  {
    path: '/shoppingify/statistics',
    name: 'shoppingify-statistics',
    component: Shoppingify,
    props: { action: 'statistics' },
    meta: {
      title: 'Shoppingify - Statistics',
      requireAuth: true,
      requireConfirm: true,
    },
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      title: 'Chat',
      requireAuth: true,
      requireConfirm: true,
    },
  },
];

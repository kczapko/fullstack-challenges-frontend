export default (store, router) => async () => {
  store.dispatch('account/changeMyOnlineStatus', 'offline');
  await router.push({ name: 'login' });
  store.dispatch('auth/logout');
};

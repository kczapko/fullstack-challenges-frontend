export default (store, router) => async () => {
  await router.push({ name: 'login' });
  store.dispatch('auth/logout');
};

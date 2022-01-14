import { useStore } from 'vuex';

export default () => {
  const store = useStore();

  if ('visibilityState' in document) {
    store.dispatch('setPageVisibility', document.visibilityState);
    document.addEventListener('visibilitychange', () => {
      store.dispatch('setPageVisibility', document.visibilityState);
    });
  }
};

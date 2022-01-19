import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const store = useStore();

  const loggedIn = computed(() => store.state.loggedIn);
  const pageVisible = computed(() => store.state.pageVisible);

  watch(pageVisible, (val) => {
    if (store.hasModule('chat')) {
      if (val === 'hidden') {
        store.dispatch('account/changeMyOnlineStatus', 'away');
      }
      if (val === 'visible') {
        store.dispatch('account/changeMyOnlineStatus', 'online');
      }
    }
  });

  window.addEventListener('beforeunload', () => {
    if (loggedIn.value) {
      // prettier-ignore
      const url = process.env.NODE_ENV === 'development' ? 'https://localhost:3443/account/set-offline' : '/account/set-offline';
      const formData = new FormData();
      formData.append('token', store.getters.token);
      navigator.sendBeacon(url, formData);
    }
  });
};

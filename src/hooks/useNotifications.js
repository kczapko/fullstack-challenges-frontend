import { useStore } from 'vuex';

export default () => {
  const store = useStore();

  if ('Notification' in window) {
    store.dispatch('setNotificationsPermission', Notification.permission);
  }
};

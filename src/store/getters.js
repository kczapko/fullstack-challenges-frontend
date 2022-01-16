import { username, initials } from '@/utils/user';

export default {
  username(state) {
    return username(state.user);
  },
  initials(state, getters) {
    return getters.username && initials(getters.username);
  },
  token(state) {
    return state.token;
  },
  pageVisible(state) {
    return state.pageVisible;
  },
  notificationsPermission(state) {
    return state.notificationsPermission;
  },
};

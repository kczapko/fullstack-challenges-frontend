import { username, initials } from '@/utils/user';

export default {
  username(state) {
    return username(state.user);
  },
  initials(state, getters) {
    return getters.username && initials(getters.username);
  },
};

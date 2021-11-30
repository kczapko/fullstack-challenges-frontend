import axios from '@/api/axios';

let errorInterceptor;

export default {
  setPageTitle(state, payload) {
    state.pageTitle = payload;
  },
  addBodyClass(state, payload) {
    state.bodyClasses.push(payload);
  },
  removeBodyClass(state, payload) {
    const index = state.bodyClasses.indexOf(payload);
    if (index >= 0) state.bodyClasses.splice(index, 1);
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  loginUser(state, payload) {
    state.loggedIn = true;
    state.user = payload.user;

    localStorage.setItem('token', payload.token);
    axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
    errorInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // eslint-disable-next-line operator-linebreak
        const message =
          error.response?.data?.errors[0]?.message || error.response?.message || error.message;
        if (message === 'Wrong token' || message === 'Token expired') await this.$logoutUser();
        return Promise.reject(error);
      },
    );
  },
  logoutUser(state) {
    state.loggedIn = false;
    state.user = {};

    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
    axios.interceptors.response.eject(errorInterceptor);
  },
  updateUser(state, payload) {
    const fileds = ['email', 'name', 'photo'];
    const payloadKeys = Object.keys(payload);
    fileds.forEach((field) => {
      if (payloadKeys.includes(field)) state.user[field] = payload[field];
    });
  },
  confirmEmail(state) {
    state.user.emailConfirmed = true;
  },
  addMessage(state, payload) {
    state.messages.unshift(payload);
  },
  removeMessage(state, payload) {
    const index = state.messages.findIndex((m) => m.id === payload);

    if (index >= 0) state.messages.splice(index, 1);
  },
};

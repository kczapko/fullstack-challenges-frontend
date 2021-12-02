import axios from 'axios';
import nProgress from 'nprogress';

const instance = axios.create({
  baseURL: 'http://localhost:3333',
});
instance.interceptors.request.use(
  (config) => {
    nProgress.start();
    return config;
  },
  (error) => {
    nProgress.done();
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    nProgress.done();
    return response;
  },
  (error) => {
    nProgress.done();

    let message = 'Network Error';
    const err = { ...error };
    const data = error.response && error.response.data;
    if (data.errors && data.errors.length) message = data.errors[0].message;
    if (data.message) message = data.message;
    err.message = message;

    return Promise.reject(err);
  },
);

export default instance;

import axios from 'axios';
import nProgress from 'nprogress';

const options = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:3443' : '',
};
const instance = axios.create(options);

instance.interceptors.request.use(
  (config) => {
    if (!config.dontShowLoading) nProgress.start();
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
    const err = Object.create(error);
    const data = error.response && error.response.data;
    if (data && data.errors && data.errors.length) message = data.errors[0].message;
    if (data && data.message) message = data.message;
    err.message = message;

    return Promise.reject(err);
  },
);

export default instance;

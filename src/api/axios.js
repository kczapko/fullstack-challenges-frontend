import axios from 'axios';
import nProgress from 'nprogress';

const instance = axios.create({
  baseURL: 'http://localhost:3333/graphql',
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
    return Promise.reject(error);
  },
);

export default instance;

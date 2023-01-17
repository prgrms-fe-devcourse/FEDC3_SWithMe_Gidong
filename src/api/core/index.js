import axios from 'axios';
import { getItem } from '@/utils/storage';

const { VITE_API_END_POINT, VITE_TOKEN } = import.meta.env;

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  instance.defaults.timeout = 2500;

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(
    (config) => {
      const token = getItem('token', '');
      if (config.headers && token) {
        config.headers['Authorization'] = `bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosAdminApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  instance.defaults.timeout = 2500;

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(
    (config) => {
      if (config.headers) {
        config.headers['Authorization'] = VITE_TOKEN;
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = axiosApi(VITE_API_END_POINT);
export const axiosAdminInstance = axiosAdminApi(VITE_API_END_POINT);

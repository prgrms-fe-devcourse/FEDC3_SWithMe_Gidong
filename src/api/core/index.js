import axios from 'axios';
import { getItem } from '@/utils/storage';

const { VITE_API_END_POINT, VITE_TOKEN } = import.meta.env;
const API_BASE_URL = import.meta.env.MODE === 'development' ? VITE_API_END_POINT : '/api';

const createAxiosInstance = (baseURL, interceptor) => {
  const instance = axios.create({ baseURL, timeout: 2500 });

  instance.interceptors.request.use(interceptor, (error) => {
    console.error(error);
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstance = createAxiosInstance(API_BASE_URL, (config) => {
  const token = getItem('token', '');
  if (config.headers && token) {
    config.headers['Authorization'] = `bearer ${token}`;
  }
});

const axiosAdminInstance = createAxiosInstance(API_BASE_URL, (config) => {
  if (config.headers) {
    config.headers['Authorization'] = VITE_TOKEN;
  }
});

export { axiosInstance, axiosAdminInstance };

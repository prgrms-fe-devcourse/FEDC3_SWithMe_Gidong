import { axiosInstance } from '@/api/core';
import axios from 'axios';
import { setItem, getItem, removeItem } from '@/utils/storage';

export const postUserSignUp = async (data) => {
  try {
    const response = await axiosInstance.post('/signup', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postUserSignIn = async (data) => {
  try {
    const response = await axiosInstance.post('/login', data);
    setItem('token', response.token);

    // const { accessToken } = response.data;
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postUserSignOut = async () => {
  try {
    const response = await axiosInstance.post('/logout');
    removeItem('token');

    return response;
  } catch (error) {
    console.error(error);
  }
};

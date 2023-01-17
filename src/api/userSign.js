import { axiosInstance } from '@/api/core';

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
    return response;
  } catch (error) {
    console.error(error);
    return { isFailed: true, errorMessage: '아이디 또는 비밀번호를 확인해주세요.' };
  }
};

export const postUserSignOut = async () => {
  try {
    const response = await axiosInstance.post('/logout');
    return response;
  } catch (error) {
    console.error(error);
  }
};

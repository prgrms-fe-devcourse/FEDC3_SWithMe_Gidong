import { axiosInstance } from '@/api/core';

export const postUserSignUp = async (data) => {
  try {
    const response = await axiosInstance.post('/signup', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

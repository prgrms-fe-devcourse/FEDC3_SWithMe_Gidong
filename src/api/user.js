import { axiosInstance } from '@/api/core';

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users/get-users');

    return response;
  } catch (error) {
    console.error(error);
  }
};

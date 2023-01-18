import { axiosInstance } from '@/api/core';

export const postUserAvatar = async (data) => {
  try {
    const response = await axiosInstance.post('/users/upload-photo', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const putUserFullName = async (data) => {
  try {
    const response = await axiosInstance.put('/settings/update-user', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const putUserPassword = async (data) => {
  try {
    const response = await axiosInstance.put('/settings/update-password', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

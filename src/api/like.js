import { axiosInstance } from '@/api/core';

export const createLike = async (data) => {
  try {
    const response = await axiosInstance.post('likes/create', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLike = async (data) => {
  try {
    const response = await axiosInstance.delete('likes/delete', { data });

    return response;
  } catch (error) {
    console.error(error);
  }
};

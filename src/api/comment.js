import { axiosInstance } from '@/api/core';

export const createComment = async (data) => {
  try {
    const response = await axiosInstance.post('comments/create', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (data) => {
  try {
    const response = await axiosInstance.delete('comments/delete', { data });

    return response;
  } catch (error) {
    console.error(error);
  }
};

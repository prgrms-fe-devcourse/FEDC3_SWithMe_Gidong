import { axiosInstance } from '@/api/core/index';

export const createComment = async (data) => {
  try {
    const response = await axiosInstance.post('comments/create', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

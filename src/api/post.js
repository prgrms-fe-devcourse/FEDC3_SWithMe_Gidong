import { axiosInstance } from '@/api/core';

export const getPostListByChannel = async (channelId, offset, limit) => {
  try {
    const params = { offset, limit };
    const response = await axiosInstance.get(`/posts/channel/${channelId}`, { params });
    const postList = response.map((post) => ({ ...post, title: JSON.parse(post.title) }));
    return postList;
  } catch (error) {
    console.error(error);
  }
};

export const createTIL = async (formData) => {
  try {
    const response = await axiosInstance.post('/posts/create', formData);

    return response;
  } catch (error) {
    console.error(error);
  }
};

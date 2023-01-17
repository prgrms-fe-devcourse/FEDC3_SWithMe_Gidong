import { axiosInstance } from '@/api/core';

export const getPostListByChannel = async (channelId, offset, limit) => {
  try {
    const params = { offset, limit };
    const data = await axiosInstance.get(`/posts/channel/${channelId}`, { params });
    const postList = data.map((post) => ({ ...post, title: JSON.parse(post.title) }));
    return postList;
  } catch (error) {
    console.error(error);
  }
};

export const updateTIL = async (formData) => {
  try {
    const response = await axiosInstance.put('/posts/update', formData);
    const parsedResponse = { ...response, title: JSON.parse(response.title) };

    return parsedResponse;
  } catch (error) {
    console.error(error);
  }
};

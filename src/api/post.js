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

export const deleteTIL = async (data) => {
  try {
    const response = await axiosInstance.delete('/posts/delete', { data });

    return response;
  } catch (error) {
    console.error(error);
  }
};

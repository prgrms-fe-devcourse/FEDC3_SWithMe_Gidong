import { axiosInstance } from './core';

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

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

export const getTIL = async (id) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    const parsedResponse = {
      ...response,
      title: JSON.parse(response.title),
      channel: {
        ...response.channel,
        description: JSON.parse(response.channel.description),
      },
    };

    return parsedResponse;
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

export const updateTIL = async (formData) => {
  try {
    const response = await axiosInstance.put('/posts/update', formData);
    const parsedResponse = { ...response, title: JSON.parse(response.title) };

    return parsedResponse;
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

import { axiosInstance } from '@/api/core';

export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get('notifications');
    const parsedResponse = response.map((res) =>
      res.like
        ? {
            ...res,
            like: {
              ...res.like,
              post: {
                ...res.like.post,
                title: JSON.parse(res?.like?.post?.title),
              },
            },
          }
        : {
            ...res,
            comment: {
              ...res.comment,
              post: {
                ...res.comment.post,
                title: JSON.parse(res?.comment?.post?.title),
              },
            },
          },
    );
    const orderedResponse = parsedResponse.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return orderedResponse;
  } catch (error) {
    console.error(error);
  }
};

export const createNotification = async (data) => {
  try {
    const response = await axiosInstance.post('notifications/create', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (data) => {
  try {
    const response = await axiosInstance.delete('notifications/delete', { data });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateSeenNotification = async () => {
  try {
    const response = await axiosInstance.put('notifications/seen');

    return response;
  } catch (error) {
    console.error(error);
  }
};

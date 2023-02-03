import { axiosInstance } from '@/api/core';

export const getAlarms = async () => {
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

    return parsedResponse;
  } catch (error) {
    console.error(error);
  }
};

export const createAlarm = async (data) => {
  try {
    const response = await axiosInstance.post('notifications/create', data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAlarm = async (data) => {
  try {
    const response = await axiosInstance.delete('notifications/delete', { data });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateSeenAlarm = async () => {
  try {
    const response = await axiosInstance.put('notifications/seen');

    return response;
  } catch (error) {
    console.error(error);
  }
};

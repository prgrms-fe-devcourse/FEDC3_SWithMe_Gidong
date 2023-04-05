import { axiosAdminInstance, axiosInstance } from '@/api/core/index';

export const getGroupList = async () => {
  try {
    const response = await axiosInstance.get(`/channels`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getChannel = async (channelName) => {
  try {
    const response = await axiosInstance.get(`/channels/${channelName}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createChannel = async (channelInfo) => {
  try {
    const response = await axiosAdminInstance.post('channels/create', channelInfo);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateChannel = async (updateData) => {
  try {
    const response = await axiosAdminInstance.put('/channels/update', updateData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteChannel = async (channelId) => {
  try {
    const response = await axiosAdminInstance.delete('channels/delete', { data: channelId });
    return response;
  } catch (error) {
    console.error(error);
  }
};

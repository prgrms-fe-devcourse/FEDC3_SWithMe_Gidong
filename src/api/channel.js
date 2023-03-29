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
    const createdChannel = { ...response, description: JSON.parse(response.description) };

    return createdChannel;
  } catch (error) {
    console.error(error);
  }
};

export const updateChannel = async (updateData) => {
  try {
    const response = await axiosAdminInstance.put(`/channels/update`, updateData);
    const updatedChannel = { ...response, description: JSON.parse(response.description) };
    return updatedChannel;
  } catch (error) {
    console.error(error);
  }
};

export const deleteChannel = async (channelId) => {
  try {
    const response = await axiosAdminInstance.delete('channels/delete', {
      data: channelId,
    });
    const deletedChannel = { ...response, description: JSON.parse(response.description) };

    return deletedChannel;
  } catch (error) {
    console.error(error);
  }
};

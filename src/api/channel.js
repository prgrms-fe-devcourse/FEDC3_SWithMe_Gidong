import { axiosInstance, axiosAdminInstance } from './core/index';

export const getChannelList = async () => {
  try {
    const response = await axiosInstance.get(`/channels`);
    const channelList = response.map((channel) => ({ ...channel, description: JSON.parse(channel.description) }));
    return channelList;
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

export const joinChannel = async (updateData) => {
  try {
    const response = await axiosAdminInstance.put(`/channels/update`, updateData);
    const joinedChannel = { ...response, description: JSON.parse(response.description) };
    return joinedChannel;
  } catch (error) {
    console.error(error);
  }
};

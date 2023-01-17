import { axiosAdminInstance, axiosInstance } from './core/index';

export const getChannelList = async () => {
  try {
    const data = await axiosInstance.get(`/channels`);
    const channelList = data.map((channel) => ({ ...channel, description: JSON.parse(channel.description) }));
    return channelList;
  } catch (error) {
    console.error(error);
  }
};

export const getChannel = async (channelName) => {
  try {
    const data = await axiosInstance.get(`/channels/${channelName}`);
    return data;
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

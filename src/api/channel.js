import { axiosInstance } from './core/index';

export const getChannelList = async () => {
  try {
    const data = await axiosInstance.get(`/channels`);
    return data;
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

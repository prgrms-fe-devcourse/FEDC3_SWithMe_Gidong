import { axiosAdminInstance, axiosInstance } from '@/api/core/index';

export const getGroupList = async () => {
  return await axiosInstance.get(`/channels`);
};

export const createGroup = async (groupInfo) => {
  return await axiosAdminInstance.post('channels/create', groupInfo);
};

export const updateGroup = async (updateData) => {
  return await axiosAdminInstance.put('/channels/update', updateData);
};

export const deleteGroup = async (groupId) => {
  return await axiosAdminInstance.delete('channels/delete', { data: groupId });
};

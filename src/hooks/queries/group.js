import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupList, createChannel, updateChannel, deleteChannel } from '@/api/channel';

export const useGetGroupList = () => {
  return useQuery(['groupList'], getGroupList, {
    select: (data) => data.map((channel) => ({ ...channel, description: JSON.parse(channel.description) })),
  });
};

export const usePostGroupCreate = () => {
  return useMutation(async (groupInfo) => await createChannel(groupInfo));
};

export const usePutUpdateGroup = () => {
  return useMutation(async (updateData) => await updateChannel(updateData));
};

export const useDeleteGroup = () => {
  return useMutation(async (groupId) => await deleteChannel(groupId));
};

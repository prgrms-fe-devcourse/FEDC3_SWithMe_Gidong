import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupList, createChannel } from '@/api/channel';

export const useGetGroupList = () => {
  return useQuery(['groupList'], getGroupList, {
    select: (data) => data.map((channel) => ({ ...channel, description: JSON.parse(channel.description) })),
  });
};

export const usePostGroupCreate = () => {
  return useMutation(async (groupInfo) => await createChannel(groupInfo));
};

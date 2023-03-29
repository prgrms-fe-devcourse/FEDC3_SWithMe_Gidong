import { useQuery } from '@tanstack/react-query';
import { getGroupList } from '@/api/channel';

export const useGetGroupList = () => {
  return useQuery(['groupList'], getGroupList, {
    select: (data) => data.map((channel) => ({ ...channel, description: JSON.parse(channel.description) })),
  });
};

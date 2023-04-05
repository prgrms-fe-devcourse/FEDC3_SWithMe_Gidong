import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupList, createGroup, updateGroup, deleteGroup } from '@/api/group';

export const useGetGroupList = () => {
  return useQuery(['groupList'], getGroupList, {
    select: (data) => data.map((group) => ({ ...group, description: JSON.parse(group.description) })),
    onError: (error) => console.log(error.message),
  });
};

export const usePostGroupCreate = () => {
  return useMutation(async (groupInfo) => await createGroup(groupInfo), {
    onError: (error) => console.log(error.message),
  });
};

export const usePutUpdateGroup = () => {
  return useMutation(async (updateData) => await updateGroup(updateData), {
    onError: (error) => console.log(error.message),
  });
};

export const useDeleteGroup = () => {
  return useMutation(async (groupId) => await deleteGroup(groupId), {
    onError: (error) => console.log(error.message),
  });
};

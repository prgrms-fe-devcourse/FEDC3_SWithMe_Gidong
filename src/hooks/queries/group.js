import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupList, createGroup, updateGroup, deleteGroup } from '@/api/group';

export const useGetGroupList = () =>
  useQuery(['groupList'], getGroupList, {
    select: (data) => data.map((group) => ({ ...group, description: JSON.parse(group.description) })),
    onError: (error) => console.log(error.message),
  });

export const useCreateGroup = () =>
  useMutation(createGroup, {
    onError: (error) => console.log(error.message),
  });

export const useUpdateGroup = () =>
  useMutation(updateGroup, {
    onError: (error) => console.log(error.message),
  });

export const useDeleteGroup = () =>
  useMutation(deleteGroup, {
    onError: (error) => console.log(error.message),
  });

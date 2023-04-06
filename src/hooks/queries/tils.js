import { queryClient } from '@/App';
import { createTIL, deleteTIL, getPostListByChannel, getTIL, updateTIL } from '@/api/post';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetTILsByGroup = (channelId, offset, limit) =>
  useQuery(['tils', channelId, offset, limit], () => getPostListByChannel(channelId, offset, limit));

export const useGetTIL = (id) => useQuery(['til', id], () => getTIL(id));

export const useCreateTIL = () =>
  useMutation(createTIL, {
    onSuccess: (til) => queryClient.invalidateQueries(['til', til.channel._id]),
  });

export const useDeleteTIL = () =>
  useMutation(deleteTIL, {
    onSuccess: (til) => queryClient.invalidateQueries(['til', til._id]),
  });

export const useUpdateTIL = () =>
  useMutation(updateTIL, {
    onSuccess: (til) => queryClient.invalidateQueries(['til', til._id]),
  });

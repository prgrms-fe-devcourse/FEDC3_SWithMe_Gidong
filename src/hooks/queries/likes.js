import { queryClient } from '@/App';
import { createLike, deleteLike } from '@/api/like';
import { useMutation } from '@tanstack/react-query';

export const useCreateLike = () =>
  useMutation(createLike, {
    onSuccess: (like) => queryClient.invalidateQueries(['til', like.post]),
  });

export const useDeleteLike = () =>
  useMutation(deleteLike, {
    onSuccess: (like) => queryClient.invalidateQueries(['til', like.post]),
  });

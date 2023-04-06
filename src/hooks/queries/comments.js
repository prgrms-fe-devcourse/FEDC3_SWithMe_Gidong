import { queryClient } from '@/App';
import { createComment, deleteComment } from '@/api/comment';
import { useMutation } from '@tanstack/react-query';

export const useCreateComment = () =>
  useMutation(createComment, {
    onSuccess: (comment) => queryClient.invalidateQueries(['til', comment.post]),
  });

export const useDeleteComment = () =>
  useMutation(deleteComment, {
    onSuccess: (comment) => queryClient.invalidateQueries(['til', comment.post]),
  });

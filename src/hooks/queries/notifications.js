import { getNotifications } from '@/api/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = () => useQuery(['notifications'], getNotifications, { refetchInterval: 2000 });

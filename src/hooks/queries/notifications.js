import { getNotifications } from '@/api/alarm';
import { useQuery } from '@tanstack/react-query';

export const useGetAlarms = () => useQuery(['notifications'], getNotifications, { refetchInterval: 2000 });

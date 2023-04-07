import { getAlarms } from '@/api/alarm';
import { useQuery } from '@tanstack/react-query';

export const useGetAlarms = () => useQuery(['notifications'], getAlarms, { refetchInterval: 2000 });

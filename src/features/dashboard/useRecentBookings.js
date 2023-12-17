import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = +searchParams.get('last') || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: recentBookings } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['recentBookings', `last=${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return {
    isLoading,
    recentBookings,
  };
}

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { RESULTS_PER_PAGE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // 2) Filter
  const status = searchParams.get('status') || 'all';

  const filter =
    status === 'all'
      ? null
      : {
          field: 'status',
          value: status,
        };

  // 2) SortBy
  const sortMethod = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortMethod.split('-');

  const sortBy = { field, direction };

  // 3) Pagination
  const page = Number(searchParams.get('page')) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

  // Fetching next page
  if (page < pageCount) {
    // Prefetching
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // Fetching previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}

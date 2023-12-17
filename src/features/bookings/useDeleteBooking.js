import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Booking deleted successfully');
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading('Deleting booking...');
    },
  });

  return { isDeleting, deleteBooking };
}

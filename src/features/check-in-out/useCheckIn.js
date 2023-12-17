import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, updatedBooking }) =>
      updateBooking(bookingId, updatedBooking),
    onSuccess: (booking) => {
      toast.dismiss();
      toast.success(`Booking ${booking.id} updated successfully!`);

      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.dismiss();
      toast.error('Error updating booking');
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading('Updating booking...');
    },
  });

  return { isCheckingIn, checkIn };
}

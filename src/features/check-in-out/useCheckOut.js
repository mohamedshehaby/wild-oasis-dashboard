import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: ({ bookingId, updatedBooking }) =>
      updateBooking(bookingId, updatedBooking),
    onSuccess: (booking) => {
      toast.dismiss();
      toast.success(`Booking ${booking.id} updated successfully!`);

      void queryClient.invalidateQueries({ exact: true });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error updating booking");
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading("Updating booking...");
    },
  });

  return { isCheckingOut, checkOut };
}

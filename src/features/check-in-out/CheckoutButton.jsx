import Button from "../../ui/Button";
import { useCheckout } from "./useCheckOut.js";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckout(bookingId);

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkOut({ bookingId, updatedBooking: { status: "checked-out" } });
      }}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

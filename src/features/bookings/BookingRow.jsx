import { format, isToday } from "date-fns";
import styled from "styled-components";

import Tag from "../../ui/Tag";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  const { isCheckingOut, checkOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  function handleCheckout() {
    checkOut({ bookingId, updatedBooking: { status: "checked-out" } });
  }

  return (
    <>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle opens={`${bookingId}`}>
              <HiEllipsisVertical />
            </Menus.Toggle>

            <Menus.List opens={`${bookingId}`}>
              <Menus.Button
                onClick={() => {
                  navigate(`/bookings/${bookingId}`);
                }}
              >
                <HiEye /> <span>See details</span>
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  onClick={() => navigate(`/check-in/${bookingId}`)}
                >
                  <HiArrowDownOnSquare /> <span>Check in</span>
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button onClick={handleCheckout} disabled={isCheckingOut}>
                  <HiArrowUpOnSquare /> <span>Check out</span>
                </Menus.Button>
              )}

              <Modal.Open opens="delete-booking">
                <Menus.Button>
                  <HiTrash /> <span>Delete booking</span>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete-booking">
              <ConfirmDelete
                onConfirm={() => deleteBooking(bookingId)}
                disabled={isDeleting}
                resourceName="cabin"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Menus.Menu>
    </>
  );
}

export default BookingRow;

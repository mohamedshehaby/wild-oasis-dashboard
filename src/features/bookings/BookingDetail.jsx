import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading.jsx";
import Row from "../../ui/Row.jsx";
import Tag from "../../ui/Tag";

import { useNavigate, useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner.jsx";
import { useBooking } from "./useBooking.js";

import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Modal from "../../ui/Modal.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import { useCheckout } from "../check-in-out/useCheckout.js";
import BookingDataBox from "./BookingDataBox.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const { bookingId } = useParams();

  const { isLoading, booking } = useBooking();

  const { isCheckingOut, checkOut } = useCheckout();

  function handleCheckout() {
    checkOut({ bookingId, updatedBooking: { status: "checked-out" } });
  }

  const status = booking?.status || "unconfirmed";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!booking) {
    return <Empty resource="Booking" />;
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {isLoading ? <Spinner /> : <BookingDataBox booking={booking} />}

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={handleCheckout} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: moveBack,
                })
              }
              disabled={isDeleting}
              resourceName="cabin"
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

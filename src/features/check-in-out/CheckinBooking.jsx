import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import Heading from '../../ui/Heading.jsx';
import Row from '../../ui/Row.jsx';

import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { useBooking } from '../bookings/useBooking.js';
import { useSettings } from '../settings/useSettings.js';
import { useCheckIn } from './useCheckIn.js';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);

  const { isLoading, booking } = useBooking();

  const { isCheckingIn, checkIn } = useCheckIn();

  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(true);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * numGuests * settings.breakfastPrice;

  function handleCheckIn() {
    if (!confirmPaid) return;
    const updatedBooking = {
      status: 'checked-in',
      isPaid: true,
    };
    if (confirmBreakfast) {
      updatedBooking.hasBreakfast = true;
      updatedBooking.totalPrice = totalPrice + optionalBreakfastPrice;
      updatedBooking.extrasPrice = optionalBreakfastPrice;
    }

    checkIn({ bookingId, updatedBooking });
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={confirmBreakfast}
            onChange={() => {
              setConfirmBreakfast((cb) => !cb), setConfirmPaid(false);
            }}
            disabled={isCheckingIn}
          >
            {' '}
            Want to add a breakfast for {formatCurrency(
              optionalBreakfastPrice
            )}{' '}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((cp) => !cp)}
          disabled={confirmPaid || isCheckingIn}
        >
          {' '}
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {confirmBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} +
                  ${formatCurrency(optionalBreakfastPrice)})`
            : formatCurrency(totalPrice)}{' '}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckIn}>
          Check in booking #{bookingId}
        </Button>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;

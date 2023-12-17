import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ recentBookings, confirmedStays, numCabins, numDays }) {
  const numBookings = recentBookings?.length;

  const sales = recentBookings?.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0,
  );

  const checkIns = confirmedStays?.filter(
    (stay) => stay.status === "checked-in",
  ).length;

  // Occupancy rate
  const numNights = confirmedStays?.reduce(
    (acc, stay) => acc + stay.numNights,
    0,
  );

  const occupancyRate = Math.round((numNights / (numDays * numCabins)) * 100);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Bookings"
        value={`${occupancyRate}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;

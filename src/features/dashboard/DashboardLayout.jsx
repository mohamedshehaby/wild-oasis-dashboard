import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, recentBookings } = useRecentBookings();

  const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const numDays = +searchParams.get("last") || 7;

  const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins;

  if (isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numCabins={cabins.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

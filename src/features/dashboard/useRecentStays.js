import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = +searchParams.get("last") || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: recentStays } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["recentStays", `last=${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return {
    isLoading,
    confirmedStays,
  };
}

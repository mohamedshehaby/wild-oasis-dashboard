import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Account from "./pages/Account.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import CheckInBooking from "./features/check-in-out/CheckinBooking.jsx";
import Booking from "./pages/Booking.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "bookings/:bookingId",
        element: <Booking />,
      },
      {
        path: "check-in/:bookingId",
        element: <CheckInBooking />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: ".8rem" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
              style: {
                fontSize: "1.6rem",
                maxWidth: "500px",
                padding: "1.6rem 2.4rem",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;

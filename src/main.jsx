import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/home.jsx";
import Login from "./components/loginpage.jsx";
import Venuedetailspage from "./components/venuedetailspage.jsx";
import VenueManagerDashboard from "./components/venuemanagerdashboard.jsx";
import AdminDashboard from "./components/admindashboard.jsx";
import Bookingspage from "./components/bookingspage.jsx";
import Venuesettingspage from "./components/venuesettingspage.jsx";
import Reviewsandmessagespage from "./components/reviewsandmessagespage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/venue/:id",
    element: <Venuedetailspage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/venuemanagerdashboard",
    element: <VenueManagerDashboard />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/bookingspage",
    element: <Bookingspage />,
  },
  {
    path: "/venuesettingspage",
    element: <Venuesettingspage />,
  },
  {
    path: "/reviewsandmessagespage",
    element: <Reviewsandmessagespage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

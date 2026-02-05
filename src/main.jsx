import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/home.jsx";
import Venuedetailspage from "./components/venuedetailspage.jsx";
import LoginPage from "./components/loginPage.jsx";
import VenueManagerDashboard from "./components/venueManagerDashboard.jsx";
import AdminDashboard from "./components/adminDashboard.jsx";

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
    element: <LoginPage />,
  },
  {
    path: "/venue-dashboard",
    element: <VenueManagerDashboard />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

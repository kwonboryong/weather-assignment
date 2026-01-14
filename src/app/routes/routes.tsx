import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/HomePage";
import LocationDetail from "@/pages/location-detail/LocationDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/location/:locationId", element: <LocationDetail /> },
]);

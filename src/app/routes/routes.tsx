import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/HomePage";
import LocationDetail from "@/pages/location-detail/LocationDetailPage";
import Bookmark from "@/pages/bookmark/BookmarkPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/location/:locationId", element: <LocationDetail /> },
  { path: "/bookmark", element: <Bookmark /> },
]);

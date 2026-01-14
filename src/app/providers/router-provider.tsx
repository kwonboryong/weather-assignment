import { RouterProvider as RRDProvider } from "react-router-dom";
import { router } from "../routes/routes";

export function RouterProvider() {
  return <RRDProvider router={router} />;
}

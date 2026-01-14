import { RouterProvider } from "./app/providers/router-provider";
import { QueryProvider } from "./app/providers/query-provider";

export default function App() {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
}

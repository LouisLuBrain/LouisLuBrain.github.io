import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dev",
    element: <PlaygroundPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

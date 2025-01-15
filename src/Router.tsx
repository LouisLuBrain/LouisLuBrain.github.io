import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ResumePage } from "./pages/ResumePage";
import { DailyPage } from "./pages/DailyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/daily",
    element: <DailyPage />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
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

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ResumePage } from "./pages/ResumePage";
import { DailyPage } from "./pages/DailyPage";
import { SideNavBar } from "./components/nav/SideNavBar";

const Layout = () => {
  return (
    <div className="flex w-full">
      <SideNavBar />
      <div className="p-4 flex-1 bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

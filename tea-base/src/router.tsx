import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { TeaBrowsePage } from "./tea/BrowsePage";
import { TeaDetailPage } from "./tea/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TeaBrowsePage />,
      },
      {
        path: "tea/:slug",
        element: <TeaDetailPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}


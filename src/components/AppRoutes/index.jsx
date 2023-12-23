import { ClientRoutesEnum } from "../../enum/routes";
import Home from "../../pages/Home";
import NotFoundPage from "../NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Attractions from "../Attractions";
import Attraction from "../Attraction";

const appRoutes = createBrowserRouter([
  {
    path: ClientRoutesEnum.HOME,
    element: <Home />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/attractions",
        element: <Attractions />,
      },
      {
        path: "/attractions/:id",
        element: <Attraction />,
      },
      {
        path: "/chat",
        element: null,
      },
      {
        path: "/notification",
        element: null,
      },
      {
        path: "/profile",
        element: null,
      },
    ],
  },
]);
const AppRoutes = () => {
  return <RouterProvider router={appRoutes} />;
};

export default AppRoutes;

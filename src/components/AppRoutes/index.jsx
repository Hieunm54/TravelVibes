import { ClientRoutesEnum } from "../../enum/routes";
import Home from "../../pages/Home";
import NotFoundPage from "../NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VisitingStop from "../VisitingStop";

const appRoutes = createBrowserRouter([
  {
    path: ClientRoutesEnum.HOME,
    element: <Home />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/visiting-stop",
        element: <VisitingStop />,
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

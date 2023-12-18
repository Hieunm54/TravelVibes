import { ClientRoutesEnum } from "../../enum/routes";
import Home from "../../pages/Home";
import NotFoundPage from "../NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const appRoutes = createBrowserRouter([
  {
    path: ClientRoutesEnum.HOME,
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
]);
const AppRoutes = () => {
  return <RouterProvider router={appRoutes} />;
};

export default AppRoutes;

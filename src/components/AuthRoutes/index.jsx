import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClientRoutesEnum } from "../../enum/routes";
import NotFoundPage from "../NotFound";
import SignInPage from "../../pages/SignInPage";
import SignUp from "../../pages/SignUpPage";

const authRoutes = createBrowserRouter([
  {
    path: ClientRoutesEnum.SIGN_IN,
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: ClientRoutesEnum.SIGN_UP,
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
]);

const AuthRoutes = () => {
  return <RouterProvider router={authRoutes} />;
};

export default AuthRoutes;

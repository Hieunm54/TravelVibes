import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes, authRoutes } from "../enum/routes";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import AttractionsPage from "../pages/Attractions";
import AttractionPage from "../pages/Attraction";
import NewPostPage from "../pages/NewPost";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import MessagesPage from "../pages/Messages";
import { useDispatch } from "react-redux";
import { saveLogInInfo } from "../store/auth";
import PostPage from "../pages/Post";
import ProfilePage from "../pages/Profile";
import UserReviewsPage from "../pages/UserReviewsPage";
import UserEventsPage from "../pages/UserEventsPage";

const routes = createBrowserRouter([
  {
    path: appRoutes.HOME,
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.NEW_POST,
    element: <NewPostPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: appRoutes.NEW_POST_FIND_ATTRACTIONS,
        element: <AttractionsPage />,
      },
      {
        path: appRoutes.NEW_POST_VIEW_ATTRACTION,
        element: <AttractionPage />,
      },
    ],
  },
  {
    path: appRoutes.MESSAGES,
    element: <MessagesPage />,
    errorElement: <NotFoundPage />,
    children: [{ path: appRoutes.SINGLE_CHAT, element: <MessagesPage /> }],
  },
  {
    path: appRoutes.POST,
    element: <PostPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.PROFILE,
    element: <ProfilePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: appRoutes.USER_REVIEWS,
        element: <UserReviewsPage />,
      },
      {
        path: appRoutes.USER_EVENTS,
        element: <UserEventsPage />,
      },
    ],
  },
  {
    path: authRoutes.SIGN_IN,
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: authRoutes.SIGN_UP,
    element: <SignUpPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Navigation = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    dispatch(saveLogInInfo(token, user));
  }

  return <RouterProvider router={routes} />;
};

export default Navigation;

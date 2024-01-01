const appRoutes = {
  HOME: "/",
  NEW_POST: "/new-post",
  NEW_POST_FIND_ATTRACTIONS: "/new-post/find-attractions",
  NEW_POST_VIEW_ATTRACTION: "/new-post/attraction/:id",
  NOTIFICATION: "/notification",
  PROFILE: "/profile",
  USER_REVIEWS: "/profile/reviews",
  USER_EVENTS: "/profile/events",
  POST: "/posts/:id",
  NEW_EVENT: "/new-event",
  EVENT: "/events/:id",
};

const authRoutes = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export { appRoutes, authRoutes };

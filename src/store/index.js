import { thunk } from "redux-thunk";
import { authDefaultState } from "./auth";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import attractions, { attractionsDefaultState } from "../store/attractions";
import auth from "../store/auth";
import messages, { messagesDefaultState } from "../store/reducers/messages";
import asyncTaskReducer, { initialAsyncTaskState } from "./reducers/asyncTask";
import users, { usersDefaultState } from "./reducers/users";
import events, { eventDefaultState } from "./reducers/events";
import posts, { postsDefaultState } from "./reducers/posts";
import reviews, { reviewsDefaultState } from "./reducers/reviews";

const AppInitialState = {
  attractions: attractionsDefaultState,
  messages: messagesDefaultState,
  auth: authDefaultState,
  asyncTaskReducer: initialAsyncTaskState,
  users: usersDefaultState,
  events: eventDefaultState,
  posts: postsDefaultState,
  reviews: reviewsDefaultState,
};

const DevEnv = import.meta.env.VITE_DEV_ENV;

const configStore = (preloadedState = AppInitialState) => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composedEnhancers =
    DevEnv === "development"
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  const appReducer = combineReducers({
    attractions,
    auth,
    messages,
    asyncTaskReducer,
    users,
    events,
    posts,
    reviews,
  });

  const store = createStore(appReducer, preloadedState, composedEnhancers);
  return store;
};

export default configStore;

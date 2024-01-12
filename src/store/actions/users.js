import * as UserService from "../../services/users";
import { asyncTaskStartAction, asyncTaskStopAction } from "./asyncTask";
import { updateUserProfile } from "./auth";

export const actionTypes = {
  SEARCH_USERS: "SEARCH_USERS",
  CLEANUP_USERS_TO_CHAT: "CLEANUP_USERS_TO_CHAT",
  GET_USER_PROFILE: "GET_USER_PROFILE",
};

export const searchUsers = (payload) => {
  return {
    type: actionTypes.SEARCH_USERS,
    payload,
  };
};

export const searchUsersAsync = (searchValue) => {
  const taskId = actionTypes.SEARCH_USERS;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await UserService.searchUsers(token, searchValue);
      if (response.status === 201) {
        dispatch(searchUsers(response.data));
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const cleanUpUsersToChat = () => {
  return {
    type: actionTypes.CLEANUP_USERS_TO_CHAT,
  };
};

export const getUserProfileAsync = (id) => {
  const taskId = actionTypes.GET_USER_PROFILE;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await UserService.getUserProfile(token, id);
      if (response.status === 200) {
        dispatch(updateUserProfile(response.data));
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const updateUserProfileAsync = (formData) => {
  const taskId = actionTypes.UPDATE_USER_PROFILE;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await UserService.updateUserProfile(token, formData);
      if (response.status === 200) {
        dispatch(updateUserProfile(response.data));
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

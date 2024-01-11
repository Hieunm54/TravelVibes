import { asyncTaskStartAction, asyncTaskStopAction } from "./asyncTask";
import * as PostServices from "../../services/posts";
import { toast } from "react-toastify";

export const actionTypes = {
  GET_POST_LIST: "GET_POST_LIST",
  GET_POST_DETAILS: "GET_POST_DETAILS",
  UPDATE_POST: "UPDATE_POST",
};

export const getPostList = (payload) => {
  return {
    type: actionTypes.GET_POST_LIST,
    payload,
  };
};

export const getPostListAsync = () => {
  const taskId = actionTypes.GET_POST_LIST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await PostServices.getPosts(token);
      if (response.status === 200) {
        dispatch(getPostList(response.data));
      } else {
        toast.error("Fail to get post list");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const getPostDetails = (payload) => {
  return {
    type: actionTypes.GET_POST_DETAILS,
    payload,
  };
};

export const getPostDetailsAsync = (id) => {
  const taskId = actionTypes.GET_POST_DETAILS;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await PostServices.getPost(token, id);
      if (response.status === 200) {
        dispatch(getPostDetails(response.data));
      } else {
        toast.error("Fail to get post detail");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const updatePostAction = (data, id) => {
  return {
    type: actionTypes.UPDATE_POST,
    payload: { data, id },
  };
};

export const updatePostAsync = (id, data) => {
  const taskId = actionTypes.UPDATE_POST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await PostServices.updatePost(token, id, data);
      if (response.status === 200) {
        dispatch(updatePostAction(response.data, id));
      } else {
        toast.error("Fail to update post");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

import { asyncTaskStartAction, asyncTaskStopAction } from "./asyncTask";
import * as UserServices from "../../services/users";
import { toast } from "react-toastify";

export const actionTypes = {
  GET_USER_REVIEW_LIST: "GET_USER_REVIEW_LIST",
};

export const getUserReviewList = (payload) => {
  return {
    type: actionTypes.GET_USER_REVIEW_LIST,
    payload,
  };
};

export const getUserReviewListAsync = () => {
  const taskId = actionTypes.GET_USER_REVIEW_LIST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await UserServices.getUserReviews(token);
      if (response.status === 200) {
        dispatch(getUserReviewList(response.data));
      } else {
        toast.error("Fail to get post list");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

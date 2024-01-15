import { toast } from "react-toastify";
import { asyncTaskStartAction, asyncTaskStopAction } from "./asyncTask";
import * as PostServices from "../../services/posts";
import * as UserServices from "../../services/users";
import * as CommentServices from "../../services/comments";

export const actionTypes = {
  GET_POST_LIST: "GET_POST_LIST",
  GET_POST_DETAILS: "GET_POST_DETAILS",
  UPDATE_POST: "UPDATE_POST",
  GET_COMMENT_LIST: "GET_COMMENT_LIST",
  DELETE_POST: "DELETE_POST",
  SEND_COMMENT: "SEND_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  TOGGLE_UPVOTE: "TOGGLE_UPVOTE",
  GET_USER_POST_LIST: "GET_USER_POST_LIST",
  MOVE_DOWN_ATTRACTION: "EDIT_MOVE_DOWN_ATTRACTION",
  MOVE_UP_ATTRACTION: "EDIT_MOVE_UP_ATTRACTION",
  DELETE_ATTRACTION: "EDIT_DELETE_ATTRACTION",
  ADD_ATTRACTION: "EDIT_ADD_ATTRACTION",
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

export const getUserPostList = (payload) => {
  return {
    type: actionTypes.GET_USER_POST_LIST,
    payload,
  };
};

export const getUserPostListAsync = () => {
  const taskId = actionTypes.GET_USER_POST_LIST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await UserServices.getUserPosts(token);
      if (response.status === 200) {
        dispatch(getUserPostList(response.data));
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

export const getPostCommentListAction = (data, postId) => {
  return {
    type: actionTypes.GET_COMMENT_LIST,
    payload: { data, postId },
  };
};

export const getCommentListAsync = (postId) => {
  const taskId = actionTypes.GET_COMMENT_LIST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await CommentServices.getComments(token, postId);

      if (response.status === 200) {
        dispatch(getPostCommentListAction(response.data, postId));
      } else {
        toast.error("Fail to fetch comment list");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const deletePostAction = (postId) => {
  return {
    type: actionTypes.DELETE_POST,
    payload: postId,
  };
};

export const deletePostAsync = (postId) => {
  const taskId = actionTypes.DELETE_POST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await PostServices.deletePost(token, postId);

      if (response.status === 200) {
        dispatch(deletePostAction(postId));
        toast("Post deletion successful");
      } else {
        toast.error("Fail to delete post");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const sendCommentAction = (postId, data) => {
  return {
    type: actionTypes.SEND_COMMENT,
    payload: { postId, data },
  };
};

export const sendCommentAsync = (postId, data) => {
  const taskId = actionTypes.SEND_COMMENT;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await CommentServices.sendComment(token, postId, data);

      if (response.status === 201) {
        dispatch(sendCommentAction(postId, response.data.comment));
      } else {
        toast.error("Fail to create comment");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const updateCommentAction = (commentId, data) => {
  return {
    type: actionTypes.UPDATE_COMMENT,
    payload: { commentId, data },
  };
};

export const updateCommentAsync = (postId, commentId, data) => {
  const taskId = actionTypes.UPDATE_COMMENT;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await CommentServices.updateComment(
        token,
        postId,
        commentId,
        data
      );

      if (response.status === 200) {
        dispatch(updateCommentAction(commentId, response.data));
        toast.success("Comment updated");
      } else {
        toast.error("Fail to update comment");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const deleteCommentAction = (postId, commentId) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    payload: { postId, commentId },
  };
};

export const deleteCommentAsync = (postId, commentId) => {
  const taskId = actionTypes.DELETE_COMMENT;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await CommentServices.deleteComment(
        token,
        postId,
        commentId
      );

      if (response.status === 200) {
        dispatch(deleteCommentAction(postId, commentId));
        toast.success("Comment deleted");
      } else {
        toast.error("Fail to delete comment");
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};
export const toggleUpvoteAction = (postId, data) => {
  return {
    type: actionTypes.TOGGLE_UPVOTE,
    payload: { postId, data },
  };
};
export const toggleUpvoteAsync = (postId) => {
  const taskId = actionTypes.TOGGLE_UPVOTE;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await PostServices.toggleUpvote(token, postId);

      if (response.status === 201) {
        dispatch(toggleUpvoteAction(postId, response.data));
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const moveDownAttraction = (index) => {
  return {
    type: actionTypes.MOVE_DOWN_ATTRACTION,
    payload: index,
  };
};

export const moveUpAttraction = (index) => {
  return {
    type: actionTypes.MOVE_UP_ATTRACTION,
    payload: index,
  };
};

export const deleteAttraction = (index) => {
  return {
    type: actionTypes.DELETE_ATTRACTION,
    payload: index,
  };
};

export const addAttraction = (attraction) => {
  return {
    type: actionTypes.ADD_ATTRACTION,
    payload: { attraction },
  };
};

import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getComments = async (token, postId) => {
  return axios.get(`${CONST.API_URL}/api/posts/${postId}/comments`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const sendComment = async (token, postId, data) => {
  return axios.post(`${CONST.API_URL}/api/posts/${postId}/comments`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const updateComment = async (token, postId, commentId, data) => {
  return axios.put(
    `${CONST.API_URL}/api/posts/${postId}/comments/${commentId}`,
    data,
    {
      headers: {
        Authorization: authorizationHeader(token),
      },
    }
  );
};

export const deleteComment = async (token, postId, commentId) => {
  return axios.delete(
    `${CONST.API_URL}/api/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: authorizationHeader(token),
      },
    }
  );
};

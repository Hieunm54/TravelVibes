import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const getComments = async (token, postId) => {
  return axios.get(`${API_URL}/api/posts/${postId}/comments`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const sendComment = async (token, postId, data) => {
  return axios.post(`${API_URL}/api/posts/${postId}/comments`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const updateComment = async (token, postId, commentId, data) => {
  return axios.put(
    `${API_URL}/api/posts/${postId}/comments/${commentId}`,
    data,
    {
      headers: {
        Authorization: authorizationHeader(token),
      },
    }
  );
};

export const deleteComment = async (token, postId, commentId) => {
  return axios.delete(`${API_URL}/api/posts/${postId}/comments/${commentId}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

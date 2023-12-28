import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (token) => {
  return axios.get(`${API_URL}/api/posts`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getPost = async (token, id) => {
  return axios.get(`${API_URL}/api/posts/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const createPost = async (token, data) => {
  return axios.post(`${API_URL}/api/posts`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const deletePost = async (token, id) => {
  return axios.delete(`${API_URL}/api/posts/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const toggleUpvote = async (token, postId) => {
  return axios.post(`${API_URL}/api/posts/${postId}/vote`, null, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

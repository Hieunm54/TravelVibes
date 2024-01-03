import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getPosts = async (token) => {
  return axios.get(`${CONST.API_URL}/api/posts`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getPost = async (token, id) => {
  return axios.get(`${CONST.API_URL}/api/posts/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const createPost = async (token, data) => {
  return axios.post(`${CONST.API_URL}/api/posts`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const updatePost = async (token, id, data) => {
  return axios.put(`${CONST.API_URL}/api/posts/${id}`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const deletePost = async (token, id) => {
  return axios.delete(`${CONST.API_URL}/api/posts/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const toggleUpvote = async (token, postId) => {
  return axios.post(`${CONST.API_URL}/api/posts/${postId}/vote`, null, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

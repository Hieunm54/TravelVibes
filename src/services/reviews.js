import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const getReviews = async (token, attractionId) => {
  return axios.get(`${API_URL}/api/reviews/${attractionId}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const createReview = async (token, attractionId, formData) => {
  return axios.post(`${API_URL}/api/reviews/${attractionId}`, formData, {
    headers: {
      Authorization: authorizationHeader(token),
      "Content-Type": "multipart/form-data",
    },
  });
};

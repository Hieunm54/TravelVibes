import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getReviews = async (token, attractionId) => {
  return axios.get(`${CONST.API_URL}/api/reviews/${attractionId}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const createReview = async (token, attractionId, formData) => {
  return axios.post(`${CONST.API_URL}/api/reviews/${attractionId}`, formData, {
    headers: {
      Authorization: authorizationHeader(token),
      "Content-Type": "multipart/form-data",
    },
  });
};

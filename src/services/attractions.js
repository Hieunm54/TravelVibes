import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const getAttractions = async (token, params = null) => {
  return axios.get(`${API_URL}/api/attractions`, {
    params: params,
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getAttraction = async (token, id) => {
  return axios.get(`${API_URL}/api/attractions/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

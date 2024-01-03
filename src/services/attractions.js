import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getAttractions = async (token, params = null) => {
  return axios.get(`${CONST.API_URL}/api/attractions`, {
    params: params,
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getAttraction = async (token, id) => {
  return axios.get(`${CONST.API_URL}/api/attractions/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

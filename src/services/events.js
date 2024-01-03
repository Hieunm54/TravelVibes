import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getEvent = async (token, id) => {
  return axios.get(`${CONST.API_URL}/api/events/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

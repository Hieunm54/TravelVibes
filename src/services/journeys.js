import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const createJourneys = async (token, data) => {
  return axios.post(`${API_URL}/api/journeys`, data, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

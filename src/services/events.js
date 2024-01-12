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

export const getApprovedEvents = async (token) => {
  return axios.get(`${CONST.API_URL}/api/events`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const createNewEvent = async (formData, token) => {
  return axios.post(`${CONST.API_URL}/api/events`, formData, {
    headers: {
      Authorization: authorizationHeader(token),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllMyEvents = async (token) => {
  return axios.get(`${CONST.API_URL}/api/events/me`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getEventDetail = async (id, token) => {
  return axios.get(`${CONST.API_URL}/api/events/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const updateEvent = async (id, formData, token) => {
  return axios.put(`${CONST.API_URL}/api/events/${id}`, formData, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

// For admin
export const getAllEvents = async (adminToken) => {
  return axios.get(`${CONST.API_URL}/api/admin/events`, {
    headers: {
      Authorization: authorizationHeader(adminToken),
    },
  });
};

export const updateEventStatus = async (adminToken, id, status) => {
  return axios.put(
    `${CONST.API_URL}/api/admin/events/${id}/verify`,
    { status },
    {
      headers: {
        Authorization: authorizationHeader(adminToken),
      },
    }
  );
};

import axios from "axios";
import { authorizationHeader } from "./jwt";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllChats = async (token) => {
  return axios.get(`${API_URL}/api/chats`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getChatDetail = async (chatId, token) => {
  return axios.get(`${API_URL}/api/chats/${chatId}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getAllMessages = async (chatId, token) => {
  return axios.get(`${API_URL}/api/chats/messages/${chatId}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const addNewMessage = async (content, receiverID, chatID, token) => {
  return axios.post(
    `${API_URL}/api/chats/messages/${chatID}`,
    {
      content,
      receiverID,
    },
    {
      headers: {
        Authorization: authorizationHeader(token),
      },
    }
  );
};

export const createNewChat = async (participantID, message, token) => {
  return axios.post(
    `${API_URL}/api/chats`,
    {
      participantID,
      message,
    },
    {
      headers: {
        Authorization: authorizationHeader(token),
      },
    }
  );
};

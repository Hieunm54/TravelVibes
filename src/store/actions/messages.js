import { asyncTaskStartAction, asyncTaskStopAction } from "../asyncTask";
import * as chatService from "../../services/chats";

export const actionTypes = {
  GET_CHAT_LIST: "GET_CHAT_LIST",
  GET_CHAT_DETAIL: "GET_CHAT_DETAIL",
  GET_MESSAGES: "GET_MESSAGES",
  ADD_NEW_MESSAGE: "ADD_NEW_MESSAGE",
  UPDATE_LAST_MESSAGE: "UPDATE_LAST_MESSAGE",
  CREATE_CHAT_OPTIMISTIC: "CREATE_CHAT_OPTIMISTIC",
  CREATE_CHAT: "CREATE_CHAT",
  CREATE_CACHED_MESSAGE: "CREATE_CACHED_MESSAGE",
  CLEAN_UP_CACHED_MESSAGE: "CLEAN_UP_CACHED_MESSAGE",
};

// ACTION
export const getChatListAction = (payload = []) => {
  return {
    type: actionTypes.GET_CHAT_LIST,
    payload,
  };
};

export const getChatListAsync = () => {
  const taskId = actionTypes.GET_CHAT_LIST;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;
      const response = await chatService.getAllChats(token);

      if (response.status === 200) {
        dispatch(getChatListAction(response.data));
      }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const getAllMessagesForChat = (payload) => {
  return {
    type: actionTypes.GET_MESSAGES,
    payload,
  };
};

export const getAllMessagesAsync = (chatId) => {
  const taskId = actionTypes.GET_MESSAGES;
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await chatService.getAllMessages(chatId, token);

      if (response.status === 200) {
        dispatch(getAllMessagesForChat(response.data));
      }
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const getChatDetail = (payload) => {
  return {
    type: actionTypes.GET_CHAT_DETAIL,
    payload,
  };
};

export const getChatDetailAsync = (chatId) => {
  const taskId = actionTypes.GET_CHAT_DETAIL;
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await chatService.getChatDetail(chatId, token);

      if (response.status === 200) {
        dispatch(getChatDetail(response.data));
      }
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const addNewMessage = (payload) => {
  return {
    type: actionTypes.ADD_NEW_MESSAGE,
    payload,
  };
};

export const addNewMessageAsync = ({ content, receiverID, chatID }) => {
  const taskId = actionTypes.ADD_NEW_MESSAGE;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;
      const response = await chatService.addNewMessage(
        content,
        receiverID,
        chatID,
        token
      );
      if (response.status === 201) {
        dispatch(addNewMessage(response.data));
      }
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const updateLastMessage = (payload) => {
  return {
    type: actionTypes.UPDATE_LAST_MESSAGE,
    payload,
  };
};

export const createChatOptimistic = (payload) => {
  return {
    type: actionTypes.CREATE_CHAT_OPTIMISTIC,
    payload,
  };
};

export const createChatAsync = (participantID, message) => {
  const taskId = actionTypes.CREATE_CHAT_OPTIMISTIC;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const token = getState().auth.token;

      const response = await chatService.createNewChat(
        participantID,
        message,
        token
      );
      if (response.status === 201) {
        console.log("hieu check ", response);
        await dispatch(getChatListAsync());
        dispatch(addNewMessage(response.data.message));
      }
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error));
    }
  };
};

export const createCachedMessage = (message) => {
  return {
    type: actionTypes.CREATE_CACHED_MESSAGE,
    payload: message,
  };
};

export const cleanUpCachedMessage = () => {
  return {
    type: actionTypes.CLEAN_UP_CACHED_MESSAGE,
  };
};

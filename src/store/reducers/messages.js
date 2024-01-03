import { CONST } from "../../constaints";
import { actionTypes } from "../actions/messages";

export const messagesDefaultState = {
  chatList: [],
  currentChat: { chat: {}, receiverUser: {} },
  currentMessages: [],
  cachedMessage: "",
};

// REDUCER
export const messages = (state = messagesDefaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHAT_LIST:
      return { ...state, chatList: action.payload };
    case actionTypes.GET_MESSAGES:
      return { ...state, currentMessages: action.payload };
    case actionTypes.GET_CHAT_DETAIL:
      return { ...state, currentChat: action.payload };
    case actionTypes.ADD_NEW_MESSAGE:
      return {
        ...state,
        currentMessages: [...state.currentMessages, action.payload],
      };
    case actionTypes.UPDATE_LAST_MESSAGE: {
      const { chat: chatId, content, createdAt } = action.payload;
      const index = state.chatList.findIndex((chat) => chat._id === chatId);
      if (index === -1) {
        return state;
      }
      const updatedChat = {
        ...state.chatList[index],
        lastMessage: {
          content,
          createdAt,
        },
      };

      const updatedChatList = [...state.chatList];
      updatedChatList[index] = updatedChat;

      return {
        ...state,
        chatList: updatedChatList,
      };
    }
    case actionTypes.CREATE_CHAT_OPTIMISTIC: {
      const { receiver, sender } = action.payload;

      const optimisticChat = {
        _id: CONST.OPTIMISTIC_CHAT_ID,
        member: [sender._id, receiver._id],
        createdAt: Date.now(),
        lastMessage: {
          content: `Start a chat with ${receiver.firstName}`,
          // createdAt: Date.now(),
        },
        receiverUser: receiver,
      };
      return {
        ...state,
        chatList: [optimisticChat, ...state.chatList],
      };
    }
    case actionTypes.CREATE_CACHED_MESSAGE:
      return {
        ...state,
        cachedMessage: action.payload,
      };
    case actionTypes.CLEAN_UP_CACHED_MESSAGE:
      return {
        ...state,
        cachedMessage: "",
      };
    default:
      return state;
  }
};

export default messages;

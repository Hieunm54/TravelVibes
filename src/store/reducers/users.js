import { actionTypes } from "../actions/users";

export const usersDefaultState = {
  usersToChat: [],
};

const users = (state = usersDefaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_USERS:
      return {
        ...state,
        usersToChat: action.payload,
      };
    case actionTypes.CLEANUP_USERS_TO_CHAT:
      return {
        ...state,
        usersToChat: [],
      };
    default:
      return state;
  }
};

export default users;

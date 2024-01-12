import { actionTypes } from "./actions/auth";

export const authDefaultState = { token: null, user: null };
// REDUCER
const auth = (state = authDefaultState, action) => {
  switch (action.type) {
    case actionTypes.logIn:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case actionTypes.adminLogIn:
      return {
        ...state,
        adminToken: action.payload.adminToken,
        admin: action.payload.admin,
      };
    case actionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default auth;

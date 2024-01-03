const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
  adminLogIn: "SAVE_ADMIN_LOG_IN_INFO",
};

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
        adminToken: action.adminToken,
      };
    default:
      return state;
  }
};

export const saveLogInInfo = (token, user) => ({
  type: actionTypes.logIn,
  payload: { token, user },
});

export const saveAdminLogInInfo = (token) => ({
  type: actionTypes.adminLogIn,
  adminToken: token,
});

export default auth;

const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
  adminLogIn: "SAVE_ADMIN_LOG_IN_INFO",
};

const auth = (state = { token: null, adminToken: null }, action) => {
  switch (action.type) {
    case actionTypes.logIn:
      return {
        token: action.token,
      };
    case actionTypes.adminLogIn:
      return {
        adminToken: action.adminToken,
      };
    default:
      return state;
  }
};

export const saveLogInInfo = (token) => ({
  type: actionTypes.logIn,
  token: token,
});

export const saveAdminLogInInfo = (token) => ({
  type: actionTypes.adminLogIn,
  adminToken: token,
});

export default auth;

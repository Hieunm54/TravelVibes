const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
};

const auth = (state = { token: null, user: null }, action) => {
  switch (action.type) {
    case actionTypes.logIn:
      return {
        token: action.token,
      };
    default:
      return state;
  }
};

export const saveLogInInfo = (token) => ({
  type: actionTypes.logIn,
  token: token,
});

export default auth;

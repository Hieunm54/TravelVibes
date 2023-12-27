const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
};

const auth = (state = { token: null, user: null }, action) => {
  switch (action.type) {
    case actionTypes.logIn:
      return {
        token: action.token,
        user: { ...action.user },
      };
    default:
      return state;
  }
};

export const saveLogInInfo = (token, user) => ({
  type: actionTypes.logIn,
  token: token,
  user: user,
});

export default auth;

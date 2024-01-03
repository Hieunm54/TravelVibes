const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
};

export const authDefaultState = { token: null, user: null };
// REDUCER
const auth = (state = authDefaultState, action) => {
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

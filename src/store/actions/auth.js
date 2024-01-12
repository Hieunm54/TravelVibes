export const actionTypes = {
  logIn: "SAVE_LOG_IN_INFO",
  adminLogIn: "SAVE_ADMIN_LOG_IN_INFO",
  UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
};

export const saveLogInInfo = (token, user) => ({
  type: actionTypes.logIn,
  payload: { token, user },
});

export const saveAdminLogInInfo = (token, admin) => ({
  type: actionTypes.adminLogIn,
  payload: { token, admin },
});

export const updateUserProfile = (payload) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE,
    payload,
  };
};

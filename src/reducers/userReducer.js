const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data;
    case 'USER_LOGOUT':
      return null;
    default:
      return state;
  };
};

export const userLogin = (user) => {
  return {
    type: 'USER_LOGIN',
    data: user,
  }
}

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  }
}

export default userReducer;

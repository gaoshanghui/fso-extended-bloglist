// Defining reducer
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  };
};

// Defining action creators
export const setNotification = (content, isSuccessful) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content,
      isSuccessful, // true or false
    },
  }
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
};

export default notificationReducer;

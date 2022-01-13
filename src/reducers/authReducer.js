const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        token: action.token
      };

    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;

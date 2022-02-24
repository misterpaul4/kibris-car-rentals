const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        username: action.username
      };

    case 'LOGOUT':
    return {
        ...state,
        loggedIn: false,
        token: "",
        username: ""};

    default:
      return state;
  }
};

export default authReducer;

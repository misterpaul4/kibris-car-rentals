const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('username', action.username);
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        username: action.username,
        revealModal: false,
      };

    case 'SHOW_LOGIN_MODAL':
      return {
        ...state,
        loggedIn: false,
        revealModal: true,
      };

    case 'HIDE_LOGIN_MODAL':
      return {
        ...state,
        revealModal: false,
      };

    case 'LOGOUT':
    localStorage.clear();
    return {
        ...state,
        loggedIn: false,
        token: "",
        username: "",
        revealModal: false,
      };

    default:
      return state;
  }
};

export default authReducer;

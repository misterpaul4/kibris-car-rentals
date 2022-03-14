const login = ({username, token}) => ({
  type: 'LOGIN',
  username,
  token
});

const showModal = () => ({
  type: 'SHOW_LOGIN_MODAL',
});

const hideModal = () => ({
  type: 'HIDE_LOGIN_MODAL',
});

const logout = () => ({
  type: 'LOGOUT',
});

export { login, logout, hideModal, showModal };

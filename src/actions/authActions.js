const login = ({username, token, company}) => ({
  type: 'LOGIN',
  username,
  token,
  company,
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

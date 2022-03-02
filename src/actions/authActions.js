const login = ({username, token}) => ({
  type: 'LOGIN',
  username,
  token
});

const logout = () => ({
  type: 'LOGOUT',
});

export { login, logout };

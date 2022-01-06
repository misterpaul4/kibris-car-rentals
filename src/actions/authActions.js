const login = () => ({
  type: 'LOGIN',
  token,
});

const logout = () => ({
  type: 'LOGOUT',
});

export { login, logout };

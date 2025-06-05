export const isAuthenticated = () => {
  return localStorage.getItem('auth') !== null;
};

export const getAuthUser = () => {
  const auth = localStorage.getItem('auth');
  try {
    return auth ? JSON.parse(auth) : null;
  } catch (e) {
    return null;
  }
};

export const getAuthToken = () => {
  const user = getAuthUser();
  return user ? user.token : null;
};

export const hasRole = (requiredRole) => {
  const user = getAuthUser();
  return user && user.role === requiredRole;
};

export const logout = () => {
  localStorage.removeItem('auth');
  window.location.href = '/'; 
};
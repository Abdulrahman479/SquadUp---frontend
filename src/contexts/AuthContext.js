import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    if (token) return parseJwt(token);
    return null;
  });

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(parseJwt(newToken));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
      setUser(storedToken ? parseJwt(storedToken) : null);
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

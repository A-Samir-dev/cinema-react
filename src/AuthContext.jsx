import { createContext, useContext, useState } from 'react';
import api from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const saveSession = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    saveSession(res.data.data);
  };

  const register = async (form) => {
    const res = await api.post('/register', form);
    saveSession(res.data.data);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // حتى لو فشل الطلب هنمسح الجلسة من عندنا
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
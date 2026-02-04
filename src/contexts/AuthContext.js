import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Set up axios interceptor for token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token: newToken, user } = response.data;
    setToken(newToken);
    setCurrentUser(user);
    localStorage.setItem('token', newToken);
    return user;
  };

  const googleLogin = async (credential, additionalInfo = {}) => {
    const response = await axios.post('/api/auth/google', {
      credential,
      ...additionalInfo
    });
    
    if (response.data.needsAdditionalInfo) {
      return response.data;
    }

    const { token: newToken, user } = response.data;
    setToken(newToken);
    setCurrentUser(user);
    localStorage.setItem('token', newToken);
    return user;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    const { token: newToken, user } = response.data;
    setToken(newToken);
    setCurrentUser(user);
    localStorage.setItem('token', newToken);
    return user;
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const updateProfile = async (profileData) => {
    const response = await axios.patch('/api/auth/profile', profileData);
    setCurrentUser(response.data);
    return response.data;
  };

  const changePassword = async (currentPassword, newPassword) => {
    await axios.patch('/api/auth/password', {
      currentPassword,
      newPassword
    });
  };

  const value = {
    currentUser,
    login,
    googleLogin,
    register,
    logout,
    updateProfile,
    changePassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

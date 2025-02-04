import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Changed to a named function declaration
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error restoring auth state:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, []);

  const login = (userData) => {
    try {
      if (!userData.token || !userData.user) {
        throw new Error('Invalid login data');
      }

      setUser(userData.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Changed to a named function declaration
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
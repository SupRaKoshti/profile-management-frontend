import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';
import { storage } from '../utils/storage';
import { User, LoginRequest, SignupRequest, TokenResponse } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await storage.getToken();
      if (token) {
        const response = await api.get<User>('/profile/me');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await storage.removeToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    const response = await api.post<TokenResponse>('/auth/login', credentials);
    await storage.setToken(response.data.access_token);
    
    // Fetch user data
    const userResponse = await api.get<User>('/profile/me');
    setUser(userResponse.data);
  };

  const signup = async (data: SignupRequest) => {
    const response = await api.post<TokenResponse>('/auth/signup', data);
    await storage.setToken(response.data.access_token);
    
    // Fetch user data
    const userResponse = await api.get<User>('/profile/me');
    setUser(userResponse.data);
  };

  const logout = async () => {
    await storage.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
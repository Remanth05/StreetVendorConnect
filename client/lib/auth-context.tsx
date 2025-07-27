import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, LoginResponse } from '@shared/api';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetchProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } else {
        localStorage.removeItem('auth-token');
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      localStorage.removeItem('auth-token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data: LoginResponse = await response.json();
      
      if (data.success && data.user && data.token) {
        setUser(data.user);
        localStorage.setItem('auth-token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-token');
    // Call logout API
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

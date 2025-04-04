
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define the mock users
const MOCK_USERS = {
  "muser": { id: "1", password: "muser", role: "user", name: "Mock User" },
  "mvc": { id: "2", password: "mvc", role: "admin", name: "Admin User" }
};

export type User = {
  id: string;
  username: string;
  role: "user" | "admin";
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('viralUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Try to use mock users first for frontend testing
    if (username in MOCK_USERS && MOCK_USERS[username as keyof typeof MOCK_USERS].password === password) {
      const mockUser = MOCK_USERS[username as keyof typeof MOCK_USERS];
      const userData: User = {
        id: mockUser.id,
        username: username,
        role: mockUser.role as "user" | "admin",
        name: mockUser.name
      };
      setUser(userData);
      localStorage.setItem('viralUser', JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.name}!`);
      setIsLoading(false);
      return true;
    }

    try {
      // Simulate a backend API call
      // In a real app, this would be an actual fetch request to your Flask backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just use the mock users
      // In a real app, you'd check the response from the server
      
      toast.error('Invalid username or password');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (username: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    if (username in MOCK_USERS) {
      toast.error('Username already exists');
      setIsLoading(false);
      return false;
    }
    
    try {
      // Simulate a backend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just create a user in local storage
      const newUser: User = {
        id: Date.now().toString(),
        username,
        role: "user",
        name
      };
      
      setUser(newUser);
      localStorage.setItem('viralUser', JSON.stringify(newUser));
      toast.success('Registration successful! Welcome!');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('viralUser');
    toast.success('You have been logged out');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

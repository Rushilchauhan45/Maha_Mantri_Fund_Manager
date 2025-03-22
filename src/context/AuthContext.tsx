
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type UserRole = 'Maha-Mantri' | 'Mantri';

interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users = [
  { id: '1', username: 'admin', password: 'admin@123', name: 'Parth Kacha', role: 'Maha-Mantri' as UserRole },
  { id: '2', username: 'vimalchauhan', password: 'Vimal@123', name: 'Vimal Chauhan', role: 'Mantri' as UserRole },
  { id: '3', username: 'dhavalchauhan', password: 'Dhaval@123', name: 'Dhaval Chauhan', role: 'Mantri' as UserRole },
  { id: '4', username: 'mihirchauhan', password: 'Mihir@123', name: 'Mihir Chauhan', role: 'Mantri' as UserRole },
  { id: '5', username: 'rushilchauhan', password: 'Rushil@123', name: 'Rushil Chauhan', role: 'Mantri' as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    const foundUser = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${userWithoutPassword.name}!`, {
        description: `You've successfully logged in as ${userWithoutPassword.role}`,
      });
      
      return true;
    } else {
      toast.error("Invalid credentials", {
        description: "Please check your username and password",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You've been logged out");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

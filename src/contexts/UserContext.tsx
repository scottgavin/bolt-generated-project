import React, { createContext, useContext, useState, ReactNode } from 'react';
    import { login as apiLogin } from '../api';

    interface User {
      id: string;
      email: string;
      name: string;
      department: string;
      role: 'team_member' | 'department_head';
    }

    interface UserContextType {
      user: User | null;
      login: (email: string, password: string) => Promise<boolean>;
      logout: () => void;
    }

    const UserContext = createContext<UserContextType | undefined>(undefined);

    export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);

      const login = async (email: string, password: string): Promise<boolean> => {
        try {
          const { token, user } = await apiLogin(email, password);
          localStorage.setItem('token', token);
          setUser(user);
          return true;
        } catch {
          return false;
        }
      };

      const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
      };

      return (
        <UserContext.Provider value={{ user, login, logout }}>
          {children}
        </UserContext.Provider>
      );
    };

    export const useUser = (): UserContextType => {
      const context = useContext(UserContext);
      if (!context) {
        throw new Error('useUser must be used within a UserProvider');
      }
      return context;
    };

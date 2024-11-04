import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
    import { fetchUpdates, createUpdate } from '../api';
    import { useUser } from './UserContext';

    interface Update {
      id: string;
      text: string;
      tags: string[];
      imageBase64?: string;
      linkUrl?: string;
      userId: string;
      department: string;
      createdAt: Date;
      updatedAt: Date;
    }

    interface UpdateContextType {
      updates: Update[];
      addUpdate: (text: string, tags: string[], imageBase64?: string, linkUrl?: string) => Promise<void>;
    }

    const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

    export const UpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const { user } = useUser();
      const [updates, setUpdates] = useState<Update[]>([]);

      useEffect(() => {
        const loadUpdates = async () => {
          const data = await fetchUpdates();
          setUpdates(data);
        };
        loadUpdates();
      }, []);

      const addUpdate = async (text: string, tags: string[], imageBase64?: string, linkUrl?: string) => {
        if (user) {
          const newUpdate: Update = {
            id: Date.now().toString(),
            text,
            tags,
            imageBase64,
            linkUrl,
            userId: user.id,
            department: user.department,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const savedUpdate = await createUpdate(newUpdate);
          setUpdates([...updates, savedUpdate]);
        }
      };

      return (
        <UpdateContext.Provider value={{ updates, addUpdate }}>
          {children}
        </UpdateContext.Provider>
      );
    };

    export const useUpdates = (): UpdateContextType => {
      const context = useContext(UpdateContext);
      if (!context) {
        throw new Error('useUpdates must be used within an UpdateProvider');
      }
      return context;
    };

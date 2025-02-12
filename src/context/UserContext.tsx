import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userId: string | null;
}

const UserContext = createContext<UserContextType>({ userId: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  if (!userId) return null;

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

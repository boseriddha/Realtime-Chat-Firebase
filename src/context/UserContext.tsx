import { FC, useState, createContext, useEffect } from "react";

interface UserContextProps {
  children: React.ReactNode;
}

interface userData {
  userId: string | null;
  setUserId(userId: string): void;
}

const initUserData: userData = {
  userId: "",
  setUserId(userId: string) {
    console.log(userId);
  },
};

const UserContext = createContext<userData>(initUserData);

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(() => {
    const storedData = localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId")!)
      : null;
    return storedData;
  });

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  console.log(userId);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;

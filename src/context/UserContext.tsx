import { FC, useState, createContext, useEffect } from "react";

interface UserContextProps {
  children: React.ReactNode;
}

interface userData {
  userId: string | null;
  setUserId(userId: string | null): void;
  friendId: string | null;
  setFriendId(friendId: string | null): void;
}

const initUserData: userData = {
  userId: "",
  setUserId(userId: string) {
    console.log(userId);
  },
  friendId: "",
  setFriendId(friendId: string) {
    console.log(friendId);
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

  const [friendId, setFriendId] = useState<string | null>(() => {
    const storedData = localStorage.getItem("friendId")
      ? JSON.parse(localStorage.getItem("friendId")!)
      : null;
    return storedData;
  });

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));

    return () => {
      localStorage.removeItem("userId");
    };
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("friendId", JSON.stringify(friendId));

    return () => {
      localStorage.removeItem("friendId");
    };
  }, [friendId]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        friendId,
        setFriendId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;

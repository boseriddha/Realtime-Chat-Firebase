import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { DocumentData } from "firebase/firestore";
import { firestoreGetData } from "../firebaseDb";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { userId } = useContext(UserContext);
  const [friendList, setFriendList] = useState<string[]>([]);

  const getFriends = async (userId: string) => {
    const doc: DocumentData | null = await firestoreGetData(userId);
    if (doc!.exists()) {
      const obj: User = doc!.data();
      setFriendList(obj.friends);
    } else {
      setFriendList([]);
    }
  };

  useEffect(() => {
    if (userId) {
      getFriends(userId!);
    } else return;
  }, [friendList]);

  return (
    <>
      <h1 className="text-3xl">Hello World</h1>
      {friendList.map((ele) => (
        <p>{ele}</p>
      ))}
    </>
  );
};

export default Dashboard;

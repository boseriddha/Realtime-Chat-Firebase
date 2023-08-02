import { FC, useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { firestoreGetAllFriends } from "../firebaseDb";
import { v4 as uuidv4 } from "uuid";
import SingleContact from "../components/SingleContact";
import ChatComponent from "../components/ChatComponent";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { userId, friendId } = useContext(UserContext);
  const room = useRef<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<FriendType[]>([]);

  async function getAllFriends() {
    if (userId) {
      const res = await firestoreGetAllFriends(userId);
      return res;
    } else {
      const res = [{ friendId: "", friendName: "" }];
      return res;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getAllFriends().then((arr) => {
      setFriendList(arr);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    room.current =
      userId! < friendId! ? `${userId}+${friendId}` : `${friendId}+${userId}`;
  }, [friendId]);

  return (
    <>
      <div className="grid grid-cols-12 mx-auto w-[95%] drop-shadow-xl">
        <div className="col-span-3 h-[100vh] bg-white px-2 overflow-auto">
          {isLoading && friendList.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div>
              The contacts are:
              {friendList.map((friend) => (
                <SingleContact
                  key={uuidv4()}
                  name={friend.friendName}
                  id={friend.friendId}
                />
              ))}
            </div>
          )}
        </div>
        {toggle ? (
          <ChatComponent room={room.current} />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (friendId === null) {
                alert("Set friend first");
              }
              if (friendId !== null) {
                setToggle(!toggle);
              }
            }}
          >
            <button className="border border-gray-800">Start Chat!</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Dashboard;

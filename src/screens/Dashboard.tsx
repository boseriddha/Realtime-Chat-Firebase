import { FC, useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { firestoreGetAllFriends } from "../firebaseDb";
import { firebaseSignOut } from "../firebaseAuth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SingleContact from "../components/SingleContact";
import ChatComponent from "../components/ChatComponent";
import { toast } from "react-hot-toast";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { userId, setUserId, friendId, setFriendId } = useContext(UserContext);
  const room = useRef<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<FriendType[]>([]);
  const nav = useNavigate();

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

  const AddFriend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nav("/add");
  };

  const SignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nav("/");
    try {
      firebaseSignOut();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setUserId(null);
    setFriendId(null);
    toast.success("Signed Out Successfully");
  };

  return (
    <>
      <div className="grid grid-cols-12 mx-auto w-[95%] drop-shadow-xl">
        <div className="col-span-3 h-[100vh] bg-white px-2 overflow-auto flex flex-col">
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
          <div className="mt-auto mb-6 justify-end">
            <button
              className="flex justify-start gap-2 my-4"
              onClick={AddFriend}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <p>Add Friend</p>
            </button>
            <button className="flex justify-start gap-2 my-4" onClick={SignOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <p>Sign Out</p>
            </button>
          </div>
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

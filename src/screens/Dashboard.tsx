import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { firestoreGetAllFriends } from "../firebaseDb";
import { v4 as uuidv4 } from "uuid";
import SingleContact from "../components/SingleContact";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<FriendType[]>([]);

  async function getAllFriends() {
    const res = await firestoreGetAllFriends(userId!);
    return res;
  }

  useEffect(() => {
    setIsLoading(true);
    getAllFriends().then((arr) => {
      setFriendList(arr);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 mx-auto w-[95%] drop-shadow-xl">
        <div className="col-span-3 h-[100vh] bg-white px-2 overflow-auto">
          {isLoading && friendList.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div>
              {console.log(friendList)!}
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
        <div className="col-span-9 bg-indigo-100 my-2 rounded-md flex flex-col justify-end lg:text-3xl md:text-2xl sm:text-xl">
          <form>
            <div className="flex items-end justify-center gap-2 lg:text-3xl md:text-lg sm:text-base xs:text-[8px]">
              <input
                type="text"
                className="w-[90%] p-2 rounded-md lg:m-4 md:m-2 sm:m-2 xs:m-2 lg:h-[50px] md:h-[40px] sm:h-[30px] xs:h-[20px]"
                placeholder="enter your message"
              />
              <button className="border-gray-500 rounded-full border-2 my-3 mr-1 lg:p-4 hover:bg-gray-500 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 xs:w-2 xs:h-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

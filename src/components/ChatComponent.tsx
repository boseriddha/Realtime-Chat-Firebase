import { FC, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

interface ChatComponentProps {
  room: string;
}

interface Message {
  user: string;
  text: string;
}

const ChatComponent: FC<ChatComponentProps> = ({ room }) => {
  const [message, setMessage] = useState<string>("");
  const [flag, setFlag] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const { userId, friendId } = useContext(UserContext);
  const ENDPOINT = "http://localhost:8000/";

  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.emit("join", userId, room, (error: Error) => {
      if (error) {
        setFlag(1);
        alert(error);
      }
    });
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("roomData", ({ users }: { users: string[] }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    console.log("Friend ID Changed");
    socket.emit("changeRoom", userId, room, (error: Error) => {
      if (error) {
        setFlag(1);
        alert(error);
      }
    });
  }, [friendId]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (users.length === 1) {
      alert("The other user is not online");
      return;
    }

    if (message) {
      socket.emit("sendMessage", userId, message, (error: Error) => {
        if (error) {
          setFlag(1);
          alert(error);
        } else {
          setMessage("");
        }
      });
    }
  };

  if (flag) {
    return null;
  }

  if (friendId === null) {
    return <div>The userId and friendId are still null</div>;
  }

  return (
    <div className="col-span-9 bg-indigo-100 my-2 rounded-md flex flex-col justify-end lg:text-3xl md:text-2xl sm:text-xl">
      <div>
        <ul>
          {messages.map((message) => (
            <li key={uuidv4()} className="block">
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <div className="flex items-end justify-center gap-2 lg:text-3xl md:text-lg sm:text-base xs:text-[8px]">
          <input
            type="text"
            className="w-[90%] p-2 rounded-md lg:m-4 md:m-2 sm:m-2 xs:m-2 lg:h-[50px] md:h-[40px] sm:h-[30px] xs:h-[20px]"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="border-gray-500 rounded-full border-2 my-3 mr-1 lg:p-4 hover:bg-gray-500 hover:text-white"
            type="submit"
          >
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
  );
};

export default ChatComponent;

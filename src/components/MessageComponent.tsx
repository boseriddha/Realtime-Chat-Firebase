import { FC, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { v4 as uuidv4 } from "uuid";

interface Message {
  user: string;
  text: string;
}

interface MessageComponentProps {
  messages: Message[];
}

const MessageComponent: FC<MessageComponentProps> = ({ messages }) => {
  const { userId } = useContext(UserContext);
  return (
    <div className="h-full w-full flex flex-col text-base">
      {messages.map((message: Message) => {
        if (message.user === "admin") {
          return (
            <div
              key={uuidv4()}
              className="items-center text-gray-600 p-2 mx-4 my-2 border border-gray-600 rounded-md h-fit text-center"
            >
              {message.text}
            </div>
          );
        } else if (message.user === userId) {
          return (
            <div
              className="items-center flex w-inherit mx-4 my-2 p-2 bg-teal-600 bg-opacity-25"
              key={uuidv4()}
            >
              <div className="ml-auto w-fit">{message.text}</div>
            </div>
          );
        } else {
          return (
            <div
              className="items-center w-inherit mx-4 my-2 p-2 bg-gray-700 bg-opacity-25"
              key={uuidv4()}
            >
              {message.text}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MessageComponent;

import { FC, useContext } from "react";
import { UserContext } from "../context/UserContext";

interface SingleContactProps {
  name: string;
  id: string;
}

const SingleContact: FC<SingleContactProps> = ({ name, id }) => {
  const { setFriendId } = useContext(UserContext);

  const clickHandler = () => {
    setFriendId(id);
  };

  return (
    <div
      className="min-w-full p-2 my-2 flex justify-start items-center gap-2 text-2xl bg-gray-300 rounded drop-shadow-xl lg:h-[70px] md:h-[50px] sm:h-[40px] xs:h-[30px] border-2 border-white-100 cursor-pointer"
      onClick={clickHandler}
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
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <p className="font-bold lg:text-3xl md:text-lg sm:text-base xs:text-[8px]">
        {name}
      </p>
    </div>
  );
};

export default SingleContact;

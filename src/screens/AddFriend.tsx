import { Loader2 } from "lucide-react";
import { FC, useState, useContext } from "react";
import {
  firestoreSearchFriend,
  firestoreAddFriend,
  firestoreCheckFriend,
} from "../firebaseDb";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface AddFriendProps {}

const AddFriend: FC<AddFriendProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res: SearchType = await firestoreSearchFriend(email);

      // check for searching self
      if (res.userId === userId) {
        throw new Error("You cannot add yourself!");
      }

      // check for already added
      const check = await firestoreCheckFriend(userId!, res.userId);
      if (check) {
        throw new Error("This friend is already added!");
      }

      if (res.found) {
        toast.success("Friend Added");
      } else {
        toast.error("Friend not found");
      }

      if (userId) await firestoreAddFriend(userId, res.userId);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const GoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="grid grid-cols-12 text-xl">
        <form
          className="col-start-5 col-span-4 flex flex-col items-center"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border-2 border-gray-100 py-4 px-2 rounded-lg my-5"
          />
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <button
              className="rounded-full bg-indigo-500 text-white text-center px-4 py-2 w-full"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
        <button
          className="rounded-full bg-indigo-500 text-white text-center px-4 py-2 my-2 col-start-5 col-span-4"
          onClick={GoBack}
        >
          Go Back To Dashboard
        </button>
      </div>
    </>
  );
};

export default AddFriend;

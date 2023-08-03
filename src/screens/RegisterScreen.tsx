import { FC, useState, useContext, useEffect } from "react";
import { firebaseRegisterEmailAndPassword } from "../firebaseAuth";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { firestoreAddData } from "../firebaseDb";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

interface RegisterScreenProps {}

const RegisterScreen: FC<RegisterScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setFriendId, setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setFriendId(null);
    setUserId(null);
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await firebaseRegisterEmailAndPassword(email, password);
      console.log(response);
      navigate("/");
      toast.success("Signed Up Successfully", {
        duration: 2000,
      });
      const user: User = {
        email,
        name,
        userId: response.user.uid,
        friends: [],
      };
      await firestoreAddData(user);
      setUserId(user.userId);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message, {
          duration: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 text-xl">
        <h1 className="bold text-3xl my-4 col-span-full text-center">
          Realtime Chat Application
        </h1>
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
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border-2 border-gray-100 py-4 px-2 rounded-lg my-5"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <p className="col-span-full text-center mt-4">
          Already a user?
          <Link to={"/login"} className="hover:underline ml-2">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterScreen;

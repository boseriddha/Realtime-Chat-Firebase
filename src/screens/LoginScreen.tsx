import { FC, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Loader2 } from "lucide-react";
import { firebaseSignInEmailAndPassword } from "../firebaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await firebaseSignInEmailAndPassword(email, password);
      console.log(res);
      navigate("/");
      toast.success("Logged In Succesfully", {
        duration: 2000,
      });
      setUserId(res.user.uid);
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
        <form
          className="col-start-5 col-span-4 flex flex-col items-center"
          onSubmit={loginHandler}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginScreen;

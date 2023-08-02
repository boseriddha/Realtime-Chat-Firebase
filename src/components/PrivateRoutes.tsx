import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface PrivateRoutesProps {}

const PrivateRoutes: FC<PrivateRoutesProps> = ({}) => {
  const { userId } = useContext(UserContext);
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;

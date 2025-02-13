import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("user in public router protect", user);

  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

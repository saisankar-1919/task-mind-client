import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  return token && user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;

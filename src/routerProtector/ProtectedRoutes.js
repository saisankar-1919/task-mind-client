import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  return token && user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

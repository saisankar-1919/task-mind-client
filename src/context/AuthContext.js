import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setUser(user);
    }
  }, [token]);

  const loginContext = (newToken, user) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser(user);
  };

  const logoutContext = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

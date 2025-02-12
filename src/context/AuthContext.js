import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setUser({ loggedIn: true });
    }
  }, [token]);

  const loginContext = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser({ loggedIn: true });
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

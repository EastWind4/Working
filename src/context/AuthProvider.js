import { createContext, useState, useContext } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: "", token: null });
  const login = (user, token, expToken) => {
    setAuth({ user, token, expToken });
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    localStorage.setItem("expToken", expToken);
  };
  const logout = () => {
    setAuth({ user: "", token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expToken");
    localStorage.removeItem("isActivated");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("hours");
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

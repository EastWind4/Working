import { createContext, useState, useContext } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: "", token: null });
  const login = (name, token, expToken) => {
    setAuth({ user: name, token, expToken });
  };
  const logout = () => {
    setAuth({ user: "", token: null });
    localStorage.clear();
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

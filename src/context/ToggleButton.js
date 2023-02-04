import { createContext, useState, useContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
const ToggleContext = createContext(null);

export const ToggleProvider = ({ children }) => {
  const [on, setOn] = useState(useMediaQuery("(prefers-color-scheme: dark)"));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      setOn(e.matches);
    });
    return () => mediaQuery.removeEventListener("change", () => {});
  }, []);
  const toggle = () => {
    setOn(!on);
  };
  return (
    <ToggleContext.Provider value={{ on, setOn, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};

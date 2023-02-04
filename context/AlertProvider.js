import React, { useState, useContext, createContext } from "react";
const AlertContext = createContext();
export const useAlert = () => {
  return useContext(AlertContext);
};
export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const showAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 10000);
  };
  return (
    <AlertContext.Provider value={{ open, severity, message, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

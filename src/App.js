import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useToggle } from "./context/ToggleButton";
import Appbar from "./components/Appbar";
import TwoFactAuth from "./components/TwoFactAuth";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Event from "./components/Events";
import { useAlert } from "./context/AlertProvider";
import CustomAlert from "./components/CustomAlert";
import SheetReader from "./components/SheetReader";
import Admin from "./components/admin/admin";
import CertGenButton from "./components/CertificateGenerator";

const App = () => {
  const { on } = useToggle();
  const theme = createTheme({
    palette: {
      mode: on ? "dark" : "light",
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
    },
  });
  const { open, severity, message } = useAlert();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {open === true && <CustomAlert severity={severity} message={message} />}
      <Appbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="/signup/2fa" element={<TwoFactAuth />} />
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/events" element={<Event />} />
        <Route exact path="/sheet" element={<SheetReader />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/claim" element={<CertGenButton />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

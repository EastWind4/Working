import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useToggle } from "./context/ToggleButton";
import Register from "./components/Register";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import TwoFactAuth from "./components/TwoFactAuth";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Event from "./components/events"
import { useAlert } from "./context/AlertProvider";
import CustomAlert from "./components/CustomAlert";
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
        <Route path="/" element={<Landing />}></Route>
        <Route path="login" element={<Login />} />
        <Route exact path="signup" element={<Register />} />
        <Route exact path="/signup/2fa" element={<TwoFactAuth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route exact path="/events" element={<Event />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

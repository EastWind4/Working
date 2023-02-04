import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import logo from "../images/logo.svg";
import img from "../images/Signin.jpg";
// import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useRef, useState, useEffect } from "react";
import { useAlert } from "../context/AlertProvider";
import { VerifyLogin } from "../api/VerifyLogin";
import TextField from "@mui/material/TextField";
export default function Login() {
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email1, success, token, expToken, isActivated, name, type } =
      await VerifyLogin(email, pwd);
    if (success === true) {
      if (isActivated === false) {
        console.log("not activated");
        navigate("/signup/2fa", { state: { email } });
      } else {
        console.log("activated");
        login(email1, token, expToken);
        if (type === "ADMIN") navigate("/admin");
        else navigate("/profile");
      }
    } else {
      showAlert("error", "Invalid username or password");
    }
  };
  return (
    <Grid container component="main">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            my: 14,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={logo}
            alt="logo"
            sx={{
              width: "50%",
              height: "50%",
              marginTop: "-90px",
              sm: { width: "100%", height: "100%" },
              marginBottom: "-60px",
            }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  required
                  ref={emailRef}
                  fullWidth
                  id="name"
                  type="email"
                  label="Email"
                  autoFocus
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  autoComplete="current-password"
                  placeholder="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography variant="body">Forgot password?</Typography>
              </Grid>
              <Grid item md>
                {" "}
                <Typography onClick={() => navigate("/signup")} variant="body">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

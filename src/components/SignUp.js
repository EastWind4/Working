import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useState, useRef, useEffect } from "react";
import { PWD_REGEX, EMAIL_REGEX } from "./Regex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Register.css";
import { useAlert } from "../context/AlertProvider";
import Signup from "../api/Signup";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import InstSignup from "../api/InstSignup";

export default function SignUp() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const types = [
    {
      value: "VOLUNTEER",
      label: "Volunteer",
    },
    {
      value: "INSTITUTION",
      label: "Institution",
    },
  ];
  const userRef = useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [type, setType] = React.useState("VOLUNTEER");
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [img, setImg] = useState(null);
  const [upload, setUpload] = useState(false);
  const [validImg, setValidImg] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(img);
    console.log(
      validPwd &&
        validMatch &&
        validEmail &&
        type === "INSTITUTION" &&
        img === null
    );
    if (validPwd && validMatch && validEmail && img !== null) {
      const { email1, name1, bool } = await Signup(
        name,
        password,
        email,
        type,
        img
      );
      if (bool === true) {
        navigate("/signup/2fa", { state: { email1 } });
      } else {
        showAlert("error", "User already exists");
      }
    } else if (
      validPwd &&
      validMatch &&
      validEmail &&
      type === "INSTITUTION" &&
      img === null
    ) {
      const { email1, name1, bool } = await InstSignup(
        name,
        password,
        email,
        type
      );
      if (bool === true) {
        navigate("/signup/2fa", { state: { email1 } });
      } else {
        showAlert("error", "User already exists");
      }
    } else {
      showAlert("error", "Please fill all the details");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="name"
                  required
                  ref={userRef}
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className={name.length > 0 ? "valid" : "hide"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="type"
                  required
                  fullWidth
                  select
                  id="type"
                  label="Type"
                  autoFocus
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  helperText="Please select your type"
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  fullWidth
                  autoComplete="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />

                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
                <p
                  id="emailnote"
                  className={
                    email && !validEmail ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must be a valid email address.
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !password ? "hide" : "invalid"}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && confirmPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatch || !confirmPassword ? "hide" : "invalid"
                  }
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </Grid>
              {type === "VOLUNTEER" && (
                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="file">
                      <input
                        hidden
                        accept="image/*"
                        id="file"
                        type="file"
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                      <IconButton
                        color="inherit"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera color="inherit" />
                      </IconButton>
                    </label>
                    <Button
                      variant="contained"
                      component="label"
                      color="inherit"
                      fullWidth
                      onClick={() => setUpload(true)}
                    >
                      <span style={{ color: "black" }}>Upload</span>
                    </Button>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={img && upload === true ? "valid" : "hide"}
                    />
                  </Stack>{" "}
                </Grid>
              )}

              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignUp}
              disabled={
                !validEmail ||
                !validPwd ||
                !validMatch ||
                (type === "VOLUNTEER" && !img)
              }
            >
              Sign Up
            </Button>
          </form>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                onClick={() => {
                  navigate("/login");
                }}
                variant="body"
                margin={9}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

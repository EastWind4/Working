import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef, React } from "react";
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from "./Regex";
import Signup from "../api/Signup";
import { useAlert } from "../context/AlertProvider";
import LinkedInPage from '../components/LinkedInSingUp'
const Register = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  // State events
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, pwd, matchPwd]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    //if everything is valid then send data in api call
    if (validName && validPwd && validMatch && validEmail) {
      const { userId, email1, bool, error } = await Signup(
        userName,
        pwd,
        user,
        email
      );
      if (bool === true) {
        navigate("/signup/2fa", { state: { userId, email1 } });
      } else {
        setErrMsg(error);
        showAlert("error", "User already exists");
      }
    }
  };
  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSignUp}>
          <label htmlFor="user">
            Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={user.length > 0 ? "valid" : "hide"}
            />
          </label>
          <input
            type="text"
            id="user"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            placeholder="Enter your name"
          />
          <label htmlFor="username">
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !userName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            placeholder="Enter your username"
          />
          <p
            id="uidnote"
            className={
              userFocus && userName && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            placeholder="Enter your email"
          />
          <p
            id="emailnote"
            className={email && !validEmail ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must be a valid email address.
          </p>
          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>

          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            autoComplete="off"
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            placeholder="Enter your password"
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder="Confirm your password"
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already registered?
          <br />
          <span className="line">
            <Link to="/login">Log In</Link>
          </span>
        </p>
        <div>
          {LinkedInPage()}
        </div>
      </section>
    </>
  );
};

export default Register;
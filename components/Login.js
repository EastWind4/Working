import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import VerifyLogin from "../api/VerifyLogin";
import { useAlert } from "../context/AlertProvider";
const Login = () => {
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, success, token, expToken, isActivated } = await VerifyLogin(
      user,
      pwd
    );
    if (success === true) {
      if (isActivated === "false") {
        navigate("/signup/2fa", { state: { userId } });
      } else {
        login(user, token, expToken);
        navigate("/profile");
      }
    } else {
      setErrMsg("Invalid username or password");
      errRef.current.focus();
      showAlert("error", "Invalid username or password");
    }
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <Link to={"/signup"} className="line">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;

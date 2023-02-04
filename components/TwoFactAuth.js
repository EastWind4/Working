import { useLocation, useNavigate } from "react-router-dom";
import SendOtp from "../api/SendOtp";
import VerifyOtp from "../api/VerifyOtp";
import { Button } from "@mui/material";
import { useAlert } from "../context/AlertProvider";
import { useEffect, useState } from "react";
function TwoFactAuth() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const location = useLocation();
  const { userId, email1 } = location.state;
  // const userId = "";
  // const email1 = "";
  const token = localStorage.getItem("token");
  const handleOtp = async () => {
    const otp = await SendOtp(userId, token);
    setTime(60);
    if (otp) {
      showAlert("success", "OTP sent successfully!");
    } else {
      setTime(0);
      showAlert("error", "OTP not sent!");
    }
  };
  const verifyOtp = async () => {
    const verifyOtp = document.querySelector("input").value;
    const otp = await VerifyOtp(userId, verifyOtp, token);
    console.log(otp);
    if (otp === true) {
      console.log("otp verified");
      navigate("/profile");
    } else {
      // setTime(60);
      showAlert("error", "OTP not verified!");
    }
  };
  const style = {
    margin: "10px",
    border: "1px solid green",
  };
  const [time, setTime] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((time) => time - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <div>
      <h1>
        Two-Factor <br />
        Authentication
      </h1>
      <p>Enter the code sent to your {email1}</p>
      <input type="text" placeholder="Enter Code" />
      <br />
      <Button
        type="submit"
        color="inherit"
        variant="outlined"
        onClick={verifyOtp}
        sx={style}
      >
        Submit
      </Button>
      {time > 0 && (
        <p>
          Didn't receive the code? <br />
          Resend code in <span>{time} seconds</span>{" "}
        </p>
      )}
      {time === 0 && (
        <Button
          onClick={handleOtp}
          color="inherit"
          variant="outlined"
          sx={style}
        >
          Resend OTP
        </Button>
      )}
    </div>
  );
}
export default TwoFactAuth;

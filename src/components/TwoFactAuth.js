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
  // const { userId, email1 } = location.state;
  const userId = "user";
  const email1 = "";
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
    const verifyOtp = document.querySelectorAll("input");
    let otp = "";
    verifyOtp.forEach((otp1) => {
      otp += otp1.value;
    });
    const success = await VerifyOtp(userId, otp, token);
    if (success === true) {
      console.log("otp verified");
      navigate("/profile");
    } else {
      showAlert("error", "OTP not verified!");
    }
  };

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      if (e.target.value.length === 1) {
        if (e.target.nextElementSibling.disabled) {
          e.target.nextElementSibling.disabled = false;
        }
        e.target.nextElementSibling.focus();
      } else if (e.key === "Backspace") {
        if (e.target.previousElementSibling) {
          e.target.disabled = true;
          e.target.previousElementSibling.focus();
        }
      }
    });
  });

  const style = {
    width: "15%",
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
      <h1>Verify Otp</h1>
      <p>Enter the code sent to your {email1}</p>
      <input type="number" />
      <input type="number" disabled />
      <input type="number" disabled />
      <input type="number" disabled />
      <input type="number" disabled />
      <input type="number" disabled />
      <Button
        type="submit"
        color="inherit"
        variant="outlined"
        onClick={verifyOtp}
        sx={style}
      >
        Submit
      </Button>

      {/* <input
        type="number"
        id="Third"
        maxLength="1"
        onKeyUp={clickEvent(this, "Fourth")}
      />
      <input
        type="number"
        id="Fourth"
        maxLength="1"
        onKeyUp={clickEvent(this, "Fifth")}
      />
      <input
        type="number"
        id="Fifth"
        maxLength="1"
        onKeyUp={clickEvent(this, "Sixth")}
      />
      <input type="number" id="Sixth" maxLength="1" /> */}

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

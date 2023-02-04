import { useNavigate } from "react-router-dom";
import SendOtp from "../api/SendOtp";
import VerifyOtp from "../api/VerifyOtp";
import { Button, Typography } from "@mui/material";
import { useAlert } from "../context/AlertProvider";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

function TwoFactAuth() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const email1 = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const handleOtp = async () => {
    const email = localStorage.getItem("email");
    const otp = await SendOtp(email, token);
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
    const email = localStorage.getItem("email");
    const success = await VerifyOtp(email, otp, token);
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
          if (e.target.previousElementSibling.value.length === 1) {
            e.target.previousElementSibling.focus();
            e.target.disabled = true;
          } else if (e.target.previousElementSibling === null) {
            console.log("error");
          } else {
            e.target.previousElementSibling.previousElementSibling.focus();
          }
        }
      }
    });
  });

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
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ marginTop: "50px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginTop: "20PX",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Verify Otp
          </Typography>
          <br />
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          >
            Enter the code sent to your {email1}
          </p>
          <input
            type="text"
            maxLength="1"
            style={{ width: "40px", marginX: "50px", marginLeft: "90px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "40px", marginX: "50px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "40px", marginX: "50px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "40px", marginX: "50px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "40px", marginX: "50px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "40px", marginX: "50px" }}
          />
          <br />
          <br />
          <Button
            type="submit"
            color="inherit"
            variant="contained"
            onClick={verifyOtp}
            sx={{ marginLeft: "40%", marginBottom: "30px", color: "black" }}
          >
            Submit
          </Button>

          {time > 0 && (
            <Typography sx={{ marginLeft: "100px" }}>
              Didn't receive the code? <br />
              Resend code in <span>{time} seconds</span>{" "}
            </Typography>
          )}
          {time === 0 && (
            <Button
              onClick={handleOtp}
              color="inherit"
              variant="contained"
              sx={{ marginLeft: "37%", marginBottom: "30px", color: "black" }}
            >
              Resend OTP
            </Button>
          )}
        </Card>
      </Grid>
    </div>
  );
}
export default TwoFactAuth;

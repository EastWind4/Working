import { useNavigate } from "react-router-dom";
import SendOtp from "../api/SendOtp";
import VerifyOtp from "../api/VerifyOtp";
import { Button, Typography } from "@mui/material";
import { useAlert } from "../context/AlertProvider";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
function TwoFactAuth() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  // const email1 = localStorage.getItem("email");
  const email1 = "zatakiavashisth@gmail.com";
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const handleOtp = async () => {
    setLoading(true);
    const email = localStorage.getItem("email");
    const otp = await SendOtp(email, token);
    setLoading(false);
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
    setLoading(true);
    verifyOtp.forEach((otp1) => {
      otp += otp1.value;
    });
    const email = localStorage.getItem("email");
    const success = await VerifyOtp(email, otp, token);
    setLoading(false);
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
        sx={{ marginTop: "50px" }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, type: "tween" }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
        spacing={1}
      >
        <Card
          sx={{ marginTop: "50px" }}
          component={motion.div}
          whileHover={{ scale: 1.2 }}
          padding="30px"
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Verify Otp
            <br />
          </Typography>
          {loading && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
                {loading && <CircularProgress />}
              <br />
            </Typography>
          )}

          <br />
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Enter the code sent to your {email1}
          </Typography>
          <input
            type="text"
            maxLength="1"
            style={{ width: "60px", marginLeft: "40px", marginRight: "25px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "60px", marginRight: "25px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "60px", marginRight: "25px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "60px", marginRight: "25px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "60px", marginRight: "25px" }}
          />
          <input
            type="text"
            disabled
            maxLength="1"
            style={{ width: "60px", marginRight: "25px" }}
          />
          <br />
          <br />
          <Button
            type="submit"
            color="inherit"
            variant="contained"
            onClick={verifyOtp}
            sx={{
              width: "25%",
              marginLeft: "20%",
              marginBottom: "38px",
              color: "black",
              marginTop: "20px",
              marginRight: "10%",
            }}
          >
            Submit
          </Button>

          {time > 0 && (
            <Typography sx={{ marginLeft: "70px", marginBottom: "20px" }}>
              Didn't receive the code? <br />
              Resend code in <span>{time} seconds</span>{" "}
            </Typography>
          )}
          {time === 0 && (
            <Button
              onClick={handleOtp}
              color="inherit"
              variant="contained"
              sx={{
                width: "25%",
                color: "black",
                textAlign: "center",
                marginBottom: "20px",
              }}
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

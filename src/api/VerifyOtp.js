import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const VerifyOtp = async (email, otp) => {
  try {
    const data = {
      email: email,
      otp: otp,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(apiurl + "/signup/verify/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.setItem("isActivated", true);
      return true;
    } else {
      return { message: response.data.message, success: false };
    }
  } catch (err) {
    return { message: err.response.data.message, success: false };
  }
};
export default VerifyOtp;

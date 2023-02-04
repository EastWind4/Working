import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const VerifyOtp = async (userId, otp) => {
  try {
    const data = {
      userId: userId,
      otp: otp,
    };
    const token = localStorage.getItem("token");
    console.log(userId, otp);
    const response = await axios.post(apiurl + "/signup/verify/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.setItem("isActivated", true);
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
export default VerifyOtp;

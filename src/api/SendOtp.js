import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const SendOtp = async (email, token) => {
  try {
    const response = await axios.post(
      apiurl + "/signup/resend/",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        message: response.data.message,
        success: true,
      };
    } else {
      return { message: response.data.message, success: false };
    }
  } catch (err) {
    return { message: err.response.data.message, success: false };
  }
};

export default SendOtp;

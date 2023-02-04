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
      console.log(response.data.message);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default SendOtp;

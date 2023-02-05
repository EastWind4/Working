import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const VerifyLogin = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(apiurl + "/login/", data);
    if (response.data) {
      const name = response.data.name;
      localStorage.setItem("name", name);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const expToken = response.data.expireDate;
      localStorage.setItem("expToken", expToken);
      const isActivated = response.data.isActivated;
      localStorage.setItem("isActivated", isActivated);
      localStorage.setItem("email", email);
      localStorage.setItem("type", response.data.type);
      localStorage.setItem("profilePic", response.data.profilePic);
      const hours = response.data.hours;
      localStorage.setItem("hours", hours);
      return {
        email: response.data.email,
        success: true,
        token: response.data.token,
        expToken: response.data.expireDate,
        isActivated: response.data.isActivated,
        name: response.data.name,
        type: response.data.type,
      };
    } else {
      return { message: response.data.message, success: false };
    }
  } catch (err) {
    return { message: err.response.data.message, success: false };
  }
};

export default VerifyLogin;

import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const VerifyLogin = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(apiurl + "/login/", data);
    console.log(response.data);

    if (response.data) {
      const user = response.data.name;
      localStorage.setItem("user", user);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const expToken = response.data.expireDate;
      localStorage.setItem("expToken", expToken);
      const isActivated = response.data.isActivated;
      localStorage.setItem("isActivated", isActivated);
      localStorage.setItem("email", email);
      localStorage.setItem("type", response.data.type);
      localStorage.setItem("url", response.data.profilePic);
      return {
        email: response.data.email,
        success: true,
        token: response.data.token,
        expToken: response.data.expireDate,
        isActivated: response.data.isActivated,
        naam: response.data.name,
        type: response.data.type,
      };
    } else {
      console.log(response);
      return false;
    }
  } catch (err) {
    console.log(err.response.data.message);
    return false;
  }
};

export default VerifyLogin;

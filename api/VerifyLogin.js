import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const VerifyLogin = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  try {
    const response = await axios.post(apiurl + "/login/", data);
    if (response.data) {
      const user = response.data.name;
      localStorage.setItem("user", user);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const expToken = response.data.expireDate;
      localStorage.setItem("expToken", expToken);
      const isActivated = response.data.isActivated;
      localStorage.setItem("isActivated", isActivated);
      return {
        userId: response.data.id,
        success: true,
        token: response.data.token,
        expToken: response.data.expireDate,
        isActivated: response.data.isActivated,
      };
    } else {
      console.log(response);
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default VerifyLogin;

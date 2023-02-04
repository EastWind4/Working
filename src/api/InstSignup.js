import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const InstSignup = async (name, password, email, type) => {
  const data = {
    name: name,
    password: password,
    email: email,
    type: type,
  };

  try {
    const response = await axios.post(apiurl + "/signup/", data);
    if (response.data) {
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const expToken = response.data.expireDate;
      console.log(expToken);
      localStorage.setItem("expToken", expToken);
      const isActivated = response.data.isActivated;
      localStorage.setItem("isActivated", isActivated);
      localStorage.setItem("user", response.data.username);
      console.log(response.data);
      return {
        userId: response.data.id,
        email1: email.replace(/(?<=.{2}).(?=.*@)/g, "*"),
        bool: true,
      };
    } else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
    return { error: "UserID already exists!" };
  }
};

export default InstSignup;

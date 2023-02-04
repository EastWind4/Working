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
      const token = response.data.token;
      localStorage.setItem("token", token);
      const expToken = response.data.expireDate;
      localStorage.setItem("expToken", expToken);
      const isActivated = response.data.isActivated;
      localStorage.setItem("isActivated", isActivated);
      const hours = response.data.hours;
      localStorage.setItem("hours", hours);
      const type = response.data.type;
      localStorage.setItem("type", type);
      const name = response.data.name;
      localStorage.setItem("name", name);
      const email = response.data.email;
      localStorage.setItem("email", email);

      return {
        name1: response.data.name,
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

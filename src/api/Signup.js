import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const Signup = async (name, password, email, type, img) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("type", type);
  formData.append("img", img);
  try {
    const response = await axios.post(apiurl + "/signup/vol/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
      const profilePic = response.data.profilePic;
      localStorage.setItem("profilePic", profilePic);
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

export default Signup;

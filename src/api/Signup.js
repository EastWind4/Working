import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
export const Signup = async (name, password, email, type, img) => {
  // const data = {
  //   password: password,
  //   name: name,
  //   email: email,
  //   type: type,
  //   img: img,
  // };
  const formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("type", type);
  formData.append("img", img);
  console.log(password, name, email, type, img);
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

export default Signup;

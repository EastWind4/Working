import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
function Profile() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const remainingTime =
    new Date(localStorage.getItem("expToken")).getTime() - new Date().getTime();
  // const data = {
  //   id: "63dd31f19d24926feb061bee",
  //   username: "yb261",
  //   email: "yashbrahmbhatt261@gmail.com",
  //   name: "vash",
  //   isActivated: false,
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQzMWYxOWQyNDkyNmZlYjA2MWJlZSIsIm5hbWUiOiJ2YXNoIiwidXNlcm5hbWUiOiJ5YjI2MSIsImVtYWlsIjoieWFzaGJyYWhtYmhhdHQyNjFAZ21haWwuY29tIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NzU0NDA2MjV9.RpXShU5DlHTX46S9m1yDEmBO6wlScqE-MXP6IB8RoNk",
  //   expireDate: "2023-02-04T16:10:25.571Z",
  // };
  // localStorage.setItem("user", data.username);
  // localStorage.setItem("token", data.token);
  // localStorage.setItem("expToken", data.expireDate);
  // localStorage.setItem("isActivated", data.isActivated);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const exptoken = localStorage.getItem("expToken");
    localStorage.setItem("isActivated", "true");
    const isActivated = localStorage.getItem("isActivated");
    if (
      user &&
      token &&
      new Date(exptoken) > new Date() &&
      isActivated === "true"
    ) {
      login(user, token, exptoken);
    } else {
      logout();
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate("/login");
    }, remainingTime);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  return <div>Welcome {localStorage.getItem("user")}</div>;
}

export default Profile;

import React, { useState, useRef } from "react";
import "./Login.css";
import { Notification } from "../../components/notification/Notification";
import { ToastContainer } from "react-toastify";
import GenericButton from "../../components/genericButton/GenericButton";
import GenericInput from "../../components/genericInput/GenericInput";
import Email_Icon from "../../assets/icons/email.svg";
import Password_Icon from "../../assets/icons/icons8-password.svg";
import showPassword from "../../assets/icons/showPassword.svg";
import hidePassword from "../../assets/icons/hidePassword.svg";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [typePassword, setTypePassword] = useState(true);
  const username = useRef();
  const password = useRef();
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const changeIcon = () => {
    setTypePassword(!typePassword);
  };

  const buttonHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.10.135:8080/user/login",
        {
          email: username.current.value,
          password: password.current.value,
        }
      );
      console.log(response.data);
      Notification("success", response?.data, 6000);
      // Decode the JWT token
      sessionStorage.setItem("UserId", response.data?.id);
      const accessToken = response.data?.accessToken;
      sessionStorage.setItem("Token", accessToken);
      sessionStorage.setItem("Username", response.data?.username);
      sessionStorage.setItem("Email", response.data?.email);

      // Set the flag to redirect to /dashboard
      setRedirectToDashboard(true);
    } catch (error) {
      console.log(error.response.data);
      Notification("error", error.response?.data, 6000);
    }
  };

  const auth = sessionStorage.getItem("Token");

  if (redirectToDashboard || auth) {
    return <Navigate to="/company" />;
  }

  return (
    <div className="login-container">
      <form className="login-modal-holder" onSubmit={buttonHandler}>
        <h1> LogIn </h1>
        <div className="login-input">
          <GenericInput
            icon={Email_Icon}
            input_label="Email"
            placeholder="yourname@email.com"
            label="Firstname"
            asterik="*"
            inputRef={username}
          />
        </div>
        <div className="login-input">
          <GenericInput
            icon={Password_Icon}
            passwordIcon={typePassword ? hidePassword : showPassword}
            input_label="Password "
            placeholder="********"
            label="Password"
            passwordInput={true}
            type={typePassword ? "password" : "text"}
            isPassword={true}
            inputRef={password}
            onClickIcon={changeIcon}
            asterik="*"
          />
        </div>
        <GenericButton name="Submit" />
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;

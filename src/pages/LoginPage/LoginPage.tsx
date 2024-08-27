import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserService from "../../services/UserService";

function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm userService={new UserService} />
    </div>
  );
}

export default LoginPage;
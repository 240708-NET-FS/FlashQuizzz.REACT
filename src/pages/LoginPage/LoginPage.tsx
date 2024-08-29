import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import UserService from "../../services/UserService";

function LoginPage() {
  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <LoginForm userService={new UserService} />
    </div>
  );
}

export default LoginPage;
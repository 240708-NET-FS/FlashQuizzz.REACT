import React from "react";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import UserService from "../../services/UserService";

function RegisterPage() {
  return (
    // <div>
    //   <h1>Register Page</h1>
    //   <RegisterForm userService={new UserService()} />
    // </div>
    <div className="container mt-4">
      <h2>Signup</h2>
      <RegisterForm userService={new UserService()} />
    </div>
  );
}

export default RegisterPage;
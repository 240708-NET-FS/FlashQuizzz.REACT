import React, { useReducer, useState } from "react";

import LoginFormState from "../../../interfaces/ILoginFormState";
import UserService from "../../../services/UserService";
import { Navigate } from "react-router-dom";

type ActionType =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string };

function formReducer(
  state: LoginFormState,
  action: ActionType
): LoginFormState {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function LoginForm({ userService }: { userService: UserService }) {
  const [state, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
  });

  const [redirectToDashboard, setRedirectToDashboard] =
    useState<boolean>(false);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setEmail", payload: event?.target.value });
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setPassword", payload: event?.target.value });
  }

  async function submit() {
    try {
      console.log("In Submit function");
      const loginResponse = await userService.login(state);
      if (loginResponse.status == 200) {
        console.log("Logged In");
        // Store the object in local storage
        localStorage.setItem("userObject", JSON.stringify(loginResponse.data));
        const getUserInfoResponse = await userService.getUserInfo(loginResponse.data.accessToken);
        if (getUserInfoResponse.status == 200) {
          console.log("User Info Retrieved");
          localStorage.setItem("userID", getUserInfoResponse.data.userID);
        }
        // Redirect to home page
        // navigate('/my-cards');
        setRedirectToDashboard(true);
      } else {
        console.log("Login Failed");
        alert("Email or Password is incorrect.");
      }
    } catch (error) {
      console.error("Error submitting user data", error);
      alert("Email or Password is incorrect.");
    }
  }

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form className="mb-6">
      <h4>&nbsp;</h4>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          value={state.email}
          onChange={handleEmailChange}
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={state.password}
          onChange={handlePasswordChange}
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button
        type="button"
        onClick={submit}
        className="btn btn-primary btn-block w-100"
      >
        Login
      </button>
      {/* <div>
        {state.email}
        {state.password}
      </div> */}
    </form>
  );
}

export default LoginForm;

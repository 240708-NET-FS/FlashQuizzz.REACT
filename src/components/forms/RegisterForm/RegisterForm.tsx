import React, { useEffect, useReducer, useState } from "react";
import RegisterFormState from "../../../interfaces/IRegisterFormState";
import UserService from "../../../services/UserService";
import { Navigate } from "react-router-dom";

type ActionType =
  | { type: "setFirstName"; payload: string }
  | { type: "setLastName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "reset" };

function formReducer(
  state: RegisterFormState,
  action: ActionType
): RegisterFormState {
  switch (action.type) {
    case "setFirstName":
      return { ...state, FirstName: action.payload };
    case "setLastName":
      return { ...state, LastName: action.payload };
    case "setEmail":
      return { ...state, Email: action.payload };
    case "setPassword":
      return { ...state, Password: action.payload };
    case "reset":
      return { FirstName: "", LastName: "", Email: "", Password: "" };
    default:
      throw new Error("Unknown action type");
  }
}

function RegisterForm({ userService }: { userService: UserService }) {
  const [state, dispatch] = useReducer(formReducer, {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email format and only update state if necessary
  const emailIsValid = emailRegex.test(state.Email);
  if (isEmailValid !== emailIsValid) {
    setIsEmailValid(emailIsValid);
  }

  useEffect(() => {
    // Check if all fields are filled and meet criteria
    const isFormValid =
      state.FirstName !== "" &&
      state.LastName !== "" &&
      state.Email !== "" &&
      emailIsValid &&
      state.Password !== "" &&
      state.Password.length >= 3;

    if (isButtonDisabled === isFormValid) {
      setIsButtonDisabled(!isFormValid);
    }
  }, [state.FirstName, state.LastName, state.Email, state.Password]);

  function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setFirstName", payload: event?.target.value });
  }
  function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setLastName", payload: event?.target.value });
  }
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setEmail", payload: event?.target.value });
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setPassword", payload: event?.target.value });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  async function handleFormSubmit() {
    console.log("calling handleFormSubmit");
    try {
      const response = await userService.register(state);
      if (response.status == 200) {
        console.log("registered");
        alert(response.data);
        handleReset();

        // Redirect to login page
        setRedirectToLogin(true);
      } else {
        console.log("Registration Failed");
        alert("Registration Failed. Please try again.");
        handleReset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <form className="mb-6">
      <h4>&nbsp;</h4>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          value={state.FirstName}
          onChange={handleFirstNameChange}
          className="form-control"
          placeholder="Enter first name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          value={state.LastName}
          onChange={handleLastNameChange}
          className="form-control"
          placeholder="Enter last name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          value={state.Email}
          onChange={handleEmailChange}
          className={!isEmailValid ? "form-control is-invalid" : "form-control"}
          placeholder="Enter email"
        />
        {!isEmailValid && (
          <div className="text-danger">Please enter a valid email address.</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={state.Password}
          onChange={handlePasswordChange}
          className="form-control"
          placeholder="Enter Password (min. length 3)"
        />
      </div>
      <div className="mb-6">
        <button
          type="button"
          onClick={handleFormSubmit}
          disabled={isButtonDisabled}
          className="btn btn-primary btn-lg btn-block w-100 mb-3"
        >
          Signup
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline-secondary btn-lg btn-block w-100"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;

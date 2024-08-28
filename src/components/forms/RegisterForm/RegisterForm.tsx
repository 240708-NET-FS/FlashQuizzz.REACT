import React, { useReducer } from "react";
import RegisterFormState from "../../../interfaces/IRegisterFormState";
import UserService from "../../../services/UserService";

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
    try {
      const response = await userService.register(state);
      if (response.status) {
        console.log("registered");
        await userService.register({
          FirstName: state.FirstName,
          LastName: state.LastName,
          Email: state.Email,
          Password: state.Password
        });
      }
    } catch (error) {
      console.error("Error submitting user data", error);
    }
  }

  return (
    <form className="mb-6">
      <h4>&nbsp;</h4>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input type="text" value={state.FirstName} onChange={handleFirstNameChange} className="form-control" placeholder="Enter first name" />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input type="text" value={state.LastName} onChange={handleLastNameChange} className="form-control" placeholder="Enter last name" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" value={state.Email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" value={state.Password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
      </div>
      <div className="mb-6">
        <button type="button" onClick={handleFormSubmit} className="btn btn-primary btn-lg btn-block w-100 mb-3">Signup</button>
        <button type="button" onClick={handleReset} className="btn btn-outline-secondary btn-lg btn-block w-100">Reset</button>
      </div>
    </form>

    // <div>
    //   <h3>Register</h3>
    //   <div>
    //     <label>
    //       First Name:
    //       <input
    //         type="text"
    //         value={state.FirstName}
    //         onChange={handleFirstNameChange}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>Last Name:</label>
    //     <input
    //       type="text"
    //       value={state.LastName}
    //       onChange={handleLastNameChange}
    //     />
    //   </div>
    //   <div>
    //     <label>
    //       Email:
    //       <input type="text" value={state.Email} onChange={handleEmailChange} />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Password:
    //       <input
    //         type="password"
    //         value={state.Password}
    //         onChange={handlePasswordChange}
    //       />
    //     </label>
    //   </div>
    //   <button type="submit" onClick={handleFormSubmit}>
    //     Submit
    //   </button>
    //   <button onClick={handleReset}>Reset Fields</button>
    // </div>
  );
}

export default RegisterForm;

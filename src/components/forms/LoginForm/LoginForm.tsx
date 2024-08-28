import React, { useReducer } from "react";
import { url } from "../../../url.json";
import LoginFormState from "../../../interfaces/ILoginFormState";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";

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

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setEmail", payload: event?.target.value });
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setPassword", payload: event?.target.value });
  }

  async function submit() {
    try {
      const navigate = useNavigate();
      console.log("In Submit function");
      const response = await userService.login(state);
      console.log(response);
      if (response.status == 200) {
        console.log(response.data);
        console.log("Logged In");
        // Store the object in local storage
        localStorage.setItem('userObject', response.data);
            
        // Redirect to home page
        // navigate('/my-cards');
      }
    } catch (error) {
      console.error("Error submitting user data", error);
    }
  }
  return (
    <form className="mb-6">
      <h4>&nbsp;</h4>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" value={state.email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" value={state.password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
      </div>
      <button type="submit" onClick={submit} className="btn btn-primary btn-block w-100">Login</button>
      {/* <div>
        {state.email}
        {state.password}
      </div> */}
    </form>

    // <div>
    //   <h3>Log In</h3>
    //   <div>
    //     <label>
    //       Email:
    //       <input type="text" value={state.email} onChange={handleEmailChange} />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Password:
    //       <input
    //         type="text"
    //         value={state.password}
    //         onChange={handlePasswordChange}
    //       />
    //     </label>
    //   </div>
    //   <button onClick={submit}>Submit</button>
    //   <div>
    //     {state.email}
    //     {state.password}
    //   </div>
    // </div>
  );
}

export default LoginForm;

import React, { useReducer } from "react";
import { url } from "../../../url.json";
import LoginFormState from "../../../interfaces/ILoginFormState";
import UserService from "../../../services/UserService";

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
      const response = await userService.login(state);
      if (response.status == 200) {
        console.log("Logged In");
      }
    } catch (error) {
      console.error("Error submitting user data", error);
    }
  }
  return (
    <div>
      <h3>Log In</h3>
      <div>
        <label>
          Email:
          <input type="text" value={state.email} onChange={handleEmailChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="text"
            value={state.password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <button onClick={submit}>Submit</button>
      <div>
        {state.email}
        {state.password}
      </div>
    </div>
  );
}

export default LoginForm;

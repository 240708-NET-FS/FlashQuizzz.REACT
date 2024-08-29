import axios, { AxiosResponse } from "axios";
import RegisterFormState from "../interfaces/IRegisterFormState";
import LoginFormState from "../interfaces/ILoginFormState";
import { url, registerEndpoint, loginEndpoint } from "../url.json";

class UserService {
  register(userInfo: RegisterFormState): Promise<AxiosResponse> {
    if (userInfo.FirstName.length == 0) {
      throw new Error("First name cannot be empty.");
    }
    if (userInfo.LastName.length == 0) {
      throw new Error("Last name cannot be empty.");
    }
    if (userInfo.Email.length == 0) {
      throw new Error("Email cannot be empty.");
    }
    if (userInfo.Password.length == 0) {
      throw new Error("Password cannot be empty.");
    }
    return axios.post(url + registerEndpoint, {
      FirstName: userInfo.FirstName,
      LastName: userInfo.LastName,
      Email: userInfo.Email,
      Password: userInfo.Password,
    });
  }
  login(userInfo: LoginFormState): Promise<AxiosResponse> {
    if (userInfo.email.length == 0) {
      throw new Error("Email cannot be empty.");
    }
    if (userInfo.password.length == 0) {
      throw new Error("Password cannot be empty.");
    }
    return axios.post(url + loginEndpoint, {
      email: userInfo.email,
      password: userInfo.password,
    });
  }

  getUserInfo(accessToken: string): Promise<AxiosResponse> {
    return axios.post(
      url + "/api/user/userinfo",
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }
}

export default UserService;

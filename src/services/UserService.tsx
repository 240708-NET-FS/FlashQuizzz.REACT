import axios, { AxiosResponse } from "axios";
import RegisterFormState from "../interfaces/IRegisterFormState";
import { url } from "../url.json";

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
    return axios.post(url + "user/register", {
      FirstName: userInfo.FirstName,
      LastName: userInfo.LastName,
      Email: userInfo.LastName,
      Password: userInfo.Password,
    });
  }
  static login(userInfo: FormState): Promise<AxiosResponse> {
    return axios.post(url, {
      email: userInfo.email,
      password: userInfo.password
    });
  }
}

export default UserService;

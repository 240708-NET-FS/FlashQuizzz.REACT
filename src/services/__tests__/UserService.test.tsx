import UserService from "../UserService";
import RegisterFormState from "../../interfaces/IRegisterFormState";
import LoginFormState from "../../interfaces/ILoginFormState";
import axios from "axios";
import { url, registerEndpoint, loginEndpoint } from "../../url.json";
import { test, expect } from "@jest/globals";
jest.mock("axios");

interface IMockNewUser extends RegisterFormState {
  [index: string]: string;
}

interface IMockExistingUser extends LoginFormState {
  [index: string]: string;
}
// instantiate user service once here to be used in all tests
const userService = new UserService();

// create mock user templates
const mockNewUser: IMockNewUser = {
  FirstName: "Paul",
  LastName: "Glenn",
  Email: "paul@revature.net",
  Password: "password",
};

const mockExistingUser: IMockExistingUser = {
  email: "paul@revature.net",
  password: "password",
};

describe("User Service", () => {
  describe("registration validation", () => {
    test("missing first name throws error", () => {
      // arrange: create user object

      const missingFirstNameUserInfo: IMockNewUser = {
        ...mockNewUser,
        FirstName: "",
      };

      // act
      const registerAttempt = () => {
        userService.register(missingFirstNameUserInfo);
      };
      //act & assert
      expect(registerAttempt).toThrow("First name cannot be empty.");
    });
    test("missing last name throws appropriate error", () => {
      // arrange: create user object

      const missingLastNameInfo: IMockNewUser = {
        ...mockNewUser,
        LastName: "",
      };

      // act
      const registerAttempt = () => {
        userService.register(missingLastNameInfo);
      };
      //act & assert
      expect(registerAttempt).toThrow("Last name cannot be empty.");
    });

    test("missing email throws appropriate error", () => {
      // arrange: create user object

      const missingEmailUserInfo: IMockNewUser = {
        ...mockNewUser,
        Email: "",
      };

      // act
      const registerAttempt = () => {
        userService.register(missingEmailUserInfo);
      };
      //act & assert
      expect(registerAttempt).toThrow("Email cannot be empty.");
    });
    test("missing password throws appropriate error", () => {
      // arrange: create user object

      const mockUserInfo: IMockNewUser = {
        ...mockNewUser,
        Password: "",
      };

      // act
      const registerAttempt = () => {
        userService.register(mockUserInfo);
      };
      //act & assert
      expect(registerAttempt).toThrow("Password cannot be empty.");
    });
  });

  describe("registration route", () => {
    test("a complete user object causes a post request ot be made ", async () => {
      // arrange: create user object

      const finalUrl = url + registerEndpoint;
      // arrange: creat mock axios implementation

      const mockAxiosCall = (url: string, data: unknown): Promise<object> =>
        Promise.resolve({ data: data, config: { url: url } });
      const mAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
      mAxiosPost.mockImplementation(mockAxiosCall);

      // act : call register function
      const registerResponse = await userService.register(mockNewUser);

      // assert: mock should have been invoked with correct url
      expect(mAxiosPost).toHaveBeenCalled();
      expect(registerResponse.config.url).toEqual(finalUrl);

      const returnedObject = registerResponse.data;
      for (const prop in returnedObject) {
        expect(returnedObject[prop]).toEqual(mockNewUser[prop]);
      }
    });
  });

  describe("login validation", () => {
    test("missing email throws appropriate error", () => {
      // arrange: create user object

      const mockUserInfo: IMockExistingUser = {
        ...mockExistingUser,
        email: "",
      };

      // act
      const loginAttempt = () => {
        userService.login(mockUserInfo);
      };
      //act & assert
      expect(loginAttempt).toThrow("Email cannot be empty.");
    });

    test("missing password throws appropriate error", () => {
      // arrange: create user object

      const mockUserInfo: IMockExistingUser = {
        ...mockExistingUser,
        password: "",
      };

      // act
      const loginAttempt = () => {
        userService.login(mockUserInfo);
      };
      //act & assert
      expect(loginAttempt).toThrow("Password cannot be empty.");
    });
  });

  describe("login route", () => {
    test("email and password cause a post request to be made", async () => {
      // arrange mocks

      const finalUrl = url + loginEndpoint;

      const mAxiosCall = (url: string, data: unknown): Promise<object> =>
        Promise.resolve({
          data: { ...(data as object), auth: true },
          config: { url: url },
        });

      const mAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
      mAxiosPost.mockImplementation(mAxiosCall);

      // act: call login
      const loginResponse = await userService.login(mockExistingUser);

      // assert that a call was made to the auth route
      expect(mAxiosPost).toBeCalled();
      expect(loginResponse.config.url).toEqual(finalUrl);
    });
  });
});

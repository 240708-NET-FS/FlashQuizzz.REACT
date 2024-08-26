import UserService from "../UserService";
import RegisterFormState from "../../interfaces/IRegisterFormState";
import LoginFormState from "../../interfaces/ILoginFormState";
import axios, { AxiosResponse } from "axios";
import { url } from "../../url.json";
import { test, expect } from "@jest/globals";
jest.mock("axios");

interface mockNewUser extends RegisterFormState {
  [index: string]: string;
}

interface mockExistingUser extends LoginFormState {
  [index: string]: string;
}

describe("User Service", () => {
  describe("registration validation", () => {
    test("missing first name throws error", () => {
      // arrange: create user object
      const userService = new UserService();
      const mockUserInfo: RegisterFormState = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
      };

      // act
      const event = () => {
        userService.register(mockUserInfo);
      };
      //act & assert
      expect(event).toThrow("First name cannot be empty.");
    });
    test("missing last name throws appropriate error", () => {
      // arrange: create user object
      const userService = new UserService();
      const mockUserInfo: RegisterFormState = {
        FirstName: "Paul",
        LastName: "",
        Email: "",
        Password: "",
      };

      // act
      const event = () => {
        userService.register(mockUserInfo);
      };
      //act & assert
      expect(event).toThrow("Last name cannot be empty.");
    });
    test("missing email throws appropriate error", () => {
      // arrange: create user object
      const userService = new UserService();
      const mockUserInfo: RegisterFormState = {
        FirstName: "Paul",
        LastName: "Glenn",
        Email: "",
        Password: "",
      };

      // act
      const event = () => {
        userService.register(mockUserInfo);
      };
      //act & assert
      expect(event).toThrow("Email cannot be empty.");
    });
    test("missing password throws appropriate error", () => {
      // arrange: create user object
      const userService = new UserService();
      const mockUserInfo: RegisterFormState = {
        FirstName: "Paul",
        LastName: "Glenn",
        Email: "paul@revature.net",
        Password: "",
      };

      // act
      const event = () => {
        userService.register(mockUserInfo);
      };
      //act & assert
      expect(event).toThrow("Password cannot be empty.");
    });
  });

  describe("registration route", () => {
    test("a complete user object causes a post request ot be made ", async () => {
      // arrange: create user object
      const mockUserInfo: mockNewUser = {
        FirstName: "John",
        LastName: "Smith",
        Email: "johnsmith@revature.net",
        Password: "Password",
      };
      const finalUrl = url + "user/register";
      // arrange: creat mock axios implementation
      const userService = new UserService();
      const axiosCallMock = (url: string, data: unknown): Promise<object> =>
        Promise.resolve({ data: data, config: { url: url } });
      const axiosMock = axios.post as jest.MockedFunction<typeof axios.post>;
      axiosMock.mockImplementation(axiosCallMock);

      // act : call register function
      const response = userService.register(mockUserInfo);

      // assert: mock should have been invoked with correct url
      expect(axiosMock).toHaveBeenCalled();
      expect((await response).config.url).toEqual(finalUrl);
      const returnedObject = (await response).data;
      for (const prop in returnedObject) {
        expect(returnedObject[prop]).toEqual(mockUserInfo[prop]);
      }
    });
  });

  xdescribe("login validation", () => {});

  describe("login route", () => {
    test("email and password cause a post request to be made", async () => {
      // arrange mocks
      const userService = new UserService();
      const mockUserInfo: mockExistingUser = {
        email: "fakeuser@revature.net",
        password: "password",
      };

      const finalUrl = url;

      const axiosCallMock = (url: string, data: unknown): Promise<object> =>
        Promise.resolve({
          data: { ...(data as object), auth: true },
          config: { url: url },
        });

      const axiosMockFn = axios.post as jest.MockedFunction<typeof axios.post>;
      axiosMockFn.mockImplementation(axiosCallMock);

      // act: call login
      const response = await userService.login(mockUserInfo);

      // assert that a call was made to the auth route
      expect(axiosMockFn).toBeCalled();
      expect(response.config.url).toEqual(finalUrl);
    });
  });
});

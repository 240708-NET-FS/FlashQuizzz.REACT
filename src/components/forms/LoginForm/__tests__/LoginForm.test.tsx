import "@testing-library/jest-dom";
import * as React from "react";
import Mockrouter from "../../../../mocks/MockRouter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import UserService from "../../../../services/UserService";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { AxiosResponse } from "axios";
jest.mock("axios");

describe("Login Form", () => {
  it("renders properly", () => {
    // arrange
    render(Mockrouter(<LoginForm userService={new UserService()} />));

    // assert
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("calls event handler when the submit button is clicked", async () => {
    // arrange: render component and grab submit button
    const userService = new UserService();
    const mockAxiosResponse = {
      status: 200,
      statusText: "OK",
      data: {
        accessToken: "someToken",
        userID: "1",
      },
    };
    const loginServiceSpy = jest.spyOn(userService, "login");
    loginServiceSpy.mockResolvedValue(mockAxiosResponse as AxiosResponse);

    const userInfoServiceSpy = jest.spyOn(userService, "getUserInfo");
    userInfoServiceSpy.mockResolvedValue(mockAxiosResponse as AxiosResponse);

    render(Mockrouter(<LoginForm userService={userService} />));

    const loginButton = screen.getByText("Login");
    // act: click submit button
    const click = () => userEvent.click(loginButton);
    await click();

    expect(loginServiceSpy).toHaveBeenCalled();
  });
});

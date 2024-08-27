import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import UserService from "../../../../services/UserService";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import axios, { AxiosResponse } from "axios";
jest.mock("axios");

describe("Login Form", () => {
  it("renders properly", () => {
    // arrange
    render(<LoginForm userService={new UserService()} />);

    // assert
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls event handler when the submit button is clicked", async () => {
    // arrange: render component and grab submit button
    const userService = new UserService();
    render(<LoginForm userService={userService} />);
    const submitButton = screen.getByText("Submit");
    const mockAxiosResponse = {
      status: 200,
      statusText: "OK",
    };
    const serviceSpy = jest.spyOn(userService, "login");
    serviceSpy.mockResolvedValue(mockAxiosResponse as AxiosResponse);
    // act: click submit button
    const click = () => userEvent.click(submitButton);
    try {
      await click();
    } catch {
      // expect(serviceSpy).toHaveBeenCalled(); // should throw error
    } finally {
      // assert: the spy should have been calld
      expect(serviceSpy).toHaveBeenCalled();
    }
  });
});

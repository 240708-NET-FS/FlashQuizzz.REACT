import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import RegisterForm from "../RegisterForm";
import UserService from "../../../../services/UserService";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import MockRouter from "../../../../mocks/MockRouter";
describe("Register Form", () => {
  test("register form renders all fields", () => {
    // arrange
    render(MockRouter(<RegisterForm userService={new UserService()} />));

    const submitButton = screen.getByText("Signup");
    const resetButton = screen.getByText("Reset");

    expect(submitButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test("Register form submit button calls event handler", async () => {
    // arrange: render component
    const userService = new UserService();
    const serviceSpy = jest.spyOn(userService, "register");
    serviceSpy.mockResolvedValue({ status: 200, data: {} } as AxiosResponse);
    render(MockRouter(<RegisterForm userService={userService} />));

    const signupButton = screen.getByText("Signup");

    // arrange: get mock function for userservice.register

    // arrange: paste user info in field
    const formFields = screen.getAllByRole("textbox");
    const firstNameField = formFields[0];
    const lastNameField = formFields[1];
    const emailField = formFields[2];
    const passwordField = formFields[3];
    await userEvent.click(firstNameField);
    await userEvent.paste("Paul");
    await userEvent.click(lastNameField);
    await userEvent.paste("Glenn");
    await userEvent.click(emailField);
    await userEvent.paste("paul471@revature.net");
    await userEvent.click(passwordField);
    await userEvent.paste("password");
    // act: click submit button
    //console.log(signupButton.innerHTML);
    await userEvent.click(signupButton);

    // screen.debug();
    // assert that the mock function was called
    waitFor(() => expect(serviceSpy).toHaveBeenCalled());
    // expect(serviceSpy).toHaveBeenCalled();
  });

  test("Reset button  properly resets all form fields", async () => {
    render(<RegisterForm userService={new UserService()} />);
    const resetButton = screen.getByText("Reset");
    const formFields = screen.getAllByRole("textbox");
    const firstNameField = formFields[0];
    const lastNameField = formFields[1];
    const emailField = formFields[2];

    // act: Paste name in field
    await userEvent.click(firstNameField);
    await userEvent.paste("Paul");

    await userEvent.click(lastNameField);
    await userEvent.paste("Glenn");

    await userEvent.click(emailField);
    await userEvent.paste("paul471@revature.net");

    // act II: press reset button

    await userEvent.click(resetButton);

    // assert that fields have been reset

    expect(firstNameField).toHaveValue("");
    expect(lastNameField).toHaveValue("");
    expect(emailField).toHaveValue("");
  });
});

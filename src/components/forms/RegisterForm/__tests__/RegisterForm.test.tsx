/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe, it } from "@jest/globals";
import RegisterForm from "../RegisterForm";
import UserService from "../../../../services/UserService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Register Form", () => {
  test("register form renders properly", () => {
    // arrange
    render(<RegisterForm />);

    const submitButton = screen.getByText("Submit");
    const resetButton = screen.getByText("Reset Fields");

    expect(submitButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test("Register form submit button calls event handler", async () => {
    // arrange: render component
    render(<RegisterForm />);
    const submitButton = screen.getByText("Submit");

    // arrange: get mock function for userservice.register
    const serviceSpy = jest.spyOn(UserService, "register");
    // act
    await userEvent.click(submitButton);

    // assert: the spy should have been calld
    expect(serviceSpy).toHaveBeenCalled();
  });

  test("Reset button  properly resets all form fields", async () => {
    render(<RegisterForm />);
    const resetButton = screen.getByText("Reset Fields");
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

    // assert
    expect(firstNameField).toHaveValue("");
    expect(lastNameField).toHaveValue("");
    expect(emailField).toHaveValue("");
  });
});

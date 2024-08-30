import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import CreateFlashCardForm from "../CreateFlashCardForm";
import FlashCardService from "../../../../services/FlashCardService";
import IFlashCard from "../../../../interfaces/IFlashCard";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import options from "../../SelectOptions";
import selectEvent from "react-select-event";
describe("Create Flash Card Form", () => {
  it("renders the form to the DOM", () => {
    // arrange
    render(<CreateFlashCardForm flashCardService={new FlashCardService()} />);

    // assert
    expect(screen.getByLabelText("Question:")).toBeInTheDocument();
    expect(screen.getByLabelText("Answer:")).toBeInTheDocument();
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });
  test("controlled form renders the flash card details", async () => {
    // arrange
    const mFlashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Test Question",
        flashCardAnswer: "Test Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 3,
      },
    };
    const flashCardService = new FlashCardService();
    render(<CreateFlashCardForm flashCardService={flashCardService} />);

    // act: type in question, answer, and select category
    const questionInput = screen.getByLabelText("Question:");
    await userEvent.type(questionInput, mFlashCard.FlashCard.flashCardQuestion);
    const answerInput = screen.getByLabelText("Answer:");
    await userEvent.type(answerInput, mFlashCard.FlashCard.flashCardAnswer);
    const selectInput = screen.getByText("Select...");
    await selectEvent.select(
      selectInput,
      options[mFlashCard.FlashCard.flashCardCategoryID].label
    );

    expect(questionInput).toHaveValue(mFlashCard.FlashCard.flashCardQuestion);
    expect(answerInput).toHaveValue(mFlashCard.FlashCard.flashCardAnswer);
    expect(
      screen.getByText(options[mFlashCard.FlashCard.flashCardCategoryID].label)
    ).toBeInTheDocument();
  });

  it("calls service when a complete flash card is entered and userID is present", async () => {
    // arrange
    const flashCardService = new FlashCardService();
    const serviceSpy = jest.spyOn(flashCardService, "postFlashCard");
    serviceSpy.mockResolvedValue({ data: {}, status: 200 } as AxiosResponse);
    render(<CreateFlashCardForm flashCardService={flashCardService} />);
    const mFlashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 2,
      },
    };

    localStorage.setItem("userID", "1");

    // act: type in question, answer, and select category
    const questionInput = screen.getByLabelText("Question:");
    await userEvent.type(questionInput, mFlashCard.FlashCard.flashCardQuestion);
    const answerInput = screen.getByLabelText("Answer:");
    await userEvent.type(answerInput, mFlashCard.FlashCard.flashCardAnswer);
    const selectInput = screen.getByText("Select...");
    await selectEvent.select(
      selectInput,
      options[mFlashCard.FlashCard.flashCardCategoryID].label
    );

    //act: click submit button

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    // assert that the service spy has been called
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});

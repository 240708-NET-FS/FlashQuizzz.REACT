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
  // it("renders the form to the DOM", () => {
  //   // arrange
  //   render(<CreateFlashCardForm flashCardService={new FlashCardService()} />);

  //   // assert
  //   expect(screen.getByPlaceholderText("Question:")).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText("Answer:")).toBeInTheDocument();
  //   expect(screen.getByText("Category:")).toBeInTheDocument();
  // });
  test("controlled form renders the flash card details", async () => {
    // arrange
    const mFlashCard: IFlashCard = {
      FlashCard: {
        FlashCardID: 1,
        FlashCardQuestion: "Test Question",
        FlashCardAnswer: "Test Answer",
        CreatedDate: new Date(Date.now()),
        FlashCardCategory: 3,
      },
    };
    const flashCardService = new FlashCardService();
    render(<CreateFlashCardForm flashCardService={flashCardService} />);

    // act: type in question, answer, and select category
    const questionInput = screen.getByLabelText("Question:");
    await userEvent.type(questionInput, mFlashCard.FlashCard.FlashCardQuestion);
    const answerInput = screen.getByLabelText("Answer:");
    await userEvent.type(answerInput, mFlashCard.FlashCard.FlashCardAnswer);
    const selectInput = screen.getByText("Select...");
    await selectEvent.select(
      selectInput,
      options[mFlashCard.FlashCard.FlashCardCategory].label
    );
    //console.log(selectInput.innerHTML);

    expect(questionInput).toHaveValue(mFlashCard.FlashCard.FlashCardQuestion);
    expect(answerInput).toHaveValue(mFlashCard.FlashCard.FlashCardAnswer);
    expect(
      screen.getByText(options[mFlashCard.FlashCard.FlashCardCategory].label)
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
        FlashCardID: 1,
        FlashCardQuestion: "Question",
        FlashCardAnswer: "Answer",
        CreatedDate: new Date(Date.now()),
        FlashCardCategory: 2,
      },
    };

    localStorage.setItem("userID", "1");

    // act: type in question, answer, and select category
    const questionInput = screen.getByLabelText("Question:");
    await userEvent.type(questionInput, mFlashCard.FlashCard.FlashCardQuestion);
    const answerInput = screen.getByLabelText("Answer:");
    await userEvent.type(answerInput, mFlashCard.FlashCard.FlashCardAnswer);
    const selectInput = screen.getByText("Select...");
    await selectEvent.select(
      selectInput,
      options[mFlashCard.FlashCard.FlashCardCategory].label
    );

    //act: click submit button

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    // assert that the service spy has been called
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});

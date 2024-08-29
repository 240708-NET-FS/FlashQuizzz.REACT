import "@testing-library/jest-dom";
import * as React from "react";
import EditFlashCardForm from "../EditFlashCardForm";
import FlashCardService from "../../../../services/FlashCardService";
import IFlashCard from "../../../../interfaces/IFlashCard";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import options from "../../SelectOptions";
import selectEvent from "react-select-event";
describe("Edit Flash Card Form", () => {
  test("edit flash card form renders the flash card details", () => {
    // arrange
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 1,
      },
    };
    const flashCardService = new FlashCardService();
    render(
      <EditFlashCardForm
        flashCardService={flashCardService}
        flashCard={flashCard.FlashCard}
      />
    );

    jest.spyOn(flashCardService, "putFlashCard");

    expect(screen.getByPlaceholderText("Question")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Answer")).toBeInTheDocument();
  });

  test("submit button calls event handler", async () => {
    // arrange: render component
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 2,
      },
    };
    const flashCardService = new FlashCardService();
    render(
      <EditFlashCardForm
        flashCardService={flashCardService}
        flashCard={flashCard.FlashCard}
      />
    );
    const submitButton = screen.getByText("Submit");

    // arrange: get mock function for flashcardservice.putFlashCard
    const serviceSpy = jest.spyOn(flashCardService, "putFlashCard");
    serviceSpy.mockResolvedValue({ status: 200 } as AxiosResponse);
    const clickButton = () => userEvent.click(submitButton);
    //act: click submit button
    await clickButton();
    // assert:  calls on the mocked function serviceSpy
    expect(serviceSpy).toHaveBeenCalled();
  });

  test("reset button calls event handler", async () => {
    // arrange: render component
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 2,
      },
    };

    render(
      <EditFlashCardForm
        flashCardService={new FlashCardService()}
        flashCard={flashCard.FlashCard}
      />
    );
    const resetButton = screen.getByText("Reset");
    const clickButton = () => userEvent.click(resetButton);
    //act: click reset button
    await clickButton();

    // assert: fields are now blank for question, answer, and category is none

    expect(screen.getByPlaceholderText("Question")).toHaveValue("");
    expect(screen.getByPlaceholderText("Answer")).toHaveValue("");
  });

  test("user can edit flash card details", async () => {
    // arrange: render component
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 2,
      },
    };
    const flashCardService = new FlashCardService();
    render(
      <EditFlashCardForm
        flashCardService={flashCardService}
        flashCard={flashCard.FlashCard}
      />
    );
    const questionInput = screen.getByPlaceholderText("Question");
    const answerInput = screen.getByPlaceholderText("Answer");
    const selectInput = screen.getByText(options[2].label);

    // act: user can edit question, answer, and category
    await userEvent.type(questionInput, "Edited Question");
    await userEvent.type(answerInput, "Edited Answer");
    await selectEvent.select(selectInput, options[3].label);

    // assert: new edits are reflected in DOM
    expect(questionInput).toHaveValue("Edited Question");
    expect(answerInput).toHaveValue("Edited Answer");
    expect(screen.getByText(options[3].label)).toBeInTheDocument();
  });
});

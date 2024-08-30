import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import FlashCardDeleter from "../FlashCardDeleter";
import FlashcardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";

describe("Flash Card Deleter", () => {
  it("renders with confirmation message", () => {
    // arrange
    const flashCardService = new FlashcardService();
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 1,
      },
    };
    // act: render the component
    render(
      <FlashCardDeleter
        flashCardService={flashCardService}
        flashCard={flashCard.FlashCard}
      />
    );
    const message = `Are you sure you want to delete flashcard ${flashCard.FlashCard.flashCardID}?`;

    // assert that the message is rendered
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("delete button calls deleteFlashCard", async () => {
    // arrange: render component and get delete button
    const flashCardService = new FlashcardService();
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "Question",
        flashCardAnswer: "Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 1,
      },
    };
    render(
      <FlashCardDeleter
        flashCardService={flashCardService}
        flashCard={flashCard.FlashCard}
      />
    );

    // arrange: get mock function for flashcardservice.deleteFlashCard
    const serviceSpy = jest.spyOn(flashCardService, "deleteFlashCard");
    serviceSpy.mockResolvedValue({ status: 200 } as AxiosResponse);

    const deleteButton = screen.getByText("Confirm");

    // act: click delete button
    await userEvent.click(deleteButton);
    // assert:  calls on the mocked function serviceSpy
    expect(serviceSpy).toHaveBeenCalled();
  });
});

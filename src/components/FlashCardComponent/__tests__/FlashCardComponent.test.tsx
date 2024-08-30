import "@testing-library/jest-dom";
import * as React from "react";
import FlashCardComponent from "../FlashCardComponent";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "@jest/globals";
import IFlashCard from "../../../interfaces/IFlashCard";
import userEvent from "@testing-library/user-event";

describe("Flash Card Component", () => {
  it("renders the flash card question by default", () => {
    // arrange
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "My Question",
        flashCardAnswer: "My Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 1,
      },
    };

    render(<FlashCardComponent FlashCard={flashCard.FlashCard} />);

    expect(screen.getByText("My Question")).toBeInTheDocument();
    expect(screen.getByText("My Answer")).not.toBeInTheDocument();
  });

  it("renders the flash card answer when flash card is clicked", async () => {
    // arrange
    const flashCard: IFlashCard = {
      FlashCard: {
        flashCardID: 1,
        flashCardQuestion: "My Question",
        flashCardAnswer: "My Answer",
        createdDate: new Date(Date.now()),
        flashCardCategoryID: 1,
      },
    };

    render(<FlashCardComponent FlashCard={flashCard.FlashCard} />);

    // act
    await userEvent.click(screen.getByText("My Question"));

    //assert
    expect(screen.getByText("My Question")).not.toBeInTheDocument();
    expect(screen.getByText("My Answer")).toBeInTheDocument();
  });
});

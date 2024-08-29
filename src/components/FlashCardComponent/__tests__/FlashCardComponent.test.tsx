import "@testing-library/jest-dom"
import * as React from "react";
import FlashCardComponent from "../FlashCardComponent";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "@jest/globals";
import IFlashCard from "../../../interfaces/IFlashCard";

describe("Flash Card Component", () => {
  it("renders the flash card details", () => {
    // arrange
    const flashCard: IFlashCard = {
      FlashCard: {
        FlashCardID: 1,
        FlashCardQuestion: "My Question",
        FlashCardAnswer: "My Answer",
        CreatedDate: new Date(Date.now()),
        FlashCardCategory: 1,
      },
    };

    render(<FlashCardComponent FlashCard={flashCard.FlashCard} />);

    expect(screen.getByText("My Question")).toBeInTheDocument();
    expect(screen.getByText("My Answer")).toBeInTheDocument();
  });
});

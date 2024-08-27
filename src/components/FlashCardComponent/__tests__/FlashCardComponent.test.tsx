import FlashCardComponent from "../FlashCardComponent";
import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import IFlashCard from "../../../interfaces/IFlashCard";

describe("Flash Card Component", () => {
  test("flash card component renders properly", () => {
    // arrange
    const flashCard: IFlashCard = {
      FlashCard: {
        FlashCardID: 1,
        FlashCardQuestion: "Question",
        FlashCardAnswer: "Answer",
        CreatedDate: new Date(Date.now()),
      },
    };

    render(<FlashCardComponent FlashCard={flashCard.FlashCard} />);

    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });
});

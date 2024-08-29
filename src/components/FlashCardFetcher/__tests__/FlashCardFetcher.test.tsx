// Flash card fetcher unit tests
import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import FlashCardFetcher from "../FlashCardFetcher";
import FlashcardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";
import Category from "../../../interfaces/Category";
import { AxiosResponse } from "axios";

const testCards: IFlashCard["FlashCard"][] = [
  {
    FlashCardID: 1,
    FlashCardQuestion: "What is React?",
    FlashCardAnswer: "A library for managing user interfaces",
    FlashCardCategory: Category.HTML_CSS,
    CreatedDate: new Date(),
  },
  {
    FlashCardID: 2,
    FlashCardQuestion: "What is API?",
    FlashCardAnswer: "Application Programming Interface",
    FlashCardCategory: Category.JavaScript,
    CreatedDate: new Date(),
  },
  {
    FlashCardID: 3,
    FlashCardQuestion: "What is JSX?",
    FlashCardAnswer: "JavaScript XML",
    FlashCardCategory: Category.React,
    CreatedDate: new Date(),
  },
];

describe("Flash Card Fetcher", () => {
  it("renders loading message before flash cards retreived", () => {
    // arrange: render component
    const flashCardService = new FlashcardService();
    const serviceSpy = jest.spyOn(flashCardService, "getFlashCards");
    serviceSpy.mockResolvedValue({ data: [] } as AxiosResponse);
    render(<FlashCardFetcher flashCardService={flashCardService} />);
    const message = "Flash cards loading...";
    // assert
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("renders fetched flash card details", async () => {
    // arrange
    const flashCardService = new FlashcardService();
    const serviceSpy = jest.spyOn(flashCardService, "getFlashCards");
    serviceSpy.mockResolvedValue({ data: testCards } as AxiosResponse);
    render(<FlashCardFetcher flashCardService={flashCardService} />);

    testCards.forEach(async (flashCard) => {
      expect(
        await screen.findByText(flashCard.FlashCardQuestion)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(flashCard.FlashCardAnswer)
      ).toBeInTheDocument();
    });
  });
});

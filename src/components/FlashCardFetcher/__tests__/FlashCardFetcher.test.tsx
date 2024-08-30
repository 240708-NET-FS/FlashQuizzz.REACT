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
    flashCardID: 1,
    flashCardQuestion: "What is React?",
    flashCardAnswer: "A library for managing user interfaces",
    flashCardCategoryID: Category.HTML,
    createdDate: new Date(),
  },
  {
    flashCardID: 2,
    flashCardQuestion: "What is API?",
    flashCardAnswer: "Application Programming Interface",
    flashCardCategoryID: Category.JavaScript,
    createdDate: new Date(),
  },
  {
    flashCardID: 3,
    flashCardQuestion: "What is JSX?",
    flashCardAnswer: "JavaScript XML",
    flashCardCategoryID: Category.React,
    createdDate: new Date(),
  },
];

describe("Flash Card Fetcher", () => {
  it("renders loading message before flash cards retreived", () => {
    // arrange: render component
    const flashCardService = new FlashcardService();
    const serviceSpy = jest.spyOn(flashCardService, "getFlashCards");
    serviceSpy.mockResolvedValue({ data: [] } as AxiosResponse);
    render(<FlashCardFetcher flashCardService={flashCardService} />);
    const message = "No flash cards yet";
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
        await screen.findByText(flashCard.flashCardQuestion)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(flashCard.flashCardAnswer)
      ).toBeInTheDocument();
    });
  });
});

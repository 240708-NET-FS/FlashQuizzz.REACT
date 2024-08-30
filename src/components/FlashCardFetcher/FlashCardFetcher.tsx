import React from "react";
import { useEffect, useState } from "react";
import FlashcardService from "../../services/FlashCardService";
import IFlashCard from "../../interfaces/IFlashCard";
import FlashCardComponent from "../FlashCardComponent/FlashCardComponent";

function FlashCardFetcher({
  flashCardService,
}: {
  flashCardService: FlashcardService;
}) {
  const [flashCards, setFlashCards] =
    // for testing
    // useState<IFlashCard["FlashCard"][]>(testCards);
    useState<IFlashCard["FlashCard"][]>([]);
  useEffect(() => {
    async function fetchFlashCards() {
      try {
        // comment out for testing
        const response = await flashCardService.getFlashCards();
        setFlashCards(response.data);
      } catch (error) {
        console.error("Error fetching flash cards: ", error);
      }
    }
    fetchFlashCards();
  }, [flashCardService]);
  return (
    <div>
      <h3>Flash cards here:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {flashCards.length > 0 ? (
          flashCards.map((item, index) => (
            <FlashCardComponent key={index} FlashCard={item} />
          ))
        ) : (
          <p>No flash cards yet</p>
        )}
      </div>
      <p></p>
    </div>
  );
}

export default FlashCardFetcher;
// test data
// const testCards: IFlashCard["FlashCard"][] = [
//   {
//     FlashCardID: 1,
//     FlashCardQuestion: "What is React?",
//     FlashCardAnswer: "A library for managing user interfaces",
//     FlashCardCategory: Category.HTML_CSS,
//     CreatedDate: new Date(),
//   },
//   {
//     FlashCardID: 2,
//     FlashCardQuestion: "What is API?",
//     FlashCardAnswer: "Application Programming Interface",
//     FlashCardCategory: Category.JavaScript,
//     CreatedDate: new Date(),
//   },
//   {
//     FlashCardID: 3,
//     FlashCardQuestion: "What is JSX?",
//     FlashCardAnswer: "JavaScript XML",
//     FlashCardCategory: Category.React,
//     CreatedDate: new Date(),
//   },
// ];

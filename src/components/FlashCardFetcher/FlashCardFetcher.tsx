import { useEffect, useState } from "react";
import FlashcardService from "../../services/FlashCardService";
import IFlashCard from "../../interfaces/IFlashCard";
import FlashCardComponent from "../FlashCardComponent/FlashCardComponent";
import React from "react";

function FlashCardFetcher(flashcardService: FlashcardService) {
  const [flashCards, setFlashCards] = useState<IFlashCard[]>([]);

  useEffect(() => {
    async function fetchFlashCards() {
      try {
        const response = await flashcardService.getFlashCards();
        setFlashCards(response.data);
      } catch (error) {
        console.error("Error fetching flash cards: ", error);
      }
    }
    fetchFlashCards();
  }, [flashcardService]);
  return (
    <div>
      <h3>Flash cards here:</h3>
      <ul>
        {flashCards ? (
          flashCards.map((item, index) => (
            <FlashCardComponent key={index} FlashCard={item.FlashCard} />
          ))
        ) : (
          <p>Flash cards loading...</p>
        )}
      </ul>
      <p></p>
    </div>
  );
}

export default FlashCardFetcher;

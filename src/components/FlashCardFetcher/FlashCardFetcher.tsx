import React from "react";
import { useEffect, useState } from "react";
import FlashcardService from "../../services/FlashCardService";
import IFlashCard from "../../interfaces/IFlashCard";
import FlashCardComponent from "../FlashCardComponent/FlashCardComponent";
import React from "react";

function FlashCardFetcher({
  flashCardService,
}: {
  flashCardService: FlashcardService;
}) {
  const [flashCards, setFlashCards] = useState<IFlashCard["FlashCard"][]>([]);

  useEffect(() => {
    async function fetchFlashCards() {
      try {
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
      <ul>
        {flashCards.length > 0 ? (
          flashCards.map((item, index) => (
            <FlashCardComponent key={index} FlashCard={item} />
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

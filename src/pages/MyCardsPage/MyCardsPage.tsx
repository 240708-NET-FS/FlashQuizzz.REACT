import React from "react";
import FlashCardFetcher from "../../components/FlashCardFetcher/FlashCardFetcher";
import FlashcardService from "../../services/FlashCardService";

function MyCardsPage() {
  return (
    <div>
      <h1>My Cards</h1>
      <FlashCardFetcher flashCardService={new FlashcardService()} />
    </div>
  );
}

export default MyCardsPage;

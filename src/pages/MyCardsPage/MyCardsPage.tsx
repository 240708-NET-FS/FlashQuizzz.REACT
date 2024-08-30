import React from "react";
import FlashCardFetcher from "../../components/FlashCardFetcher/FlashCardFetcher";
import FlashcardService from "../../services/FlashCardService";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CreateFlashCardForm from "../../components/forms/CreateFlashCardForm/CreateFlashCardForm";

function MyCardsPage() {
  return (
    <div>
      <Popup trigger={<button className="btn btn-primary mb-3">Add flash card</button>} contentStyle={{ padding: '20px' }} modal>
        <CreateFlashCardForm flashCardService={new FlashcardService()} />
      </Popup>
      <h1>My Cards</h1>
      <FlashCardFetcher flashCardService={new FlashcardService()} />
    </div>
  );
}

export default MyCardsPage;

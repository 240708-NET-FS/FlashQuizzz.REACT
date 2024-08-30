import React, { useEffect } from "react";
import IFlashCard from "../../interfaces/IFlashCard";
import FlashCardService from "../../services/FlashCardService";

function FlashCardDeleter(props: {
  flashCardService: FlashCardService;
  flashCard: IFlashCard["FlashCard"];
}) {
  const [flashCardState, setFlashCard] = React.useState<
    IFlashCard["FlashCard"]
  >(props.flashCard);
  useEffect(() => {
    setFlashCard(props.flashCard);
  }, [props.flashCard]);

  async function deleteFlashCard() {
    const response = await props.flashCardService.deleteFlashCard(
      flashCardState.flashCardID!
    );
    if (response.status) {
      console.log("flash card deleted");
      window.location.reload();
    } else {
      console.log("Error deleting flash card");
    }
  }

  return (
    <div>
      <h3 id="message">
        Are you sure you want to delete flashcard {flashCardState.flashCardID}?
      </h3>
      <button className="btn btn-danger" onClick={deleteFlashCard}>Confirm</button>
    </div>
  );
}

export default FlashCardDeleter;

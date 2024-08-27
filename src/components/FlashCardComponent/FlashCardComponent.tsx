import React from "react";
import IFlashCard from "../../interfaces/IFlashCard";
import EditFlashCardForm from "../forms/EditFlashCardForm/EditFlashCardForm";
import FlashCardService from "../../services/FlashCardService";
import FlashCardDeleter from "../FlashCardDeleter/FlashCardDeleter";
import CreateRootEditSingleton from "./CreateRootEditSingleton";
import CreateRootDeleteSingleton from "./CreateRootDeleteSingleton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function FlashCardComponent({ FlashCard }: IFlashCard) {
  function showEditCardForm() {
    const root = CreateRootEditSingleton.getInstance();
    root.render(
      <EditFlashCardForm
        flashCardService={new FlashCardService()}
        flashCard={FlashCard}
      />
    );
  }

  function showDeleteConfirm() {
    const root = CreateRootDeleteSingleton.getInstance();
    root.render(
      <FlashCardDeleter
        flashCardService={new FlashCardService()}
        flashCard={FlashCard}
      />
    );
  }

  return (
    <div>
      <li>
        <h3>Question:</h3>
        <p>{FlashCard.FlashCardID}</p>
        <p>{FlashCard.FlashCardQuestion}</p>
        <p>{FlashCard.FlashCardAnswer}</p>
        <p>{FlashCard.CreatedDate.toString()}</p>

        <Popup
          trigger={<button onClick={showEditCardForm}> Edit</button>}
          modal
        >
          <EditFlashCardForm
            flashCardService={new FlashCardService()}
            flashCard={FlashCard}
          />
        </Popup>
        <Popup
          trigger={<button onClick={showDeleteConfirm}> Delete</button>}
          modal
        >
          <FlashCardDeleter
            flashCardService={new FlashCardService()}
            flashCard={FlashCard}
          />
        </Popup>
      </li>
    </div>
  );
}

export default FlashCardComponent;

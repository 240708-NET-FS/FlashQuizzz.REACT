import React from "react";
import IFlashCard from "../../interfaces/IFlashCard";
import EditFlashCardForm from "../forms/EditFlashCardForm/EditFlashCardForm";
import FlashCardService from "../../services/FlashCardService";
import FlashCardDeleter from "../FlashCardDeleter/FlashCardDeleter";
import CreateRootEditSingleton from "./CreateRootEditSingleton";
import CreateRootDeleteSingleton from "./CreateRootDeleteSingleton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Category from "../../interfaces/Category";

/**
 * A React component that displays a flashcard with a question, answer, and creation date.
 *
 * @param {IFlashCard} FlashCard - The flashcard data to be displayed
 * @return {JSX.Element} The JSX element representing the flashcard component
 */

function FlashCardComponent({ FlashCard }: IFlashCard): JSX.Element {
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

  function getCategoryByValue(input: number): string | undefined {
    return Object.keys(Category).find((item: string) => Category[item] === input);
  }

  return (
    <div>
      <li>
        <p>{FlashCard.FlashCardID}</p>
        <p>{FlashCard.FlashCardQuestion}</p>
        <p>{FlashCard.FlashCardAnswer}</p>
        <p>{FlashCard.UserID}</p>
        <p>{getCategoryByValue(FlashCard.FlashCardCategory)}</p>
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

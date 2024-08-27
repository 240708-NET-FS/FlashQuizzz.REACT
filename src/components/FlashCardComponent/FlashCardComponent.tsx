import React from "react";
import IFlashCard from "../../interfaces/IFlashCard";

/**
 * A React component that displays a flashcard with a question, answer, and creation date.
 *
 * @param {IFlashCard} FlashCard - The flashcard data to be displayed
 * @return {JSX.Element} The JSX element representing the flashcard component
 */

function FlashCardComponent({ FlashCard }: IFlashCard): JSX.Element {
  return (
    <div>
      <li>
        <h3>Question:</h3>
        <p>{FlashCard.FlashCardID}</p>
        <p>{FlashCard.FlashCardQuestion}</p>
        <p>{FlashCard.FlashCardAnswer}</p>
        <p>{new Date(FlashCard.CreatedDate).toISOString()}</p>
      </li>
    </div>
  );
}

export default FlashCardComponent;

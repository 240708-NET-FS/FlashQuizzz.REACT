import React, { useEffect } from "react";
import IFlashCard from "../../interfaces/IFlashCard";
import EditFlashCardForm from "../forms/EditFlashCardForm/EditFlashCardForm";
import FlashCardService from "../../services/FlashCardService";
import FlashCardDeleter from "../FlashCardDeleter/FlashCardDeleter";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css"; //TODO: #14 REMOVE  / Rework - breaks running of component
import Category from "../../interfaces/Category";
import "./FlashCardComponent.css";

/**
 * A React component that displays a flashcard with a question, answer, and creation date.
 *
 * @param {IFlashCard} FlashCard - The flashcard data to be displayed
 * @return {JSX.Element} The JSX element representing the flashcard component
 */

function FlashCardComponent({ FlashCard }: IFlashCard): JSX.Element {
  const [flashCard, setFlashCard] =
    React.useState<IFlashCard["FlashCard"]>(FlashCard);
  const [onQuestionSide, setOnQuestionSide] = React.useState<boolean>(true);

  useEffect(() => {
    setFlashCard(FlashCard);
  }, [FlashCard]);

  function getCategoryByValue(input: number): string | undefined {
    return Object.keys(Category).find(
      (item: string) => Category[item as keyof typeof Category] === input
    );
  }

  return (
    <div>
      <li style={{ listStyle: "none", marginTop: "20px", marginBottom: "15px" }}>
        <p style={{ margin: "2px" }}>{flashCard.flashCardID}</p>
        <p className={`${onQuestionSide ? 'flashCard' : 'answer'}`} onClick={onQuestionSide ? () => setOnQuestionSide(false) : () => setOnQuestionSide(true)}>
          {onQuestionSide ? flashCard.flashCardQuestion : flashCard.flashCardAnswer}
        </p>
        {/*<p>{flashCard.flashCardQuestion}</p>
        <p>{flashCard.flashCardAnswer}</p>*/}
        <p style={{ margin: "2px" }}>{getCategoryByValue(flashCard.flashCardCategoryID)}</p>
        <p style={{ margin: "2px" }}>{flashCard.createdDate.toString()}</p>

        <Popup trigger={<button className="btn btn-primary mr-3"> Edit</button>} contentStyle={{ padding: '20px' }} modal>
          <EditFlashCardForm
            flashCardService={new FlashCardService()}
            flashCard={flashCard}
          />
        </Popup>
        &nbsp;&nbsp;
        <Popup trigger={<button className="btn btn-danger"> Delete</button>} contentStyle={{ padding: '20px' }} modal>
          <FlashCardDeleter
            flashCardService={new FlashCardService()}
            flashCard={flashCard}
          />
        </Popup>
      </li>
      <hr />
    </div>
  );
}

export default FlashCardComponent;

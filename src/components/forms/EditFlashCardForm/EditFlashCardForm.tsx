import React, { useEffect, useReducer } from "react";
import ICreateFlashCardFormState from "../../../interfaces/ICreateFlashCardFormState";
import FlashCardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";
import Category from "../../../interfaces/Category";
import Select from "react-select";
import options from "../SelectOptions";

type ActionType =
  | {
      type: "editQuestion";
      payload: string;
    }
  | {
      type: "editAnswer";
      payload: string;
    }
  | {
      type: "editCategory";
      payload: number;
    }
  | {
      type: "reset";
    };
interface IEditFlashCardState {
  FlashCardQuestion: string;
  FlashCardAnswer: string;
  FlashCardCategory: number;
}

function formReducer(
  state: ICreateFlashCardFormState,
  action: ActionType
): ICreateFlashCardFormState {
  switch (action.type) {
    case "editQuestion":
      return { ...state, FlashCardQuestion: action.payload };
    case "editAnswer":
      return { ...state, FlashCardAnswer: action.payload };
    case "editCategory":
      return { ...state, FlashCardCategory: action.payload };
    case "reset":
      return {
        ...defaultFlashCardState,
      };
    default:
      throw new Error("Unknown action type");
  }
}

/**
 * A React component for editing a flash card.
 * @param {IFlashCard["FlashCard"]} props.flashCard - The flash card to edit.
 * @param {FlashCardService} props.flashCardService - The service for interacting with flash cards.
 * @return {JSX.Element} The rendered component.
 */
function EditFlashCardForm(props: {
  flashCard: IFlashCard["FlashCard"];
  flashCardService: FlashCardService;
}) {
  const [flashCardState, setFlashCard] = React.useState<
    IFlashCard["FlashCard"]
  >(props.flashCard);
  const [state, dispatch] = useReducer(formReducer, defaultFlashCardState);

  useEffect(() => {
    setFlashCard(props.flashCard);
  }, [props.flashCard]);

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "editQuestion", payload: event?.target.value });
  }
  function handleAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "editAnswer", payload: event?.target.value });
  }
  function handleCategoryChange(event: Category) {
    dispatch({
      type: "editCategory",
      payload: event,
    });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  async function handleSubmit() {
    try {
      const cardToPut: IFlashCard = {
        FlashCard: {
          userID: flashCardState.userID,
          flashCardID: flashCardState.flashCardID,
          flashCardQuestion: state.FlashCardQuestion,
          flashCardAnswer: state.FlashCardAnswer,
          flashCardCategoryID: state.FlashCardCategory,
          createdDate: new Date(),
        },
      };
      const response = await props.flashCardService.putFlashCard(cardToPut);
      if (response.status) {
        console.log("flash card put");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting flash card: ", error);
    }
  }

  return (
    <div>
      <h3>Edit a flash card</h3>
      <form>
        <p>Card ID: {flashCardState.flashCardID}</p>
        <label>Question: </label>
        <input
          type="text"
          name="question"
          value={state.FlashCardQuestion}
          placeholder={flashCardState.flashCardQuestion}
          onChange={handleQuestionChange}
        />
        <br />
        <label>Answer: </label>
        <input
          type="text"
          name="answer"
          value={state.FlashCardAnswer}
          placeholder={flashCardState.flashCardAnswer}
          onChange={handleAnswerChange}
        />
        <br />
        <label>
          Category:
          <Select
            options={options}
            onChange={(choice) => handleCategoryChange(choice!.value)}
            defaultValue={options[flashCardState.flashCardCategoryID]}
          />
        </label>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

const defaultFlashCardState: IEditFlashCardState = {
  FlashCardQuestion: "",
  FlashCardAnswer: "",
  FlashCardCategory: Category.None,
};

export default EditFlashCardForm;

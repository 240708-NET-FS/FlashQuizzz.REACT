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

// Define the initial state
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
    //
    state.FlashCardAnswer = props.flashCard.flashCardAnswer;
    state.FlashCardQuestion = props.flashCard.flashCardQuestion;
    //
  }, [props.flashCard]);

  // function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   dispatch({ type: "editQuestion", payload: event?.target.value });
  // }
  function handleQuestionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
      <h3 className="text-center">Edit a flash card</h3>
      <form>
        <p>Card ID: {flashCardState.flashCardID}</p>
        <div className="mb-3">
          <label className="form-label">
            Question:
            <textarea
              rows={4}
              name="question"
              onChange={handleQuestionChange}
              className="form-control"
              value={state.FlashCardQuestion}
            >
              {flashCardState.flashCardQuestion}
            </textarea>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Answer:
            <input
              type="text"
              name="answer"
              value={state.FlashCardAnswer}
              placeholder={flashCardState.flashCardAnswer}
              onChange={handleAnswerChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Category:
            <Select
              options={options}
              onChange={(choice) => handleCategoryChange(choice!.value)}
              defaultValue={options[flashCardState.flashCardCategoryID]}
              className="form-control"
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleReset}
        >
          Reset
        </button>
        &nbsp; &nbsp;
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleSubmit}
        >
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

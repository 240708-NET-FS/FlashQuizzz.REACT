import React, { useReducer } from "react";
import ICreateFlashCardFormState from "../../../interfaces/ICreateFlashCardFormState";
import FlashCardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";

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
      type: "reset";
    };

function formReducer(
  state: ICreateFlashCardFormState,
  action: ActionType
): ICreateFlashCardFormState {
  switch (action.type) {
    case "editQuestion":
      return { ...state, FlashCardQuestion: action.payload };
    case "editAnswer":
      return { ...state, FlashCardAnswer: action.payload };
    case "reset":
      return { FlashCardQuestion: "", FlashCardAnswer: "" };
    default:
      throw new Error("Unknown action type");
  }
}

function EditFlashCardForm(props: {
  flashCard: IFlashCard["FlashCard"];
  flashCardService: FlashCardService;
}) {
  const [state, dispatch] = useReducer(formReducer, {
    FlashCardQuestion: "",
    FlashCardAnswer: "",
  });

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "editQuestion", payload: event?.target.value });
  }
  function handleAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "editAnswer", payload: event?.target.value });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  async function handleSubmit() {
    try {
      const cardToPut: IFlashCard = {
        FlashCard: {
          FlashCardID: props.flashCard.FlashCardID,
          FlashCardQuestion: state.FlashCardQuestion,
          FlashCardAnswer: state.FlashCardAnswer,
          CreatedDate: new Date(),
        },
      };
      const response = await props.flashCardService.putFlashCard(cardToPut);
      if (response.status) {
        console.log("flash card patched");
      }
    } catch (error) {
      console.error("Error submitting flash card: ", error);
    }
  }

  return (
      <div>
        <h3>Edit a flash card</h3>
        <form>
          <p>Card ID: {props.flashCard.FlashCardID}</p>
          <label>Question: </label>
          <input
            type="text"
            name="question"
            value={state.FlashCardQuestion}
            placeholder={props.flashCard.FlashCardQuestion}
            onChange={handleQuestionChange}
          />
          <br />
          <label>Answer: </label>
          <input
            type="text"
            name="answer"
            value={state.FlashCardAnswer}
            placeholder={props.flashCard.FlashCardAnswer}
            onChange={handleAnswerChange}
          />
          <br />
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
  );
}

export default EditFlashCardForm;

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
        <label>Question: 
        <input
          type="text"
          name="question"
          value={state.FlashCardQuestion}
          onChange={handleQuestionChange}
        />
        </label>
        <br />
        <label>
          Answer:
          <input
            type="text"
            name="answer"
            value={state.FlashCardAnswer}
            onChange={handleAnswerChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div>
        <p>{props.flashCard.FlashCardID}</p>

        <p>{props.flashCard.FlashCardQuestion}</p>

        <p> {props.flashCard.FlashCardAnswer}</p>
        <p>{props.flashCard.CreatedDate.toString()}</p>
      </div>
    </div>
  );
}

export default EditFlashCardForm;

import React, { useReducer } from "react";
import ICreateFlashCardFormState from "../../../interfaces/ICreateFlashCardFormState";
import FlashCardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";

type ActionType =
  | { type: "setQuestion"; payload: string }
  | { type: "setAnswer"; payload: string }
  | { type: "reset" };

function formReducer(
  state: ICreateFlashCardFormState,
  action: ActionType
): ICreateFlashCardFormState {
  switch (action.type) {
    case "setQuestion":
      return { ...state, FlashCardQuestion: action.payload };
    case "setAnswer":
      return { ...state, FlashCardAnswer: action.payload };
    case "reset":
      return { FlashCardQuestion: "", FlashCardAnswer: "" };
    default:
      throw new Error("Unknown action type");
  }
}

function AddFlashCardForm({
  flashCardService,
}: {
  flashCardService: FlashCardService;
}) {
  const [state, dispatch] = useReducer(formReducer, {
    FlashCardQuestion: "",
    FlashCardAnswer: "",
  });

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setQuestion", payload: event?.target.value });
  }
  function handleAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setAnswer", payload: event?.target.value });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  async function handleSubmit() {
    try {
      const cardToPost: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: state.FlashCardQuestion,
          FlashCardAnswer: state.FlashCardAnswer,
          CreatedDate: new Date(),
        },
      };
      const response = await flashCardService.postFlashCard(cardToPost);
      if (response.status) {
        console.log("flash card posted");
      }
    } catch (error) {
      console.error("Error submitting flash card: ", error);
    }
  }

  return (
    <div>
      <h3>Add a flash card</h3>
      <form>
        <label>
          Question:
          <input
            type="text"
            value={state.FlashCardQuestion}
            onChange={handleQuestionChange}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={state.FlashCardAnswer}
            onChange={handleAnswerChange}
          />
        </label>
        <button onClick={handleReset}>Reset Fields</button>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div>
        {state.FlashCardQuestion}
        {state.FlashCardAnswer}
      </div>
    </div>
  );
}

export default AddFlashCardForm;

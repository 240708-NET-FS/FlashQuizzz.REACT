import React, { useReducer } from "react";
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
        FlashCardQuestion: "",
        FlashCardAnswer: "",
        FlashCardCategory: Category.None,
      };
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
    FlashCardCategory: Category.None,
  });

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
          FlashCardID: props.flashCard.FlashCardID,
          FlashCardQuestion: state.FlashCardQuestion,
          FlashCardAnswer: state.FlashCardAnswer,
          FlashCardCategory: state.FlashCardCategory,
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
        <label>
          Category:
          <Select
            options={options}
            onChange={(choice) => handleCategoryChange(choice!.value)}
            defaultValue={options[props.flashCard.FlashCardCategory]}
          />
        </label>
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

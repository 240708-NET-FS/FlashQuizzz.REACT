import React, { useReducer } from "react";
import ICreateFlashCardFormState from "../../../interfaces/ICreateFlashCardFormState";
import FlashCardService from "../../../services/FlashCardService";
import IFlashCard from "../../../interfaces/IFlashCard";
import Category from "../../../interfaces/Category";
import Select from "react-select";
import options from "../SelectOptions";

type ActionType =
  | { type: "setQuestion"; payload: string }
  | { type: "setAnswer"; payload: string }
  | { type: "setCategory"; payload: number }
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
    case "setCategory":
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

function CreateFlashCardForm({
  flashCardService,
}: {
  flashCardService: FlashCardService;
}) {
  const [state, dispatch] = useReducer(formReducer, {
    FlashCardQuestion: "",
    FlashCardAnswer: "",
    FlashCardCategory: Category.None,
  });

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setQuestion", payload: event?.target.value });
  }
  function handleAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setAnswer", payload: event?.target.value });
  }
  function handleCategoryChange(event: Category) {
    dispatch({
      type: "setCategory",
      payload: event,
    });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  async function handleSubmit() {
    try {
      const userID = localStorage.getItem("userID");
      if (userID == null) {
        throw new Error("User information is missing.");
      }

      const cardToPost: IFlashCard = {
        FlashCard: {
          userID: userID,
          flashCardQuestion: state.FlashCardQuestion,
          flashCardAnswer: state.FlashCardAnswer,
          flashCardCategoryID: state.FlashCardCategory,
          createdDate: new Date(),
        },
      };

      const response = await flashCardService.postFlashCard(cardToPost);
      if (response.status) {
        console.log("flash card posted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting flash card: ", error);
    }
  }

  return (
    <div>
      <h3 className="text-center">Add a flash card</h3>
      <form data-testid="create-flash-card-form">
        <div className="mb-3">
          <label className="form-label">
          Question:
          </label>
          <input
            type="text"
            value={state.FlashCardQuestion}
            onChange={handleQuestionChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
          Answer:
          </label>
          <input
            type="text"
            value={state.FlashCardAnswer}
            onChange={handleAnswerChange}
            className="form-control"
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">
          Category:
          </label>
          <Select
            options={options}
            onChange={(choice) => handleCategoryChange(choice!.value)}
            className="form-control"
          />
        </div>
        
        <button type="button" className="btn btn-secondary btn-block mr-3" onClick={handleReset}>Reset Fields</button>
        &nbsp;
        &nbsp;
        <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateFlashCardForm;

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
      //TODO: CHANGE WHEN LOCAL STORAGE IMPLEMENTED
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo == null) {
        throw new Error("User information is missing.");
      }
      const cardToPost: IFlashCard = {
        FlashCard: {
          UserID: JSON.parse(userInfo).ID,
          FlashCardQuestion: state.FlashCardQuestion,
          FlashCardAnswer: state.FlashCardAnswer,
          FlashCardCategory: state.FlashCardCategory,
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
        <label>
          Category:
          <Select
            options={options}
            onChange={(choice) => handleCategoryChange(choice!.value)}
          />
        </label>
        <button onClick={handleReset}>Reset Fields</button>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default CreateFlashCardForm;

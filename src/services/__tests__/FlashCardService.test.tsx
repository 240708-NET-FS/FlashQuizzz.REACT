import FlashCardService from "../FlashCardService";
import axios from "axios";
import { url } from "../../url.json";

import IFlashCard from "../../interfaces/IFlashCard";

describe("Flash Card Service", () => {
  describe("post flash card", () => {
    it("raises an error for incomplete flash cards", () => {
      // arrange: create flashcard
      const flashCard: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: "",
          FlashCardAnswer: "",
          FlashCardID: 1,
          CreatedDate: Date.now(),
        },
      };

      // act: invoke postFlashCard
      const postFlashCard = () => {
        new FlashCardService().postFlashCard(flashCard);
      };

      // assert that error is raised
      expect(postFlashCard).toThrow("Flash card information is incomplete.");
    });
  });
});

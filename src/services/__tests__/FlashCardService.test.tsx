import FlashCardService from "../FlashCardService";
import axios from "axios";
import { url, flashCardEndpoint } from "../../url.json";

import IFlashCard from "../../interfaces/IFlashCard";
jest.mock("axios");
describe("Flash Card Service", () => {
  describe("post flash card", () => {
    it("raises an error for incomplete flash cards", () => {
      // arrange: create flashcard
      const flashCard: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: "",
          FlashCardAnswer: "",
          FlashCardID: 1,
          CreatedDate: new Date(Date.now()),
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

  describe("get flash cards", () => {
    // arrange: create mock axios implementation
    test("calls axios with correct url", async () => {
      const axiosCallMock = (url: string): Promise<object> =>
        Promise.resolve({ data: [], config: { url: url } });
      const axiosMock = axios.get as jest.MockedFunction<typeof axios.post>;
      axiosMock.mockImplementation(axiosCallMock);

      // act: invoke getFlashCards
      const response = await new FlashCardService().getFlashCards();
      const calledURL = response.config.url;

      // assert: mock should have been invoked with correct url
      expect(axiosMock).toHaveBeenCalled();
      expect(calledURL).toEqual(url + flashCardEndpoint);
    });
  });

  describe("post flash card", () => {
    test("calls axios with correct url", async () => {
      const flashCard: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: "Question",
          FlashCardAnswer: "Answer",
          FlashCardID: 1,
          CreatedDate: new Date(Date.now()),
        },
      };
      const axiosCallMock = (url: string): Promise<object> =>
        Promise.resolve({ data: flashCard, config: { url: url } });
      const axiosMock = axios.post as jest.MockedFunction<typeof axios.post>;
      axiosMock.mockImplementation(axiosCallMock);

      // act: invoke postFlashCard
      const response = await new FlashCardService().postFlashCard(flashCard);
      const calledURL = response.config.url;

      //assert: mock should have been invoked with correct url
      expect(axiosMock).toHaveBeenCalled();
      expect(calledURL).toEqual(url + flashCardEndpoint);
    });
  });

  describe("put flash card", () => {
    it("raises an error for incomplete flash card", () => {
      // arrange: create flashcard
      const flashCard: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: "",
          FlashCardAnswer: "",
          FlashCardID: 1,
          CreatedDate: new Date(Date.now()),
        },
      };

      // act: invoke postFlashCard
      const putFlashCard = () => {
        new FlashCardService().putFlashCard(flashCard);
      };

      // assert that error is raised
      expect(putFlashCard).toThrow("Flash card information is incomplete.");
    });
 
    it("calls axios with correct url for a complete flash card", async () => {
      const flashCard: IFlashCard = {
        FlashCard: {
          FlashCardQuestion: "Question",
          FlashCardAnswer: "Answer",
          FlashCardID: 1,
          CreatedDate: new Date(Date.now()),
        },
      };
      const axiosCallMock = (url: string): Promise<object> =>
        Promise.resolve({ data: flashCard, config: { url: url } });
      const axiosMock = axios.put as jest.MockedFunction<typeof axios.put>;
      axiosMock.mockImplementation(axiosCallMock);

      // act: invoke putFlashCard
      const response = await new FlashCardService().putFlashCard(flashCard);
      const calledURL = response.config.url;

      //assert: mock should have been invoked with correct url
      expect(axiosMock).toHaveBeenCalled();
      expect(calledURL).toEqual(url + flashCardEndpoint);
    });
  });
});

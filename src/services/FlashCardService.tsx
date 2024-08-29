import axios, { AxiosResponse } from "axios";
import { url, flashCardEndpoint } from "../url.json";
import IFlashCard from "../interfaces/IFlashCard";

class FlashCardService {
  getFlashCards(): Promise<AxiosResponse> {
    return axios.get(url + flashCardEndpoint);
  }

  postFlashCard({ FlashCard }: IFlashCard): Promise<AxiosResponse> {
    if (
      FlashCard.UserID == null ||
      FlashCard.FlashCardQuestion == "" ||
      FlashCard.FlashCardAnswer == "" ||
      FlashCard.FlashCardCategory == null ||
      FlashCard.CreatedDate == null
    ) {
      throw new Error("Flash card information is incomplete.");
    }
    return axios.post(
      url + flashCardEndpoint,
      {
        ...FlashCard,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  putFlashCard({ FlashCard }: IFlashCard): Promise<AxiosResponse> {
    if (
      FlashCard.UserID == null ||
      FlashCard.FlashCardQuestion == "" ||
      FlashCard.FlashCardAnswer == "" ||
      FlashCard.FlashCardCategory == null ||
      FlashCard.CreatedDate == null
    ) {
      throw new Error("Flash card information is incomplete.");
    }
    return axios.put(url + flashCardEndpoint + "/" + FlashCard.FlashCardID, {
      ...FlashCard,
    });
  }

  deleteFlashCard(id: number): Promise<AxiosResponse> {
    return axios.delete(url + flashCardEndpoint + "/" + id);
  }
}
export default FlashCardService;

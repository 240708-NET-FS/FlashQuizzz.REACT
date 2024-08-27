import axios, { AxiosResponse } from "axios";
import { url, flashCardEndpoint } from "../url.json";
import IFlashCard from "../interfaces/IFlashCard";

//NEEDS TO BE UPDATED
class FlashCardService {
  getFlashCards(): Promise<AxiosResponse> {
    return axios.get(url + flashCardEndpoint, {
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });
  }

  postFlashCard({ FlashCard }: IFlashCard): Promise<AxiosResponse> {
    if (
      FlashCard.FlashCardID == null ||
      FlashCard.FlashCardQuestion == "" ||
      FlashCard.FlashCardAnswer == "" ||
      FlashCard.CreatedDate == null
    ) {
      throw new Error("Flash card information is incomplete.");
    }
    return axios.post(url + flashCardEndpoint, {
      body: FlashCard,
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });
  }

  putFlashCard({ FlashCard }: IFlashCard): Promise<AxiosResponse> {
    if (
      FlashCard.FlashCardID == null ||
      FlashCard.FlashCardQuestion == "" ||
      FlashCard.FlashCardAnswer == "" ||
      FlashCard.CreatedDate == null
    ) {
      throw new Error("Flash card information is incomplete.");
    }
    return axios.put(url + flashCardEndpoint, {
      body: FlashCard,
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });
  }

  deleteFlashCard(id : number): Promise<AxiosResponse> {
    return axios.delete(
      url + "/flash-cards/TO-UPDATE/" + id,
      {
        headers: {
          Authorization: localStorage.getItem("access-token"),
        },
      }
    );
  }
}
export default FlashCardService;

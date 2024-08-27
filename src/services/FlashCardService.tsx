import axios, { AxiosResponse } from "axios";
import { url } from "../url.json";
import IFlashCard from "../interfaces/IFlashCard";

//NEEDS TO BE UPDATED
class FlashCardService {
  getFlashCards(): Promise<AxiosResponse> {
    return axios.get(url + "/flash-cards/TO-UPDATE", {
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
    return axios.post(url + "/flash-cards/TO-UPDATE", {
      body: FlashCard,
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });
  }

  putFlashCard({ FlashCard }: IFlashCard): Promise<AxiosResponse> {
    if (FlashCard.FlashCardQuestion == "" || FlashCard.FlashCardAnswer == "") {
      throw new Error("Flash card information is incomplete.");
    }

    return axios.put(url + "/flash-cards/TO-UPDATE", {
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

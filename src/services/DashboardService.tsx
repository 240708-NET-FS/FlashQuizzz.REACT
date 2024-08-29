import axios, { AxiosResponse } from "axios";
import { url } from "../url.json";

class DashboardService {
  async getUserID(accessToken: string): Promise<AxiosResponse> {
    try{
      let userObject, userToken;
      if (!accessToken) {
        userObject = localStorage.getItem('userObject');
        console.log('User token retrieved from local storage:', userObject);
      }
      

      if (!userObject) {
          console.error('No user token found in local storage.');
          alert("Something went wrong. Please try again.");
          return Promise.reject('No user token found.');
      }else{
        userToken = JSON.parse(userObject);
        console.log('User token retrieved from local storage:', userToken);
        accessToken = userToken.accessToken.toString();
        console.log(typeof accessToken);
        //
        return await axios.post(url +'/api/user/userinfo', null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
      }
      //
    }catch(error){
      console.log(error);
      alert("Something went wrong. Please try again.");
      return Promise.reject('Loading failed. Please try again.');
    }
  }

  async getUserFlashCards(userID: string): Promise<AxiosResponse> {
    return await axios.get(url +'/api/FlashCard/user/' + userID);
  }

  async getAllCategory(): Promise<AxiosResponse> {
    let userToken, accessToken;
    const userObject = localStorage.getItem('userObject');
    console.log('User token retrieved from local storage:', userObject);
      
    if (!userObject) {
        console.error('No user token found in local storage.');
        alert("Something went wrong. Please try again.");
        return Promise.reject('No user token found.');
    }else{
      userToken = JSON.parse(userObject);
      console.log('User token retrieved from local storage:', userToken);
      accessToken = userToken.accessToken.toString();
      console.log(typeof accessToken);
      //
      return await axios.get(url +'/api/FlashCardCategory/categories', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      });
    }
  }
}

export default DashboardService;

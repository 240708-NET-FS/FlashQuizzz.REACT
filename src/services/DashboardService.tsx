import axios, { AxiosResponse } from "axios";
import { url } from "../url.json";

// // Define the type for your data
// interface FlashCard {
//   flashCardID: number;
//   flashCardCategory: number;
//   flashCardQuestion: string;
//   flashCardAnswer: string;
//   createdDate: string;
// }

class DashboardService {
  async getUserID(accessToken: string): Promise<AxiosResponse> {
    try{
      let userObject, userToken;
      if (!accessToken) {
        userObject = localStorage.getItem('userObject');
        console.log('User Object retrieved from local storage:', userObject);
      }
      

      if (!userObject) {
          console.error('No user token found in local storage.');
          // alert("Something went wrong. Please try again.");
          return Promise.reject('No user token found.');
      }else{
        userToken = JSON.parse(userObject);
        console.log('User Token retrieved from local storage:', userToken);
        accessToken = userToken.accessToken.toString();
        console.log(typeof accessToken);
        //
        const response = await axios.post(url +'/api/user/userinfo', null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if (response.status === 200) {
          console.log('Load successful.');
          if(response.data.userID){
              console.log("UserID " + response.data.userID);
              localStorage.setItem('userID', response.data.userID.toString());
              return response.data.userID;
          }else{
            console.error('load failed:', response.status, response.statusText);
            alert('Load failed. Please try again.');
            return Promise.reject('Loading failed. Please try again.');
          }
        } else {
            console.error('load failed:', response.status, response.statusText);
            alert('Load failed. Please try again.');
            return Promise.reject('Loading failed. Please try again.');
        }
      }
      //
    }catch(error){
      console.log(error);
      // alert("Something went wrong. Please try again.");
      return Promise.reject('Loading failed. Please try again.');
    }
  }

  async getUserFlashCards(): Promise<AxiosResponse> {
    console.log('getUserFlashCards');
    this.getUserID("");
    const userID = localStorage.getItem('userID');
    console.log(userID);
    // let responseFC = "";
    if(userID=="8681bf6e-7063-464e-8223-b40145fc6873"){
      const responseFC = await axios.get(url +'/api/FlashCard');
      if (responseFC.status === 200) {
        console.log('Populate table with data');
        return responseFC;
      } else {
          console.error('Load failed:', responseFC.status, responseFC.statusText);
          alert('Loading failed. Please try again.');
          return Promise.reject('Loading failed. Please try again.');
      }
    }else{
      const responseFC = await axios.get(url +'/api/FlashCard/user/' + userID);
      if (responseFC.status === 200) {
        console.log('Populate table with data');
        return responseFC;
      } else {
          console.error('Load failed:', responseFC.status, responseFC.statusText);
          alert('Loading failed. Please try again.');
          return Promise.reject('Loading failed. Please try again.');
      }
    }
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
      const response = await axios.get(url +'/api/FlashCardCategory/categories', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      });

      if (response.status === 200) {
        return response;
          // TODO: Filter map data and retrieve only flashCardCategoryStatus = true
          // console.log(response.data.filter((card: { flashCardCategoryStatus: boolean; }) => card.flashCardCategoryStatus === true));
          // return response.data.filter((card: { flashCardCategoryStatus: boolean; }) => card.flashCardCategoryStatus === true);
      } else {
          return Promise.reject('Loading failed. Please try again.');
      }
    }
  }
}

export default DashboardService;

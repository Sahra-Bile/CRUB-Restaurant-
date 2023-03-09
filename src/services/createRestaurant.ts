import axios from 'axios';
import {IRestaurant} from "../models/IRestaurant "



export const createRestaurant =  async():Promise<IRestaurant[]> =>{

  let  response = await axios.post('https://school-restaurant-api.azurewebsites.net/restaurant/create',{name:'CRUB.',address:{street: "Drottninggatan 33", zip: "15678", city: "Stockholm"}} );


  return  response.data; 

}


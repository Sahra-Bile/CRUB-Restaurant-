import axios from 'axios';
import {IRestaurant} from "../models/IRestaurant "

//* Användes en gång för att spara restaurangens id i databasen
export const createRestaurant =  async():Promise<IRestaurant[]> =>{

  let  response = await axios.post('https://school-restaurant-api.azurewebsites.net/restaurant/create',{name:'CRUB.',address:{street: "Drottninggatan 33", zip: "15678", city: "Stockholm"}} );

  return  response.data; 
}


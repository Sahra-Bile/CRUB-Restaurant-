import axios from 'axios';
import {IRestaurant} from "../models/IRestaurant "


 const resturantId =  "64089b0d76187b915f68e16f";


export const createRestaurant =  async():Promise<IRestaurant[]> =>{

  let  response = await axios.post('https://school-restaurant-api.azurewebsites.net/restaurant/create',{name:'CRUB.',address:{street: "Drottninggatan 33", zip: "15678", city: "Stockholm"}} );


  return  response.data; 

}


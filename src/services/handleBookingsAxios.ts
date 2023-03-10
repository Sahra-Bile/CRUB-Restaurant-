
import axios from 'axios';
import { IBookingsRespons, IBookingsResponse, INewBooking } from '../models/IBooking';


// const body = JSON.stringify({ bookingsDefaultValue })


//* få alla inlagda bokningar
const url_1: string = 'https://school-restaurant-api.azurewebsites.net/booking/restaurant/';


const resturantId =  "64089b0d76187b915f68e16f";



export async function getAllBookings() {

  let response = await axios.get(url_1 +resturantId);

  return response.data;
 
}



const url_2: string = 'https://school-restaurant-api.azurewebsites.net/booking/create';


const customConfig = {
  headers: {
  'Content-Type': 'application/json'
  }
};


export const createBooking =  async(booking:INewBooking) =>{
  let response = await axios.post(url_2,booking)

  return response.data;


}



const url_3: string = 'https://school-restaurant-api.azurewebsites.net/booking/';



export async function getBookingById (id: string):Promise<IBookingsRespons> {

  let response = await axios.get(url_3 + id);

  return response.data;
 
}




const url_4: string = 'https://school-restaurant-api.azurewebsites.net/booking/delete/';




 export const deleteBookingById = async(id:string): Promise<IBookingsResponse> =>{

  let response = await axios.delete(url_4 + id);

  return response.data;



 }




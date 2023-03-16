import axios from "axios";
import {
  IBooking,
  IBookingCreated,
  IBookingsResponse,
  IBookingUpdate, INewBooking,
} from "../models/IBooking";
import { ICustomer } from "../models/ICustomer";

//* Våran restaurangs id i databasen
const resturantId = "64089b0d76187b915f68e16f";


const url: string =
  "https://school-restaurant-api.azurewebsites.net/booking/restaurant/";

//* Anropar api
export const getAllBookings = async (): Promise<IBookingsResponse[]> => {
  let response = await axios.get(url + resturantId);

  return response.data;
};

const BASE_URL: string =
  "https://school-restaurant-api.azurewebsites.net/booking/create";

export const createBooking = async (

   booking: INewBooking ): Promise<IBookingCreated> =>{

  let response = await axios.post<IBookingCreated>(BASE_URL, booking);

  return response.data;
};

const BASE_URL_2: string = 'https://school-restaurant-api.azurewebsites.net/booking/';

export async function getBookingById (id: string):Promise<IBooking[]> {

  let response = await axios.get( BASE_URL_2 + id);

  return response.data;
}

const url_3: string =
  "https://school-restaurant-api.azurewebsites.net/booking/delete/";

export const deleteBookingById = async (
  id: string
): Promise<IBookingsResponse> => {
  let response = await axios.delete(url_3 + id);

  return response.data;
};

const url_5: string =
  "https://school-restaurant-api.azurewebsites.net/booking/update/";

 export const editBookingById = async(id:string, booking: 

  IBookingUpdate): Promise<IBookingsResponse> =>{

 let response = await axios.put(url_5 + id, booking)
 return response.data;

 }

let customUrl = "https://school-restaurant-api.azurewebsites.net/customer/";

export const getCustomerById = async (id: string): Promise<ICustomer[]> => {
  let response = await axios.get<ICustomer[]>(customUrl + id);

  return response.data;
};

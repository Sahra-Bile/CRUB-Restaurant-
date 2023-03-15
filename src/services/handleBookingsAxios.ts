import axios from "axios";
import {
  IBooking,
  IBookingCreated,
  IBookingsResponse,
  IBookingUpdate, INewBooking,
} from "../models/IBooking";
import { ICustomer } from "../models/ICustomer";

// const body = JSON.stringify({ bookingsDefaultValue })

//* få alla inlagda bokningar
const url_1: string =
  "https://school-restaurant-api.azurewebsites.net/booking/restaurant/";

const resturantId = "64089b0d76187b915f68e16f";

//* all bookings

export const getAllBookings = async (): Promise<IBookingsResponse[]> => {
  let response = await axios.get(url_1 + resturantId);

  return response.data;
};

const url_2: string =
  "https://school-restaurant-api.azurewebsites.net/booking/create";

export const createBooking = async (
  booking: INewBooking
): Promise<IBookingCreated> => {
  let response = await axios.post<IBookingCreated>(url_2, booking);

  return response.data;
};




const url_3: string = 'https://school-restaurant-api.azurewebsites.net/booking/';



export async function getBookingById (id: string):Promise<IBooking[]> {

  let response = await axios.get(url_3 + id);

  return response.data;
}

const url_4: string =
  "https://school-restaurant-api.azurewebsites.net/booking/delete/";

export const deleteBookingById = async (
  id: string
): Promise<IBookingsResponse> => {
  let response = await axios.delete(url_4 + id);

  return response.data;
};

const url_5: string =
  "https://school-restaurant-api.azurewebsites.net/booking/update/";



// const url_5: string = 'https://school-restaurant-api.azurewebsites.net/booking/update/';


 export const editBookingById = async(id:string, booking: IBookingUpdate): Promise<IBookingsResponse> =>{
 let response = await axios.put(url_5 + id, booking)
 return response.data;

 }

let customUrl = "https://school-restaurant-api.azurewebsites.net/customer/";

export const getCustomerById = async (id: string): Promise<ICustomer[]> => {
  let response = await axios.get<ICustomer[]>(customUrl + id);

  return response.data;
};

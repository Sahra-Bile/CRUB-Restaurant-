import { ICustomer } from './ICustomer';



export interface IBooking {
  id?: string;
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  clientId?: ICustomer;
}


export interface INewBooking{
  restaurantId: string,
  date: string;
  time: string;
  numberOfGuests: number;
  customer:{
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
 };



export const bookingsDefaultValue: INewBooking = {
  restaurantId: '',
  date: '',
  time: '',
  numberOfGuests: 0,
  customer: {
    name: '',
    lastname: '',
    email: '',
    phone: ''
  }
};




export const bookingsDefaultValues: IBooking = {
  id: "",
  date: new Date(),
  sittingTime: 0,
  numberOfPeople: 0,
};


export const customersDefaultValue: ICustomer = {
  id: "",
  name: "",
  lastname: '',
  email: "",
  phone: "",
};



 export interface IBookingsResponse_1{
    id: string
    restaurantId: string,
    date: string;
    time: string;
    numberOfGuests: number;
    customerId: string;
 };


export interface IBookingsResponse {
  data: IBookingsResponse_1[];
};




export interface IBookingsRespons {
  data:IBooking;
};





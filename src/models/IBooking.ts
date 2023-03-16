//* Få en bokning med id:
export interface IBooking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

//* För att uppdatera en existerande bokning:
export interface IBookingUpdate {
  id: string;
  restaurantId:string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

//* Vårt interface för att skapa en ny bokning:
export interface INewBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}

//* Vårt interface för att få en lista med alla bokingar:
export interface IBookingsResponse {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

//* För att skicka ett standardvärde:
 export const  bookingsDefaultValue: IBookingsResponse = {
   _id: '',
   restaurantId: "64089b0d76187b915f68e16f",
   date:  '2023-03-20',
   time: '19:00',
   numberOfGuests: 0,
   customerId: ''
 }

//* För att få bokningens unika id när den har skapats:
 export interface IBookingCreated {
  insertedId: string;
}

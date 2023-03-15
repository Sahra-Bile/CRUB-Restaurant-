//* få en booking by id
export interface IBooking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

export interface IBookingUpdate {
  id: string;
  restaurantId:string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}


//* interface för att skapa en bokning
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

//* interface för att få en lista av all bokingar
export interface IBookingsResponse {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

 export const  bookingsDefaultValue: IBookingsResponse = {
   _id: '',
   restaurantId: "64089b0d76187b915f68e16f",
   date:  '2023-03-20',
   time: '19:00',
   numberOfGuests: 0,
   customerId: ''
 }


 export interface IBookingCreated {
  insertedId: string;
}

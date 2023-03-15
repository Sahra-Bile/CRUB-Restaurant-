//* få en booking by id
export interface IBooking {
  _id: string;
  restaurantId: string;
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

export const bookingsDefaultValue: IBooking = {
  _id: "",
  restaurantId: "",
  date: "",
  time: "",
  numberOfGuests: 0,
  customerId: "",
};
export interface IBookingCreated {
  insertedId: string;
}

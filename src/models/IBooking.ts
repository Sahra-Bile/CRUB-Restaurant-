
//* få en booking by id
export interface IBooking {
  _id: string,
  date: string,
  time: string,
  numberOfGuests: number,
  customerId: string
}


//* interface för att skapa en bokning
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

 //* interface för att få en lista av all bokingar
 export interface IBookingsResponse{
    // find(arg0: (booking: any) => boolean): unknown;
    _id: string;
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customerId: string;
 };






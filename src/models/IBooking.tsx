import { type } from "os";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

//* få en booking by id
export interface IBooking {
  _id: string,
  date: string,
  time: string,
  numberOfGuests: number,
  customerId: string
}


//* interface för att skapa en bokning
export interface INewBooking {
  restaurantId: string,
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
};

export type ICustomer = {
  id: string,
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

//* interface för att få en lista av all bokingar
export type IBookingsResponse = {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
};
export interface ICustomerContext {
  customer: ICustomer,
  setCustomer: Dispatch<SetStateAction<IBookingsResponse>>
}

const defaultContext = {
  customer: {

  },
  setCustomer: (customer: IBookingsResponse) => { }

} as ICustomerContext;

export const CustomerContext = createContext(defaultContext);

type CustomerProviderProps = {
  children: ReactNode
}

export default function CustomerProvider({ children }: CustomerProviderProps) {
  const [customer, setCustomer] = useState<IBookingsResponse | null>(null);
  return (
    // <CustomerContext.Provider value={{ customer, setCustomer }}>
    //   {children}
    // </CustomerContext.Provider>
    <></>
  )

}
import { getCustomerById } from '../services/handleBookingsAxios';

import { IBooking } from '../models/IBooking';
import { createContext } from 'react';


 interface IBookingContext {
  booking: IBooking;
}

export interface IEditReservation {
  getCustomerById(): void,
  message: string
}

interface editStatus{
  hasBeenEdited: IEditReservation,
  notEdited: IEditReservation
}

export const editedState: editStatus={
  hasBeenEdited: {
    getCustomerById: ()=>{},
    message: 'Har nyligen redigerats'
  },
  notEdited: {
getCustomerById: ()=>{},
message: 'Ej redigerad'
  }
}

export const EditContext = createContext (editedState.notEdited)
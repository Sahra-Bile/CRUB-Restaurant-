import { createContext } from 'react';
import { IBookingsResponse } from '../models/IBooking';

export const AdminBookingsContext = createContext<IBookingsResponse[]>([])

// interface AdminBookingsContext {
//     id: string,
//     name: string,
//     email: string,
//     phone: string
//   }
//   export const edit: AdminBookingsContext = {
//   }
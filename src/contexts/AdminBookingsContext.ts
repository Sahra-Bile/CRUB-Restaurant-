import { createContext } from 'react';
import { IBookingsResponse } from '../models/IBooking';

export const AdminBookingsContext = createContext<IBookingsResponse[]>([])

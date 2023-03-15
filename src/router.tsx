import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import { Menu } from './components/menu/menu'
import { Contact } from './components/section/contact/Contact'
import { Home } from './components/section/home/Home'
import { NotFound } from './components/section/notFound/NotFound'
import { Admin } from './components/admin/admin'
import { Booking } from './components/booking/Booking'
import { ReservationDetails } from './components/admin/reservationDetails/ReservationDetails'
import { EditBooking } from './components/admin/editBooking/EditBooking'
import { Thankyou } from './components/section/thankyou/thankyou'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/booking',
        element: <Booking />,
      },
      {
        path: '/booking/thankyou/:id',
        element: <Thankyou />,
      },

      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: 'bookingdetails/:id',
        element: <ReservationDetails />,
      },
      {
        path: 'edit/:id',
        element: <EditBooking />,
      },
    ],
  },
])

import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import { Booking } from './components/booking/Booking'
import { About } from './components/section/about/About'
import { Contact } from './components/section/contact/Contact'
import { Home } from './components/section/home/Home'
import { NotFound } from './components/section/notFound/NotFound'

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
        path: '/booking',
        element: <Booking />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

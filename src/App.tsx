import './App.scss'
import { NavBar } from './components/section/nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/section/footer/Footer'
import { FloatingNav } from './components/section/floating-nav/FloatingNav'
import { getAllBookings } from './services/handleBookingsAxios'
import { IBookingsResponse } from './models/IBooking'
import { useEffect, useState } from 'react'
import { AdminBookingsContext } from './contexts/AdminBookingsContext'

function App() {
  const [bookings, setBookings] = useState<IBookingsResponse[]>([])

  useEffect(() => {
    const getData = async () => {
      let bookingFromDB = await getAllBookings()
      setBookings(bookingFromDB)
    }
    if (bookings.length > 0) return
    getData()
  })

  return (
    <AdminBookingsContext.Provider value={bookings}>
      <header>
        <NavBar></NavBar>
      </header>

      <main className="App">
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer />
      </footer>
      <FloatingNav />
    </AdminBookingsContext.Provider>
  )
}

export default App

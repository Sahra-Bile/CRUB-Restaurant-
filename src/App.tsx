import './App.scss'
import { NavBar } from './components/section/nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/section/footer/Footer'
import { FloatingNav } from './components/section/floating-nav/FloatingNav'
import { deleteBookingById } from './services/handleBookingsAxios'

export interface IDeleteContext {
  handleDeleteClick(id: string): void
}

function App() {
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Är du säkert att du vill ta bort bokningen?')) {
      deleteBookingById(id)
        .then((res) => {
          alert('Bokningen är bort tagen.')
          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  return (
    // <BookingsContext.Provider value={bookings}>
    <main>
      <header>
        <NavBar></NavBar>
      </header>
      <main className="App">
        <Outlet context={{ handleDeleteClick }}></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
      <FloatingNav />
    </main>
    // </BookingsContext.Provider>
  )
}

export default App

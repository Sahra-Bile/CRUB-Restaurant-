import { useContext, useEffect, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { IBookingsResponse } from '../../../models/IBooking'
import { deleteBookingById } from '../../../services/handleBookingsAxios'
import { AdminBookingsContext } from '../../../contexts/AdminBookingsContext'
import './reservation.scss'
import { Link } from 'react-router-dom'

export const Reservation = () => {
  const [contextBookings, setContextBookings] = useState<IBookingsResponse[]>(
    [],
  )
  const bookings = useContext(AdminBookingsContext)

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Är du säker att du vill ta bort bokningen?')) {
      deleteBookingById(id)
        .then(() => {
          alert('Bokningen är borttagen.')

          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  useEffect(() => {
    //* Sorteringsfunktion så att bokningarna hamnar i datumordning, närmaste bokade datumet med tidigaste sittningen kommer först i listan
    const sortedList = bookings
      .slice(0)
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      )
    if (contextBookings.length > 0) return
    setContextBookings(sortedList)
  }, [bookings, contextBookings.length])

  let html = contextBookings.map((reservation) => {
    return (
      <>
        <div className="big-container__container" key={reservation._id}>
          <p className="big-container__container__icons">
            <MdDateRange />
          </p>
          <span className="big-container__container__info">
            {reservation.date}
          </span>
          <p className="big-container__container__icons">
            <MdAccessTime />
          </p>
          <span className="big-container__container__info">
            {reservation.time}
          </span>
          <p className="big-container__container__icons">
            <BsFillPeopleFill />
          </p>
          <span className="  big-container__container__info">
            {reservation.numberOfGuests}
          </span>

          <div className="  big-container__container__btns">
            <button
              className=" btn primary big-container__container__btns"
              id="delete"
              onClick={() => {
                handleDeleteClick(reservation._id)
              }}
            >
              Ta bort
            </button>
            <Link to={`/bookingdetails/${reservation.customerId}`}>
              <button
                className=" btn primary big-container__container__btns"
                id="inspect"
              >
                Kunddetaljer
              </button>
            </Link>
            <Link to={`/edit/${reservation._id}`}>
              <button
                className=" btn primary big-container__container__btns"
                id="edit"
              >
                Redigera
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  })

  return (
    <section>
      <h1 className="title">Bokningsöversikt</h1>
      <div className="big-container">
        <>{html}</>
      </div>
    </section>
  )
}

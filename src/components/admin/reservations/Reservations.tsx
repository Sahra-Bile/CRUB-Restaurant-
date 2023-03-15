import { useContext, useEffect, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdAccessTime, MdDateRange } from 'react-icons/md'

import { IBookingsResponse } from '../../../models/IBooking'
import { deleteBookingById } from '../../../services/handleBookingsAxios'
import { AdminBookingsContext } from '../../../contexts/AdminBookingsContext'
import './reservation.scss'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Reservation = () => {
  const [contextBookings, setContextBookings] = useState<IBookingsResponse[]>(
    [],
  )
  const bookings = useContext(AdminBookingsContext)

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Är du säkert att du vill ta bort bokningen?')) {
      deleteBookingById(id)
        .then(() => {
          toast('Bokningen är bort tagen.')

          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  useEffect(() => {
    if (contextBookings.length > 0) return
    setContextBookings(bookings)
  })

  let html = contextBookings.map((reservation) => {
    return (
      <>
        <div className="big-container__container" key={reservation._id}>
          <p className="big-container__container__icons">
            <MdDateRange /> {reservation.date}
          </p>
          <p className="big-container__container__icons">
            {' '}
            <MdAccessTime />
            {reservation.time}
          </p>
          <p className="big-container__container__icons">
            <BsFillPeopleFill />
            {reservation.numberOfGuests}
          </p>

          <button
            className="btn primary"
            onClick={() => {
              handleDeleteClick(reservation._id)
            }}
          >
            ta bort
          </button>
          <Link to={`/bookingdetails/${reservation.customerId}`}>
            <button className="btn primary">mer info</button>
          </Link>
          <Link to={`/edit/${reservation._id}`}>
            <button className="btn primary">edit</button>
          </Link>
        </div>
      </>
    )
  })

  return (
    <div className="big-container">
      <>{html}</>
    </div>
  )
}

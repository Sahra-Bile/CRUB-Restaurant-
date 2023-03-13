import { useEffect, useState } from 'react'
import { IBookingsResponse } from '../../../models/IBooking'

import { getAllBookings } from '../../../services/handleBookingsAxios'
import { ReservationDetails } from '../reservationDetails/ReservationDetails'

export const Reservations = () => {
  const [booking, setBooking] = useState<IBookingsResponse[]>([])

  useEffect(() => {
    const getData = async () => {
      let bookingFromDB = await getAllBookings()
      setBooking(bookingFromDB)
    }
    if (booking.length > 0) return
    // } else {
    getData()
  })
  console.log(' denna är längden av bokningslista', booking.length)

  let html = booking.map((reserve) => {
    return (
      <section key={reserve._id}>
        <ReservationDetails booking={reserve}></ReservationDetails>
      </section>
    )
  })

  return (
    <>
      <h1 className="article-title">Hantera bokningar</h1>
      <article className="article">{html}</article>
    </>
  )
}

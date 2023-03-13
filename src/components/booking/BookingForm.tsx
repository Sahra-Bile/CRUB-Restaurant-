import React, { FormEvent, useState } from 'react'
import { createBooking } from '../../services/handleBookingsAxios'

export const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [numPeople, setNumPeople] = useState(1)

  const [phone, setPhone] = useState('')

  //*  Genomför bokning
  const HandleOnSecondSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let booking = {
      restaurantId: '64089b0d76187b915f68e16f',
      date: '2023-03-16',
      time: '19:00',
      numberOfGuests: 4,
      customer: {
        name: 'bile',
        lastname: 'sahra',
        email: 'sahra.123@gmail.com',
        phone: '0976439065',
      },
    }
    setIsLoading(true)
    createBooking(booking).then((resData) => {
      console.log(resData)
      setIsLoading(false)
    })
    console.log(' this is booking', booking)
  }

  return (
    <section className="Booking">
      <h2> boka Bord</h2>
      <div className="container">
        <form onSubmit={HandleOnSecondSubmit}>
          <label htmlFor="date">Datum:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="timeContainer">
            <label htmlFor="numPeople">Antal gäster:</label>
            <input
              type="number"
              id="numPeople"
              value={numPeople}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value >= 1 && value <= 6) {
                  setNumPeople(value)
                }
              }}
              required
              min="1"
              max="6"
            />

            <label htmlFor="time">Tid:</label>
            <input
              type="radio"
              id="timeOne"
              name="time"
              value="18:00"
              checked={time === '18:00'}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="time1">18:00</label>
            <input
              type="radio"
              id="timeTwo"
              name="time"
              value="21:00"
              checked={time === '21:00'}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="timeTwo">21:00</label>
            <label htmlFor="name">Namn:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">efternamn:</label>
            <input
              type="text"
              id="name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label htmlFor="email">E-post:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="phone">Number</label>
            <input
              type="number"
              id="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button className="btn primary" type="submit">
            Boka
          </button>
        </form>
      </div>
    </section>
  )
}

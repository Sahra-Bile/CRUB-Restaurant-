import { useEffect, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { useOutletContext, useParams } from 'react-router-dom'
import { IDeleteContext } from '../../../App'
import { IBookingsResponse } from '../../../models/IBooking'
import { ICustomer } from '../../../models/ICustomer'
import { getCustomerById } from '../../../services/handleBookingsAxios'

import './reservationDetails.scss'

interface IBookingProps {
  booking: IBookingsResponse
}

export const ReservationDetails = (props: IBookingProps) => {
  const { bookingId } = useParams()
  const [customer, setCustomer] = useState<ICustomer>()
  const { handleDeleteClick } = useOutletContext<IDeleteContext>()
  // const booking = props.booking.find((booking) => booking.id === bookingId)

  // async function getCustomerInfo() {
  //   let response = await getCustomerById(props.booking.customerId)
  //   setCustomer(response.data[0])
  //   return response.data
  // }

  // useEffect(() => {
  //   getCustomerInfo()
  // })

  // console.log('customer', customer)
  // if (!props.booking) {
  //   return <div>Booking not found</div>
  // }

  return (
    <>
      <section className="article__flex">
        <div className="article__flex__items">
          <p className="article__flex__items__info">
            {' '}
            <MdDateRange className="icons" />
            {props.booking.date}
          </p>
          <p className="article__flex__items__info">
            {' '}
            <MdAccessTime className="icons" />
            {props.booking.time}
          </p>
          <p className="article__flex__items__info">
            <BsFillPeopleFill className="icons" />
            {props.booking.numberOfGuests}
          </p>
          {/* 
          <div className="customerInfo">
            <p>{customer?.lastname}</p>
            <p>{customer?.email}</p>
            <p>{customer?.phone}</p>
          </div> */}

          <button
            className="btn primary"
            onClick={() => {
              handleDeleteClick(props.booking._id)
            }}
          >
            {' '}
            ta bort bokning
          </button>
        </div>
      </section>
    </>
  )
}

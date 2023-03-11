import { BsFillPeopleFill } from 'react-icons/bs'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { useOutletContext } from 'react-router-dom'
import { IDeleteContext } from '../../../App'
import { IBookingsResponse } from '../../../models/IBooking'
import { IEditContext } from '../editBooking/EditBooking'
import './reservationDetails.scss'

interface IBookingProps {
  booking: IBookingsResponse
}

export const ReservationDetails = (props: IBookingProps) => {
  const { handleDeleteClick } = useOutletContext<IDeleteContext>()
  const { HandleOnSubmit } = useOutletContext<IEditContext>()

  return (
    <>
      <section className="article__flex">
        <div className="article__flex__items">
          <p className="article__flex__items__info">
            {' '}
            <MdDateRange className="icons" /> {props.booking.date}
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
          <button
            className="btn primary"
            onClick={() => {
              handleDeleteClick(props.booking._id)
            }}
          >
            {' '}
            delete bokning
          </button>
        </div>
      </section>
    </>
  )
}

import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminBookingsContext } from '../../../contexts/AdminBookingsContext'
import CustomerProvider from '../../../contexts/CustomerContext'
import { IBookingsResponse } from '../../../models/IBooking'
import { ICustomer } from '../../../models/ICustomer'
import { getCustomerById } from '../../../services/handleBookingsAxios'


export const ReservationDetails = () => {
  const [contextBookings, setContextBookings] = useState<IBookingsResponse[]>(
    [],
  )

  const { customerId } = useParams()

  const [customer, setCustomer] = useState<ICustomer>()

  const bookings = useContext(AdminBookingsContext)

  const booking = bookings.find((booking) => booking._id === customerId)

  const navigate = useNavigate




  useEffect(() => {
    async function getCustomerData(id: string) {
      let response = await getCustomerById(id)

      setCustomer(response)
      return response.data
    }
    setContextBookings([]);

    // getCustomerData()
  }, [booking?.customerId])

  console.log(' är inte tomt', customer)

  let detailsHtml = contextBookings.map((customer) => {
    return (
      <div className='container-div' key={customer._id}>
        <p className='container-div'>{customer.date}</p>
        <p>{customer.time}</p>

      </div >
    )
  })


  return (
    <>
      <CustomerProvider>
        <h3>Kunddetaljer</h3>
        <p>Förnamn: {customer?.name} </p>
        <p>Efternamn: {customer?.lastname} </p>
        <p>E-post: {customer?.email}</p>
        <p>Telefon: {customer?.phone}</p>
      </CustomerProvider>
    </>
  )
}

import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminBookingsContext } from '../../../contexts/AdminBookingsContext'
import { ICustomer } from '../../../models/ICustomer'
import { getCustomerById } from '../../../services/handleBookingsAxios'

export const ReservationDetails = () => {
  const navigate = useNavigate()

  const { bookingId } = useParams()

  const [customer, setCustomer] = useState<ICustomer>()

  const bookings = useContext(AdminBookingsContext)

  const booking = bookings.find((booking) => booking._id === bookingId)

  useEffect(() => {
    async function getCustomerData(id: string) {
      let response = await getCustomerById(id)

      setCustomer(response)
      return response.data
    }
    // getCustomerData()
  }, [booking?.customerId])

  console.log(' är inte tomt', customer)
  return (
    <>
      <h3>Kunddetaljer</h3>
      <p>Förnamn: {customer?.name} </p>
      <p>Efternamn: {customer?.lastname} </p>
      <p>E-post: {customer?.email}</p>
      <p>Telefon: {customer?.phone}</p>
    </>
  )
}

import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
  bookingsDefaultValue,
  IBookingsResponse,
  IBookingUpdate,
} from '../../../models/IBooking'
import { checkAvailableTables, ISittings } from '../../../services/conditional'
import {
  editBookingById,
  getBookingById,
} from '../../../services/handleBookingsAxios'

export const EditBooking = () => {
  const [existingBooking, setExistingBooking] = useState<IBookingsResponse>(
    bookingsDefaultValue,
  )

  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: true,
    theSecondSitting: true,
  })
  const [isLoading, setIsLoading] = useState(false)

  let { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm()

  //* steg 1 hämta booking by id

  useEffect(() => {
    const getData = async () => {
      if (id) {
        let bookingIdFromApi = await getBookingById(id)
        if (bookingIdFromApi.length > 0) {
          setExistingBooking(bookingIdFromApi[0])
        }
      }
    }

    console.log('Getting booking')
    if (existingBooking._id !== '') return

    getData()
  }, [existingBooking._id, id])

  //* steg 2 sätter defaultvärde i formuläret enligt existerande bokning

  useEffect(() => {
    if (!existingBooking) return

    if (existingBooking.numberOfGuests !== 0 && existingBooking.time !== '') {
      reset({
        date: new Date(existingBooking.date),
        time: existingBooking.time,
        numberOfGuests: existingBooking.numberOfGuests,
        customerId: existingBooking.customerId,
      })
    }
    console.log('Setting loading')

    setIsLoading(false)
  }, [existingBooking, reset])

  //*  steg 3 Sparar nya  bokning med eventuella ändringar

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)

    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableTables(
        data.date,
        data.numberOfGuests,
      )

      if (
        (data.time === '12:00' && isAvailableinDB.theFirstSitting === true) ||
        (data.time === '19:00' && isAvailableinDB.theFirstSitting === true)
      ) {
        console.log(data)

        let newBooking: IBookingUpdate = {
          id: id!,
          restaurantId: '64089b0d76187b915f68e16f',
          date: data.date.toLocaleDateString(),
          time: data.time,
          numberOfGuests: Number(data.numberOfGuests),
          customerId: data.customerId,
        }
        if (id)
          await editBookingById(id, newBooking)
            .then(() => {
              alert('uppdatatering lyckades.')

              window.location.href = '/admin'
            })
            .catch((err) => {
              console.log(err.message)
            })
      } else {
        setIsAvailable(isAvailableinDB)
        setIsLoading(false)
      }
    }
    checkAvailable()
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bookingform">
          <div>
            <label>Välj datum:</label>
            <div>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange } }) => (
                  <Calendar
                    onChange={onChange}
                    maxDate={new Date('2023-12-31')}
                    defaultValue={new Date(existingBooking.date)}
                  />
                )}
              />
            </div>
            {errors.date && <p>Välj ett datum:</p>}
            <label>Antal personer:</label>
            <select
              className="select"
              {...register('numberOfGuests', {
                min: 1,
                max: 12,
              })}
              defaultValue={existingBooking.numberOfGuests}
            >
              <option disabled value={0}>
                0
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
            {errors.numberOfGuests && <p>Välj antal person</p>}
            <label>SittingsTid:</label>
            <select {...register('time')} defaultValue={existingBooking.time}>
              <option value="12:00"> kl.12.00</option>
              <option value="19:00">kl. 19.00</option>
            </select>
            {errors.time && <p>Välj en tid:</p>}

            <input
              type="hidden"
              value={existingBooking.customerId}
              {...register('customerId', {})}
            />

            <button type="submit" className="btn primary">
              uppdatera bokningen
            </button>

            {isAvailable.theFirstSitting ? (
              <></>
            ) : (
              <p>Tiden du har valt är inte tillgänglig </p>
            )}
            {isAvailable.theSecondSitting ? (
              <></>
            ) : (
              <p>Tiden du har valt är inte tillgänglig</p>
            )}
          </div>
        </form>
      )}
    </>
  )
}

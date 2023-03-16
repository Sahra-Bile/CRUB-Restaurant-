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

import './editBooking.scss'

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

  //* steg 1: hämta bokning med hjälp av id
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

  //* steg 2: sätter standardvärde i formuläret enligt existerande bokning
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

  //*  steg 3: Sparar nya  bokningar med eventuella ändringar
  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)

    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableTables(
        data.date,
        data.numberOfGuests,
      )

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
            alert('Bokningen uppdaterades.')

            window.location.href = '/admin'
          })
          .catch((err) => {
            console.log(err.message)
          })
      setIsAvailable(isAvailableinDB)
      setIsLoading(false)
    }
    checkAvailable()
  }

  return (
    <>
      {isLoading ? (
        <div className="isLoading"></div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bookingform">
          <div className="bookingform__container">
            <h1 className="bookingform__container__title">Redigera bokning</h1>
            <label className="smaller-title bookingform__container__header">
              Välj datum:
            </label>
            <div className="bookingform__container__calendar">
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
            <div className="bookingform__container__curtainContainer">
              <label className="smaller-title">Antal personer:</label>
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
              <label className="smaller-title">Sittning:</label>
              <select
                className="select"
                {...register('time')}
                defaultValue={existingBooking.time}
              >
                <option value="12:00"> kl.12.00</option>
                <option value="19:00">kl. 19.00</option>
              </select>
            </div>
            {errors.time && <p>Välj en tid:</p>}

            <input
              type="hidden"
              value={existingBooking.customerId}
              {...register('customerId', {})}
            />
            <div className="bookingform__btnContainer">
              <button type="submit" className=" btn  primary " id="button">
                Uppdatera bokningen
              </button>
            </div>

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

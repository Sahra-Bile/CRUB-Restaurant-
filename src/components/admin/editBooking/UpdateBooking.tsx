import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bookingsDefaultValues, IBooking } from '../../../models/IBooking'
import { checkAvailableTables, ISittings } from '../../../services/conditional'
import {
  editBookingById,
  getBookingById,
} from '../../../services/handleBookingsAxios'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import Calendar from 'react-calendar'

export const UpdateBooking = () => {
  const [existingBooking, setExistingBooking] = useState<IBooking>(
    bookingsDefaultValues,
  )
  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: true,
    theSecondSitting: true,
  })
  const [isLoading, setIsLoading] = useState(true)

  let params = useParams()

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = useForm()

  //Hämtar bokning
  useEffect(() => {
    const getBooking = async () => {
      await getBookingById(params.id!).then((booking) => {
        setExistingBooking(booking.data)
      })
    }
    getBooking()
  }, [params.id])

  // sätter defaultvärde i formuläret enligt existerande bokning
  useEffect(() => {
    if (
      existingBooking.numberOfGuests !== 0 &&
      existingBooking.sittingTime !== 0
    ) {
      reset({
        date: new Date(existingBooking.date),
        sittingTime: existingBooking.sittingTime,
        numberOfPeple: existingBooking.numberOfGuests,
      })
      setIsLoading(false)
    }
  }, [existingBooking, reset])

  // Sparar ny bokning med eventuella ändringar
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    let isTheSame: boolean = false
    const checkAvailable = async () => {
      //kollar om bokningen har samma datum och sittning
      if (
        new Date(existingBooking.date).getTime() ===
        new Date(data.date).getTime()
      ) {
        isTheSame = true
      }

      const isAvailableinDB = await checkAvailableTables(
        isTheSame,
        data.date as Date,
        data.numberOfPeople as number,
      )

      if (
        (data.sittingTime === 1 && isAvailableinDB.theFirstSitting === true) ||
        (data.sittingTime === 2 && isAvailableinDB.theSecondSitting === true)
      ) {
        let newBooking: IBooking = {
          date: data.date,
          sittingTime: data.sittingTime,
          numberOfGuests: data.numberOfGuests,
        }
        editBookingById(params.id!, newBooking)
          .then(() => {})
          .catch((e) => {
            console.log(e)
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
        <form onSubmit={onSubmit}>
          <div>
            <label>Choose a date</label>
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

            {errors.date && <p>Pick a date &#11105;</p>}

            <label>Number of people</label>
            <select
              {...register('numberOfPeople', {
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
            {errors.numberOfGuests && <p>Pick number of people &#11105;</p>}
            <label>Sitting time:</label>
            <select
              className="updateSitting"
              {...register('sittingTime')}
              defaultValue={existingBooking.sittingTime}
            >
              <option value={1}>6.00 pm</option>
              <option value={2}>9.00 pm</option>
            </select>
            {errors.sittingTime && <p>Choose a sitting time &#11105;</p>}

            <input
              type="submit"
              value={'Update booking'}
              className="updateBooking"
            />
            {isAvailable.theFirstSitting ? (
              <></>
            ) : (
              <p>The time you have chosen is not available</p>
            )}
            {isAvailable.theSecondSitting ? (
              <></>
            ) : (
              <p>The time you have chosen is not available</p>
            )}
          </div>
        </form>
      )}
    </>
  )
}

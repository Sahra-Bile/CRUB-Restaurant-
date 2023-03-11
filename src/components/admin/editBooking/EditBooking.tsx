import React, { FormEvent, useEffect, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { Outlet, useParams } from 'react-router-dom'
import { bookingsDefaultValues, IBooking } from '../../../models/IBooking'
import { checkAvailableTables, ISittings } from '../../../services/conditional'
import {
  editBookingById,
  getBookingById,
} from '../../../services/handleBookingsAxios'

export interface IEditContext {
  HandleOnSubmit(id: string): void
}

export const EditBooking = () => {
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
    reset,
    formState: { errors },
  } = useForm()

  //*Hämtar bokning dock vi hämtar den när man klickar knappen redigera
  useEffect(() => {
    const getBooking = async () => {
      await getBookingById(params.id!).then((booking) => {
        setExistingBooking(booking.data)
      })
    }
    getBooking()
  }, [params.id])

  //* sätter defaultvärde i formuläret enligt existerande bokning
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

  //* Sparar ny bokning med eventuella ändringar
  const HandleOnSubmit = (data: FieldValues, e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    let isTheSame: boolean = false
    const checkAvailable = async () => {
      //*ollar om bokningen har samma datum och sittning
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
    <section>
      <Outlet context={{ HandleOnSubmit }}></Outlet>
    </section>
  )
}

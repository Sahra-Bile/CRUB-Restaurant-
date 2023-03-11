import React from 'react'
import { useForm } from 'react-hook-form'
import { createBooking } from '../../services/handleBookingsAxios'

interface IDateProps {
  setIsLoading: any
  step: any
  sitting: any
}

export const BookingForm = (props: IDateProps) => {
  const {
    handleSubmit,
    watch,
    register,

    formState: { errors },
  } = useForm()

  const [date, numberOfPeople] = watch(['date', 'numberOfPeople'])

  //*  Genomför bokning
  const HandleOnSecondSubmit = async () => {
    let booking = {
      restaurantId: '64089b0d76187b915f68e16f',
      date: '',
      time: '',
      numberOfGuests: 0,
      customer: {
        name: '',
        lastname: '',
        email: '',
        phone: '',
      },
    }
    props.setIsLoading(true)
    createBooking(booking).then((resData) => {
      console.log(resData)
      props.setIsLoading(false)
    })
    console.log(' this is booking', booking)
  }

  // console.log('detta är om det är öppet', open)
  // console.log('detta är om olika steg alla tre steg ', step)
  // console.log('detta är om sittings är lediga ', isAvailable)
  // console.log(' detta är  olika sittings vi har 1 och 2 ', sitting)

  return (
    <>
      {props.step === 3 && (
        <>
          <h2>Din information</h2>
          <div>
            <p>
              Din sökning: <br />
              {date.toLocaleDateString()} <br />
              {props.sitting === 1 ? 'kl.12.00 ' : 'kl. 19.00'}
              <br />
              {numberOfPeople} personer
            </p>
          </div>

          <form className="form2" onSubmit={handleSubmit(HandleOnSecondSubmit)}>
            <div>
              <label>Namn:</label>
              <input
                className="name"
                {...register('name', {
                  required: true,
                  minLength: 1,
                  maxLength: 30,
                })}
                type="text"
              />{' '}
              {errors.name && <p>ditt namn &#11105;</p>}
              <label>Email:</label>
              <input
                className="email"
                {...register('email', {
                  required: true,
                })}
                type="email"
              />
              {errors.email && <p>ditt email &#11105;</p>}
              <label>Phone number:</label>
              <input
                type="number"
                className="phone"
                {...register('phone', {
                  required: true,
                  minLength: 10,
                  maxLength: 12,
                })}
              />
              {errors.phone && <p>ditt telefon number &#11105;</p>}
            </div>
            <button type="submit" className="btn primary">
              boka
            </button>
          </form>
        </>
      )}
    </>
  )
}

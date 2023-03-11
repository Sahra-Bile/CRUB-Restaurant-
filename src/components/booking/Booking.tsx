import React, { FormEvent, useState } from 'react'

import { checkAvailableTables, ISittings } from '../../services/conditional'
import { Controller, useForm } from 'react-hook-form'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { createBooking } from '../../services/handleBookingsAxios'

export const Booking = () => {
  const [step, setStep] = useState(1) //! kolla fas sökning
  const [isLoading, setIsLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: false,
    theSecondSitting: false,
  })
  const [sitting, setSitting] = useState(0)
  const [open, setOpen] = useState(false)

  const {
    control,
    watch,
    register,

    formState: { errors },
  } = useForm()

  const [date, numberOfPeople] = watch(['date', 'numberOfPeople'])

  //* Kontrollerar valt datum och sittning i Databasen
  const HandleOnFirstSubmit = (data: any) => {
    setIsLoading(true)
    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableTables(
        false,
        data.date,
        data.numberOfPeople,
      )
      setIsAvailable(isAvailableinDB)
    }
    checkAvailable()
    setStep(2)
    setIsLoading(false) // borde vara false
  }

  //*  Genomför bokning
  const HandleOnSecondSubmit = async (e: FormEvent) => {
    e.preventDefault()
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
    setIsLoading(true)
    createBooking(booking).then((resData) => {
      console.log(resData)
      setIsLoading(false)
      console.log(' this is booking', booking)
    })
  }

  console.log('detta är om det är öppet', open)
  console.log('detta är om olika steg alla tre steg ', step)
  console.log('detta är om sittings är lediga ', isAvailable)
  console.log(' detta är  olika sittings vi har 1 och 2 ', sitting)
  return (
    <section className="section">
      {isLoading ? (
        <div></div>
      ) : (
        <div className=" container__fas">
          {step === 1 && (
            <>
              <h2 className="text">Boka Bord</h2>
              <form onSubmit={HandleOnFirstSubmit}>
                <div className="labeldiv">
                  <label>Välj ett datum!</label>
                  <div>
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                        <Calendar
                          onChange={onChange}
                          minDate={new Date()}
                          maxDate={new Date('2023-12-31')}
                        />
                      )}
                    />
                  </div>{' '}
                  {errors.date && <p> Välj ett datum! &#11105;</p>}
                  <label>Antal personer</label>
                  <select
                    {...register('numberOfPeople', {
                      required: true,
                      min: 1,
                      max: 12,
                    })}
                    defaultValue="0"
                  >
                    <option disabled value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="7+">7+</option>
                  </select>
                  {errors.numberOfPeople && <span>Välj antal personer!</span>}
                  <div className="info">
                    <p>
                      Max per bord: 6 <br />
                      Om bokningen gäller fler än sex personer kommer sällskapet
                      att delas upp på flera bord.
                    </p>
                  </div>
                  <input
                    type="submit"
                    value={'Kontrollera tillgänglighet'}
                    className=" btn primary"
                  />
                </div>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="h2">Tillgängliga sittningar!</h2>

              <div>
                <p>
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {numberOfPeople} personer
                </p>
              </div>
              <div>
                {isAvailable.theFirstSitting ? (
                  <button
                    onClick={() => {
                      setSitting(1)
                      setStep(3)
                    }}
                  >
                    Book kl. 09:00
                  </button>
                ) : (
                  <p> Första sittningen är inte tillgänglig</p>
                )}

                {isAvailable.theSecondSitting ? (
                  <button
                    onClick={() => {
                      setSitting(2)
                      setStep(3)
                    }}
                  >
                    Book kl. 19.00
                  </button>
                ) : (
                  <span>Andra sittningen är inte tillgängligt</span>
                )}
                <button className="btn primary" onClick={() => setStep(3)}>
                  gå vidare
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Din information</h2>
              <div>
                <p>
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {sitting === 1 ? 'kl.12.00 ' : 'kl. 19.00'}
                  <br />
                  {numberOfPeople} personer
                </p>
              </div>

              <form onSubmit={HandleOnSecondSubmit}>
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
                <button className="btn primary" type="submit">
                  skicka iväg
                </button>
              </form>
            </>
          )}
          <div>
            {/* Här behövs en funktionalitet för att skicka iväg bokningen till databasen */}

            <button className="btn primary" onClick={() => setStep(1)}>
              Börja om sökningen
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

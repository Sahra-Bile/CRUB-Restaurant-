import React, { useState } from 'react'
import { checkAvailableTables, ISittings } from '../../services/conditional'
import { Controller, useForm } from 'react-hook-form'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { createBooking } from '../../services/handleBookingsAxios'
<<<<<<< HEAD
// import { ok } from 'assert'
// import { Link } from 'react-router-dom'
=======
import './booking.scss'
>>>>>>> feature-admin

export const Booking = () => {
  const [step, setStep] = useState(1) //! kolla fas sökning
  const [isLoading, setIsLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: false,
    theSecondSitting: false,
  })
  const [sitting, setSitting] = useState(0)
  const [time, setTime] = useState('')

  const {
    handleSubmit,
    control,
    watch,
    register,

    formState: { errors },
  } = useForm()

  const [date, numberOfGuests, name, lastname, email, phone] = watch([
    'date',
    'numberOfGuests',
    'name',
    'lastname',
    'email',
    'phone',
  ])

  const HandleOnFirstSubmit = () => {
    setIsLoading(true)

    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableTables(
        date.toLocaleDateString(),
        numberOfGuests,
      )
      console.log('Available', isAvailableinDB)

      setIsAvailable(isAvailableinDB)
    }
    checkAvailable()
    setStep(2)
    setIsLoading(false) // borde vara false
  }
  //*  Genomför bokning
  const HandleOnSecondSubmit = async () => {
    let booking = {
      restaurantId: '64089b0d76187b915f68e16f',
      date: date.toLocaleDateString(),
      time: time,
      numberOfGuests: Number(numberOfGuests),
      customer: {
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        id: '',
      },
    }
    setIsLoading(true)
    createBooking(booking).then((resData) => {
      console.log(resData)
      setIsLoading(false)
    })
    console.log(' this is booking', booking)
    console.log(' this is booking', booking.customer.id)
  }

  return (
    <section className=" big-container">
      {isLoading ? (
        <div className="loadingDiv"></div>
      ) : (
        <div className="big-container__step">
          {step === 1 && (
            <>
              <h2 className="big-container__step__text">Boka Bord</h2>
              <form
                className="big-container__step__form1"
                onSubmit={handleSubmit(HandleOnFirstSubmit)}
              >
                <div className="big-container__step__form1__container1">
                  <label className="label">Välj ett datum:</label>
                  <div className="big-container__step__form1__container1__calender-div">
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                        <Calendar
                          className="calender"
                          onChange={onChange}
                          minDate={new Date()}
                          maxDate={new Date('2023-12-31')}
                        />
                      )}
                    />
                  </div>{' '}
                  {errors.date && <p className="error"> Välj ett datum:</p>}
                  <label className="label">Antal personer</label>
                  <select
                    className="select"
                    {...register('numberOfGuests', {
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
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {errors.numberOfGuests && (
                    <span className="error">Välj antal personer:</span>
                  )}
                  <div className="info">
                    <p className="info__p">
                      Max per bord: 6 <br />
                      Om bokningen gäller fler än sex personer <br /> kommer
                      sällskapet att delas upp på flera bord.
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
              <h2 className="Tillgängliga">Tillgängliga sittningar:</h2>

              <div>
                <p className="search">
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {numberOfGuests} personer
                </p>
              </div>
              <div>
                {isAvailable.theFirstSitting ? (
                  <button
                    className="book btn primary"
                    onClick={() => {
                      setSitting(1)
                      setStep(3)
                      setTime('12:00')
                    }}
                  >
                    Boka kl. 12:00
                  </button>
                ) : (
                  <p className="search">
                    {' '}
                    Första sittningen är inte tillgänglig
                  </p>
                )}

                {isAvailable.theSecondSitting ? (
                  <button
                    className="book btn primary"
                    onClick={() => {
                      setSitting(2)
                      setStep(3)
                      setTime('19:00')
                    }}
                  >
                    Boka kl. 19.00
                  </button>
                ) : (
                  <span className="search">
                    Andra sittningen är inte tillgänglig
                  </span>
                )}
              </div>
              <div>
                <button className="btn primary" onClick={() => setStep(1)}>
                  Börja om sökningen
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Din information:</h2>
              <div className="search">
                <p>
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {sitting === 1 ? '12.00 ' : '19.00 '}
                  <br />
                  {numberOfGuests} personer
                </p>
              </div>

              <form
                className="form2"
                onSubmit={handleSubmit(HandleOnSecondSubmit)}
              >
                <div className="form2__container2">
                  <label>Förnamn:</label>
                  <input
                    className="form2__container2__input"
                    required
                    {...register('name', {
                      required: true,
                      minLength: 1,
                      maxLength: 30,
                    })}
                    type="text"
                  />{' '}
                  {errors.name && (
                    <p className="error"> Skriv ditt Förnamn &#11105;</p>
                  )}
                  <label>Efternamn:</label>
                  <input
                    className="form2__container2__input"
                    required
                    {...register('lastname', {
                      required: true,
                      minLength: 1,
                      maxLength: 30,
                    })}
                    type="text"
                  />{' '}
                  {errors.name && (
                    <p className="error"> Skriv ditt Efternamn &#11105;</p>
                  )}
                  <label>E-post:</label>
                  <input
                    required
                    className="form2__container2__input"
                    value={email}
                    {...register('email', {
                      required: true,
                    })}
                    type="email"
                  />
                  {errors.email && (
                    <p className="error"> Skriv ditt e-post &#11105;</p>
                  )}
                  <label>Telefonnummer:</label>
                  <input
                    type="number"
                    value={phone}
                    className="form2__container2__input"
                    required
                    {...register('phone', {
                      required: true,
                      minLength: 10,
                      maxLength: 12,
                    })}
                  />
                  {errors.phone && (
                    <p className="error"> Skriv ditt telefon number &#11105;</p>
                  )}
                  <button
                    type="submit"
                    value={'book'}
                    className=" form2__container2__send "
                  >
                    {' '}
                    Boka
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </section>
  )
}

import React, { useState } from 'react'

import { checkAvailableTables, ISittings } from '../../services/conditional'
import { Controller, useForm } from 'react-hook-form'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import './booking.scss'
import { BookingForm } from './BookingForm'

export const Booking = () => {
  const [step, setStep] = useState(1) //! kolla fas sökning
  const [isLoading, setIsLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: true,
    theSecondSitting: false,
  })
  const [sitting, setSitting] = useState(0)
  const [open, setOpen] = useState(false)

  //* handleSubmit är fron react useForm hook länk här
  //*https://react-hook-form.com/api/useform/handlesubmit/
  const {
    handleSubmit,
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

  return (
    <section className="container big-container">
      {isLoading ? (
        <div className="big-container__loadingDiv"></div>
      ) : (
        <div className=" big-container__step">
          {step === 1 && (
            <>
              <h2 className="big-container__step__text">Boka Bord</h2>
              <form
                className=" big-container__step__form1"
                onSubmit={handleSubmit(HandleOnFirstSubmit)}
              >
                <div className="big-container__step__form1__container">
                  <label className="label">Välj ett datum!</label>
                  <div className="calender-div">
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
                  {errors.date && <p className="error"> Välj ett datum</p>}
                  <label>Antal personer</label>
                  <select
                    className="select"
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
                  {errors.numberOfPeople && (
                    <span className="error">Välj antal personer!</span>
                  )}
                  <div className="info">
                    <p className="info__p">
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
              <h2 className="Tillgängliga">Tillgängliga sittningar!</h2>

              <div>
                <p className="serach">
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {numberOfPeople} personer
                </p>
              </div>
              <div>
                {isAvailable.theFirstSitting ? (
                  <button
                    className="book btn primary"
                    onClick={() => {
                      setSitting(1)
                      setStep(3)
                    }}
                  >
                    Boka kl. 12:00
                  </button>
                ) : (
                  <p className="serach">
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
                    }}
                  >
                    Boka kl. 19.00
                  </button>
                ) : (
                  <span className="serach">
                    Andra sittningen är inte tillgängligt
                  </span>
                )}
              </div>
            </>
          )}
          <div>
            <button className="btn primary" onClick={() => setStep(1)}>
              Börja om sökningen
            </button>
          </div>
        </div>
      )}
      <BookingForm setIsLoading={setIsLoading} step={step} sitting={sitting} />
    </section>
  )
}

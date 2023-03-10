import React from 'react'

interface IbookingsfunctionProps {}

export const BookingForm = (props: IbookingsfunctionProps) => {
  return (
    <section>
      {/* {state === 3 && (
            <>
              <h2>Din information</h2>
              <div>
                <p>
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {sitting === 1 ? '6.00 pm' : '9.00 pm'}
                  <br />
                  {numberOfPeople} personer
                </p>
              </div>

              <form onSubmit={handleSubmit(HandlarOnSecondSubmit)}>
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
                  {errors.phone && <p>ditt number &#11105;</p>}
                  <div >
                      <label>
                        <p >Accept our&nbsp;</p>
                        <p
                          onClick={() => setOpen(true)}
                          className="openmodal"
                        >   {' '}
                        GDPR policy</p>
                        <input
                          className="checkbox"
                          type="checkbox"
                          {...register('checkbox', {
                            required: true,
                            minLength: 9,
                            maxLength: 12,
                          })}
                        />
                      </label>
                   </div>

                   </div>
                    {errors.checkbox && (
                      <p
                       
                      >
                        Accept the terms to continue &#11105;
                      </p>
                    )}
                    <p onClick={() => setOpen(false)}
                      
                    
                    ></p>
                    <Input type="submit" value={'book'} className="book" />
                  </div>
              </form>
            </>
          )}
          <div>
            <button className="btn primary" onClick={() => setState(1)}>
              Börja om sökningen
            </button>
          </div>
        </div>
    </section> */}
    </section>
  )
}

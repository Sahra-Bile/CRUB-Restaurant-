import { Outlet } from 'react-router-dom'

export const EditBooking = () => {
  //*Hämtar bokning dock vi hämtar den när man klickar knappen redigera

  //* sätter defaultvärde i formuläret enligt existerande bokning

  //* Sparar ny bokning med eventuella ändringar

  return (
    <section>
      <Outlet></Outlet>
    </section>
  )
}


import { getAllBookings } from './handleBookingsAxios';

export interface ISittings {
  theFirstSitting: boolean;
  theSecondSitting: boolean;
}

export const checkAvailableTables = async (
 date: Date,
  numberOfGuests: number,
) => {

  let isAvailable: ISittings = {
    theFirstSitting: true,
    theSecondSitting: true,
  };

  let response = await getAllBookings();
  let tablesAtLunch: number = 0;
  let tablesAtDinner: number = 0;
 
//** Får listan med totala bokingar
  for (let i = 0; i < response.length; i++) {

    let databaseDate = new Date(response[i].date);
    let inComingDate  = new Date(date)

    if (databaseDate.getDate() === inComingDate.getDate()) {

    if (databaseDate.getTime() === inComingDate.getTime()) {
     //* Kontrollerat vilka tillgängliga sittningar som matchar önskat datum

  
       //* Kontrollerar sittning 1:
       if (response[i].time === '12:00') {
        tablesAtLunch = tablesAtLunch + 1;
        if (response[i].numberOfGuests > 6) {
          tablesAtLunch = tablesAtLunch + 1;
        }
      }
       //* Kontrollerar sittning 2
       if (response[i].time === '19:00') {
        tablesAtDinner = tablesAtDinner + 1;
        if (response[i].numberOfGuests > 6) {
          tablesAtDinner = tablesAtDinner + 1;
        }
      }
  }
  }
  
  const numberOfTablesForCurrentBooking = Math.ceil(numberOfGuests / 6);

        //* Villkor om användaren bokar för fler än 6 personer 
        if (tablesAtLunch + numberOfTablesForCurrentBooking <= 15) {
          
            isAvailable.theFirstSitting = true;
          } else {
            isAvailable.theFirstSitting = false;
          }
          
          //* Villkor om användaren bokar för mindre än 6 personer
      
        if (tablesAtDinner + numberOfTablesForCurrentBooking <= 15) {
         
            isAvailable.theSecondSitting = true;
          } else {
            isAvailable.theSecondSitting = false;
          }
        }

        //* Konsolloggar hur många bord som bokats detta datum:
        console.log("Tables at lunch:", tablesAtLunch);
        console.log("Tables at dinner:", tablesAtDinner);
        
    return isAvailable;
  }

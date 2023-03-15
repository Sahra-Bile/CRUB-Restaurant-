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
 

  for (let i = 0; i < response.length; i++) {
    //** */ får listan med totala bokingar
    let databaseDate:any = new Date(response[i].date);
    let inComingDate:any = new Date(date)

    if (databaseDate.getDate() === inComingDate.getDate()) {

    if (databaseDate.getTime() === inComingDate.getTime()) {
      
       console.log(" is?", inComingDate)
      //* kollat vilka som matchar önskat datum

  
       //* Kontroller  första Sittning  1:
       if (response[i].time === '12:00') {
        tablesAtLunch = tablesAtLunch + 1;
        if (response[i].numberOfGuests > 6) {
          tablesAtLunch = tablesAtLunch + 1;
        }
      }
       //* Sittning 2
       if (response[i].time === '19:00') {
        tablesAtDinner = tablesAtDinner + 1;
        if (response[i].numberOfGuests > 6) {
          tablesAtDinner = tablesAtDinner + 1;
        }
      }
         
         
  }
  }

  console.log("Tables at lunch:", tablesAtLunch);
  console.log("Tables at dinner:", tablesAtDinner);
  
  const numberOfTablesForCurrentBooking = Math.ceil(numberOfGuests / 6);

        //*om användaren bokar för fler än 6 personer
        if (tablesAtLunch + numberOfTablesForCurrentBooking <= 15) {
          
            isAvailable.theFirstSitting = true;
          } else {
            isAvailable.theFirstSitting = false;
          }
          
          //*om användaren bokar för mindre än 6 personer
      
        if (tablesAtDinner + numberOfTablesForCurrentBooking <= 15) {
         
            isAvailable.theSecondSitting = true;
          } else {
            isAvailable.theSecondSitting = false;
          }
          //*om användaren bokar för mindre än 6 personer
      
        }

        console.log(isAvailable)

    return isAvailable;

   
  }
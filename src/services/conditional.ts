import { getAllBookings } from './handleBookingsAxios';


export interface ISittings {
  theFirstSitting: boolean;
  theSecondSitting: boolean;
}


export const checkAvailableTables = async (
 
  // isTheSameSitting : boolean,
  date: Date,
  numberOfGuests: number,
) => {

  let isAvailable: ISittings = {
    theFirstSitting: true,
    theSecondSitting: true,
  };

  let response = await getAllBookings();
  let tablesInRestaurant: number = 0;
  let tablesInRestaurant2: number = 0;
  // if (isTheSameSitting && numberOfGuests > 6) {
  //   tablesInRestaurant = tablesInRestaurant - 1;
  // }

  for (let i = 0; i < response.length; i++) {
    //** */ får listan med totala bokingar
    let databaseDate = new Date(response[i].date);
    let inComingDate = new Date(date)

    if (databaseDate.getTime() === inComingDate.getTime()) {
       console.log(" vad är du?", inComingDate)
      //* kollat vilka som matchar önskat datum

       //* Kontroller  första Sittning  + 1:
       if (response[i].time === '12:00') {
        tablesInRestaurant = tablesInRestaurant + 1;
        if (response[i].numberOfGuests > 6) {
          tablesInRestaurant = tablesInRestaurant + 1;
        }

        //*om användaren bokar för fler än 6 personer
        if (numberOfGuests > 6) {
          if (tablesInRestaurant >= 14) {
            isAvailable.theFirstSitting = false;
          } else {
            isAvailable.theFirstSitting = true;
          }
          //*om användaren bokar för mindre än 6 personer
        } else {
          if (tablesInRestaurant >= 15) {
            isAvailable.theFirstSitting = false;
          } else {
            isAvailable.theFirstSitting = true;
          }
        }
      }

       //* Sittning 2
       if (response[i].time === '19:00') {
        tablesInRestaurant2 = tablesInRestaurant2 + 1;
        if (response[i].numberOfGuests > 6) {
          tablesInRestaurant2 = tablesInRestaurant2 + 1;
        }

         //* om användaren bokar för fler än 6 personer
         if (numberOfGuests > 6) {
          if (tablesInRestaurant2 >= 14) {
            isAvailable.theSecondSitting = false;
          } else {
            isAvailable.theSecondSitting = true;
          }
        }
          //* om användaren bokar för mindre än 6 personer
        } 
        
        // else 
        // {
        //   if (tablesInRestaurant >= 15) {
        //     isAvailable.theFirstSitting = false;
        //   } else {
        //     isAvailable.theFirstSitting = true;
        //   }
        // }
      }
    }

     console.log(' denna är 1',isAvailable.theFirstSitting);
     console.log("denna är 2",isAvailable.theSecondSitting);
    return isAvailable;

  }

  
  




import { getAllBookings } from './handleBookingsAxios';


export interface ISittings {
  theFirstSitting: boolean;
  theSecondSitting: boolean;
}


export const checkAvailableTables = async (
  chairs: boolean,
  date: Date,
  guest: number
) => {

  let isAvailable: ISittings = {
    theFirstSitting: true,
    theSecondSitting: true,
  };

  let response = await getAllBookings();
  let tablesInRestaurant: number = 0;
  if (chairs && guest > 6) {
    tablesInRestaurant = tablesInRestaurant - 1;
  }

  for (let i = 0; i < response.data.length; i++) {
    //** */ får listan med totala bokingar
    let databaseDate = new Date(response.data[i].date);
    let inComingDate = new Date(date);

    if (databaseDate.getTime() === inComingDate.getTime()) {

      //* kollat vilka som matchar önskat datum

       //* Kontroller Sittning  + 1:
       if (response.data[i].time === "12:00") {
        tablesInRestaurant = tablesInRestaurant + 1;
        if (response.data[i].numberOfGuests > 6) {
          tablesInRestaurant = tablesInRestaurant + 1;
        }

        //*om användaren bokar för fler än 6 personer
        if (guest > 6) {
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
       if (response.data[i].time === "19:00") {
        tablesInRestaurant = tablesInRestaurant + 1;
        if (response.data[i].numberOfGuests > 6) {
          tablesInRestaurant = tablesInRestaurant + 1;
        }

         //* om användaren bokar för fler än 6 personer
         if (guest > 6) {
          if (tablesInRestaurant >= 14) {
            isAvailable.theFirstSitting = false;
          } else {
            isAvailable.theFirstSitting = true;
          }
          //* om användaren bokar för mindre än 6 personer
        } else {
          if (tablesInRestaurant >= 15) {
            isAvailable.theFirstSitting = false;
          } else {
            isAvailable.theFirstSitting = true;
          }
        }
      }
    }
  }

  return isAvailable;

}


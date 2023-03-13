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
    let databaseDate:any = new Date(response[i].date);
    let inComingDate:any = new Date(date)

    if (databaseDate.getDate() === inComingDate.getDate()) {

      //Nollställer tiden till 00:00:00
      databaseDate.setHours(0,0,0,0)
      //toLocaleDateString() <- skriver bara datumet likt 2023-03-03, men kan inte appliceras på varken string eller number
       console.log(" vad är du?", inComingDate.toLocaleDateString())
      //* kollat vilka som matchar önskat datum

      let checkTables = numberOfGuests % 15 ;
      // console.log ("ceil:",Math.ceil(checkTables));
      // console.log("bord",checkTables);

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

  
  




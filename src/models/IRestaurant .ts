
export interface IRestaurant {
   name: string;
   address: IAddress[]
}
  interface IAddress{
   street:string,
   zip:string,
   city:string,
  }

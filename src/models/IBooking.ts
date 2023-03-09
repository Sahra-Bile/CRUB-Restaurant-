
interface IBooking{
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customer: ICustomerDetails
}

interface ICustomerDetails{
    name: string,
    lastname: string,
    email: string,
    phone: string
}
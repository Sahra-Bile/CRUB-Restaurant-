import { useState } from "react";
import { useParams } from "react-router-dom";

export const BookingDetails = () => {
    const { customerId } = useParams();

    const [customerData, setCustomerData] = useState();
    return;
}
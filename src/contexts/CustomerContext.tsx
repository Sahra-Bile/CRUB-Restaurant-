import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { createContext } from "react"

export type Customer = {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string
}

export interface ICustomerContext {
    customer: Customer,
    setCustomer: Dispatch<SetStateAction<Customer>>
}

const defaultContext = {
    customer: {
        id: '',
        name: '',
        lastname: '',
        email: '',
        phone: ''
    },
    setCustomer: (customer: Customer) => { }

} as ICustomerContext;

export const CustomerContext = createContext(defaultContext)

type CustomerProviderProps = {
    children: ReactNode
}

export default function CustomerProvider({ children }: CustomerProviderProps) {
    const [customer, setCustomer] = useState<Customer>(
        {
            id: '',
            name: '',
            lastname: '',
            email: '',
            phone: ''
        }
    );
    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    )

}
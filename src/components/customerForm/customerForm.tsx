import { ChangeEvent, useState } from "react";
import { useForm } from "./useForm";


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert(userInput);
//    return
//                 <button className="btn" onClick={handleSubmit}>Boka</button>
export function CustomerForm() {
    const initialState = {
        name: "",
        lastname: "",
        email: "",
        phone: ""
    };

    // getting the event handlers from our custom hook
    const { handleChange, handleSubmit, values } = useForm(
        userInputCallback,
        initialState
    );

    // a submit function that will execute upon form submission
    async function userInputCallback() {
    }

    return (
        <form onSubmit={handleSubmit} >
            <section>
                <input
                    name='name'
                    type='text'
                    placeholder='Förnamn'
                    onChange={handleChange}
                    required
                />
                <input
                    name='lastname'
                    type='text'
                    placeholder='Efternamn'
                    onChange={handleChange}
                    required
                />
                <input
                    name='phone'
                    type='phone'
                    placeholder='070 012 34 56'
                    onChange={handleChange}
                    required
                />
                <input
                    name='email'
                    type='email'
                    placeholder='.... @ mail.se'
                    onChange={handleChange}
                    required
                />
                <button className="btn" type='submit'>Genomför bokning</button>
            </section>
        </form>
    );
}
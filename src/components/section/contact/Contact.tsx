import React from "react";
import "./contact.scss";
import { FaPhone, FaMailBulk, FaHome } from "react-icons/fa";

export const Contact = () => {
  return (
    <section>
      <div className="contact">
        <div className="contact__container">
          <h1 className="contact__container__header">Kontakta oss</h1>
          <p>
            Vi svarar mer än gärna på alla dina frågor kring allergier,
            ingredienser eller övriga funderingar. Ring eller skicka ett mail så
            svarar vi så fort vi kan!
          </p>
        </div>
        <div className="contact__listWrapper">
          <ul className="contact__listContainer">
            <li className="contact__listContainer__icon">
              <FaPhone />
            </li>
            <li className="contact__listContainer__list">Telefon</li>
            <li className="contact__listContainer__list">076-123 45 67</li>
          </ul>
          <ul className="contact__listContainer">
            <li className="contact__listContainer__icon">
              <FaMailBulk />
            </li>
            <li className="contact__listContainer__list">E-post</li>
            <li className="contact__listContainer__list">kontakt@crub.se</li>
          </ul>
          <ul className="contact__listContainer">
            <li className="contact__listContainer__icon">
              <FaHome />
            </li>
            <li className="contact__listContainer__list">Adress</li>
            <li className="contact__listContainer__list">Drottninggatan 33</li>
            <li className="contact__listContainer__list">156 78 Stockholm</li>
          </ul>
        </div>
        <div className="contact__rapidMessageContainer">
          <h2 className="contact__rapidMessageContainer__header">
            Kontakta oss
          </h2>
          <form className="contact__rapidMessageContainer__form" action="">
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="Namn"
            />
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="E-post"
            />
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="Telefon"
            />
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="Ärende"
            />
            <input
              className="contact__rapidMessageContainer__form__bigMessage"
              type="text"
              placeholder="Meddelande"
            />
            <button className="contact__rapidMessageContainer__form__btn">
              Skicka
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

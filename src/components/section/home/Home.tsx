import React from 'react'
import './home.scss'
import { About } from '../about/About'

export const Home = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="home__container">
          <h1 className="home__container__header">CRUB.</h1>
          <p className="home__container__info">
            Vi erbjuder svensk husmanskost på vegetariskt vis.
          </p>
        </div>
        <div className="home__presentationContainer">
          <p className="home__presentationContainer__info">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur.
          </p>
        </div>
      </section>
      <About />
    </>
  )
}

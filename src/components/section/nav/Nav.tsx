import React from 'react'

import { data } from './data'
import './nav.scss'

export const NavBar = () => {
  return (
    <nav className="nav">
      <div className="container  nav__container">
        <h1 className="nav__container__logo">CRUB.</h1>
        <ul className="nav__container__menu">
          {data.map((item) => (
            <li key={item.id}>
              <a className="nav__container__menu__links" href={item.link}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

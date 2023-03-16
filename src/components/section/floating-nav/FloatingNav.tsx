import React from 'react'
import { data } from './data'
import './floatingNav.scss'
import Scrollspy from 'react-scrollspy'
import { Navbar } from './Navbar'

export const FloatingNav = () => {
  return (
    <ul className="floating__nav">
      <Scrollspy
        offset={-500}
        className="scrollspy"
        items={['home', 'booking', 'contact', 'menu', 'admin']}
        currentClassName="active"
      >
        {data.map((item) => (
          <Navbar key={item.id} item={item} className={item} />
        ))}
      </Scrollspy>
    </ul>
  )
}

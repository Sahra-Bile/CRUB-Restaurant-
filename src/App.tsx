import React from 'react'

import './App.css'
import { Nav } from './components/section/nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/section/footer/Footer'
import { createRestaurant } from './services/createRestaurant'

function App() {
  createRestaurant()
  return (
    <>
      <header>
        <Nav></Nav>
      </header>
      <main className="App">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App

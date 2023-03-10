import './App.scss'
import { NavBar } from './components/section/nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/section/footer/Footer'
import { FloatingNav } from './components/section/floating-nav/FloatingNav'
import { Menu } from './components/menu/menu'

function App() {
  return (
    <main>
      <header>
        <NavBar></NavBar>
      </header>
      <main className="App">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
      <FloatingNav />
    </main>
  )
}

export default App

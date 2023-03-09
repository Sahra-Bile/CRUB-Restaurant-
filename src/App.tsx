import './App.scss'
import { NavBar } from './components/section/nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/section/footer/Footer'
import { FloatingNav } from './components/section/floating-nav/FloatingNav'
import { CustomerForm } from './components/customerForm/customerForm'

function App() {
  // kolla om floting nav borde visas eller gömmas

  // kolla om vi scrolled ska upp eller nere rund 20px

  // cleanup function

  return (
    <main>
      <header>
        <NavBar></NavBar>
      </header>
      <main className="App">
        <Outlet></Outlet>
        <CustomerForm></CustomerForm>
      </main>
      <footer>
        <Footer />
      </footer>
      <FloatingNav />
    </main>
  )
}

export default App

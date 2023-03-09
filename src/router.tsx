import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Menu } from './components/menu/menu'
import { Contact } from './components/section/contact/Contact'
import { Home } from './components/section/home/Home'
import { NotFound } from './components/section/notFound/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/menu',
        element: <Menu />
      }
    ],
  },
])

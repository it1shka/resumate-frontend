import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Search from './pages/Search'
import Main from './pages/Main'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Profile from './pages/Profile'
import NotificationsManager from './components/NotificationManager'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'create-account',
        element: <CreateAccount />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationsManager />
    <RouterProvider router={router} />
  </StrictMode>,
)

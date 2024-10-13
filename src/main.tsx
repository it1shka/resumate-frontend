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
import NotFound from './pages/NotFound'
import PublicRoute from './components/Authentication/PublicRoute'
import ProtectedRoute from './components/Authentication/ProtectedRoute'

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
        element: <PublicRoute><CreateAccount /></PublicRoute>,
      },
      {
        path: 'login',
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/search',
    element: <ProtectedRoute><Search /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationsManager />
    <RouterProvider router={router} />
  </StrictMode>,
)

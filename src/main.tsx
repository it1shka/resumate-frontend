import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import CreateAccount from './pages/CreateAccount'

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
      /*
      {
        path: 'login',
        element: <Login />,
      },
      */
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

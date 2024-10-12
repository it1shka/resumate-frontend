import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/search',
    element: <Search />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

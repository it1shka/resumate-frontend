import { memo } from 'react'
import useAuthState from './authState'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthState()

  if (token) return <Navigate to="/search" />

  return <>{children}</>
}

export default memo(PublicRoute)

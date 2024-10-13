import { memo } from "react"
import useAuthState from "./authState"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthState()

  if (!token) {
    return <Navigate to="/auth/login" />
  }

  return <>{children}</>
}

export default memo(ProtectedRoute)
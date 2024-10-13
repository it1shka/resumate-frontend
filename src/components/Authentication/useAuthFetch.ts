import { useEffect, useState } from "react"
import useAuthState from "./authState"
import { NotificationType, useNotifications } from "../NotificationManager/notificationsState"

type AuthProps = {
  url: string,
  method?: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
}

const useAuthFetch = ({
  url,
  method = 'GET',
  body,
  headers,
}: AuthProps) => {
  const { token, logout } = useAuthState()
  const [data, setData] = useState<unknown | null>(null)
  const [pending, setPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { pushNotification } = useNotifications()

  useEffect(() => {
    if (!token) return
    (async () => {
      setPending(true)
      try {
        const rawBody = body ? JSON.stringify(body) : undefined
        const response = await fetch(url, {
          method,
          body: rawBody,
          headers: { ...headers, Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          if (response.status === 401) {
            logout()
            throw new Error('Unauthorized: Please log in again.')
          }
          const error = await response.json()
          const message = error.message ?? 'Error while fetching from server'
          throw new Error(message)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error while fetching from server'
        pushNotification({
          message,
          notificationType: NotificationType.ERROR,
          timeout_ms: 2500,
          title: 'Error',
        })
        setError(message)
      } finally {
        setPending(false)
      }
    })()
  }, [token, logout, url, method, body, headers, pushNotification])

  return { data, pending, error }
}

export default useAuthFetch
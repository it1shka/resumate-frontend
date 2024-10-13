import { useCallback } from 'react'
import useAuthState from './authState'
import {
  NotificationType,
  useNotifications,
} from '../NotificationManager/notificationsState'

type AuthProps = {
  url: string
  method?: string
  body?: Record<string, unknown>
  headers?: Record<string, string>
  text?: boolean
}

const useAuthCallback = ({
  url,
  method = 'GET',
  body,
  headers,
  text = false,
}: AuthProps) => {
  const { token, logout } = useAuthState()
  const { pushNotification } = useNotifications()

  const authCallback = useCallback(async () => {
    if (!token) return { data: null, error: 'No token available' }

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

      const data = text ? await response.text() : await response.json()
      return { data, error: null }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error while fetching from server'
      pushNotification({
        message,
        notificationType: NotificationType.ERROR,
        timeout_ms: 2500,
        title: 'Error',
      })
      return { data: null, error: message }
    }
  }, [token, logout, url, method, body, headers, pushNotification, text])

  return authCallback
}

export default useAuthCallback

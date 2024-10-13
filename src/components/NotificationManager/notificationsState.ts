import { create } from 'zustand'

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface NotificationDTO {
  config: NotificationConfig
  id: number
}

interface NotificationConfig {
  message: string
  notificationType: NotificationType
  timeout_ms: number
  title: string
}

interface NotificationsState {
  notifications: NotificationDTO[]
  pushNotification: (config: NotificationConfig) => void
  removeNotification: (id: number) => void
}

export const useNotifications = create<NotificationsState>((set, get) => ({
  notifications: [],
  pushNotification: config => {
    set(state => {
      const id = Date.now()
      setTimeout(() => {
        get().removeNotification(id)
      }, config.timeout_ms)

      return {
        notifications: [...state.notifications, { config, id: id }],
      }
    })
  },
  removeNotification: id => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }))
  },
}))

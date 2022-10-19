export enum StartNotificationsTask {
  Trigger = `START_NOTIFICATIONS_TASK`,
}

export enum GetNotifications {
  Trigger = `GET_NOTIFICATIONS`,
  Succeeded = `GET_NOTIFICATIONS_SUCCEEDED`,
  Failed = `GET_NOTIFICATIONS_FAILED`,

  PromiseTrigger = `GET_NOTIFICATIONS.TRIGGER`,
}

export enum MarkNotificationsAsRead {
  Trigger = `MARK_NOTIFICATIONS_AS_READ`,
  Succeeded = `MARK_NOTIFICATIONS_AS_READ_SUCCEEDED`,
  Failed = `MARK_NOTIFICATIONS_AS_READ_FAILED`,
}

export enum DeleteNotification {
  Trigger = `DELETE_NOTIFICATION`,
  Succeeded = `DELETE_NOTIFICATION_SUCCEEDED`,
  Failed = `DELETE_NOTIFICATION_FAILED`,

  PromiseTrigger = `DELETE_NOTIFICATION.TRIGGER`,
}

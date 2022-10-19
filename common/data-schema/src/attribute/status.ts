import * as s from "@typeofweb/schema"

export const name = `status`

export enum NotificationStatus {
  PENDING,
  DECLINE,
  ACCEPT,
}

export const required = s.oneOf([
  NotificationStatus.PENDING,
  NotificationStatus.DECLINE,
  NotificationStatus.ACCEPT,
])()
export const optional = s.optional(required)

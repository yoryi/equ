import { Role } from "./profile"

export interface GetNotificationsRequest {
  start: number
  limit: number
  loadMore: boolean
}

export interface GetNotificationsPayload {
  notifications: Notifications
  loadMore: boolean
  canLoadMore: boolean
}

export type Notifications = (
  | FollowRequestNotification
  | UnfollowRequestNotification
  | FollowNotification
  | DreamSchoolNotification
)[]

export interface Notification {
  id: number
  status: FollowRequestStatus
  createdAt: string
  readAt: string | null
  recipient: {
    id: number
    email: string
    role: Role
    extraData: null
  }
}

export interface FollowRequestNotification extends Notification {
  actionType: NotificationType.FollowRequest
  sender: StudentNotificationSender | UniversityNotificationSender
}

export interface UnfollowRequestNotification extends Notification {
  actionType: NotificationType.UnfollowRequest
  sender: StudentNotificationSender | UniversityNotificationSender
}

export interface FollowNotification extends Notification {
  actionType: NotificationType.Follow
  sender: StudentNotificationSender | UniversityNotificationSender
}

export interface DreamSchoolNotification extends Notification {
  actionType:
    | NotificationType.AddedAsDreamSchool
    | NotificationType.RemovedFromDreamSchools
  sender: StudentNotificationSender
}

export interface StudentNotificationSender {
  id: number
  role: Role.Student
  extraData: {
    studentId: number
    name: string
    avatar: string | undefined
    privateAvatar: number
    interests: number[]
  }
}

export interface UniversityNotificationSender {
  id: number
  role: Role.University
  extraData: {
    id: number
    name: string
    avatar: string | null
    privateAvatar?: undefined
    interests?: undefined
    score: number | null
    city: string
    state: string
  }
}

export enum NotificationType {
  FollowRequest = `FOLLOW_REQUEST`,
  UnfollowRequest = `UNFOLLOW_REQUEST`,
  Follow = `AUTO_FOLLOW`,
  AddedAsDreamSchool = `TO_DREAM_ADDED`,
  RemovedFromDreamSchools = `TO_DREAM_REMOVED`,
}

export enum FollowRequestStatus {
  Pending,
  Declined,
  Accepted,
}

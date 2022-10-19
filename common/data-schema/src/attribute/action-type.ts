import * as s from "@typeofweb/schema"

export const name = `actionType`

export const followRequest = `FOLLOW_REQUEST`
export const unfollowRequest = `UNFOLLOW_REQUEST`
export const requiredStudentNotification = s.oneOf([
  followRequest,
  unfollowRequest,
])()
export const optionalStudentNotification = s.optional(
  requiredStudentNotification,
)

export const autoFollow = `AUTO_FOLLOW`
export const toDreamAdded = `TO_DREAM_ADDED`
export const toDreamRemoved = `TO_DREAM_REMOVED`
export const requiredUniversityNotification = s.oneOf([
  followRequest,
  unfollowRequest,
  autoFollow,
  toDreamAdded,
  toDreamRemoved,
])()
export const optionalUniversityNotification = s.optional(
  requiredUniversityNotification,
)

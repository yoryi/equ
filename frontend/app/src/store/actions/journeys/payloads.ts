import { ActivityType } from "../../types/profile"

export interface JourneyPayload {
  id: number
  question: string
  answer?: string
}

export interface UpdateJourney {
  activityId: number
  image?: any
  formData?: any
  description?: string
  activityType: ActivityType
}

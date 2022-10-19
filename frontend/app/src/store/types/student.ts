//Types
import { Reference,ReferenceType } from "./profile"

export interface StudentProfile {
  id: number
  fullName: string
  email: string
  schoolName: string
  schoolCity: string
  schoolState: string
  graduation: number
  privateAvatar: number
  avatar: {
    path: string | undefined
  }
  interests: number[]
  score: number
  user?: undefined
}

export interface GetStudentReferencesRequestPayload {
  studentId: number
  type: ReferenceType
}

export interface GetStudentReferencesSucceededPayload {
  references: Reference
  type: ReferenceType
}

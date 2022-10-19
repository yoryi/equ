//Types
import * as Types from "../../types"

export interface GetProfileResponse {
  avatar: Types.Media | null
  birthday: string | null
  cover: Types.Media | null
  ethnicity: number | null
  firstName: string | null
  friends: []
  fullName: string | null
  gender: number | null
  graduation: number | null
  hardship: number | null
  id: number
  interests: string[] | null
  lastName: string | null
  latitude: number | null
  longitude: number | null
  mission: string | null
  privateAvatar: number | null
  race: number | null
  school: Types.HighSchool | null
  stateCode: string | null
  user: {
    email: string
    id: number
    role: string
  }
  signUpStep: Types.SignUpStep
  completion: Types.Completion
  isFollowed: boolean
  followRequestStatus: Types.FollowRequestStatus
  uiSettings: any
  zipCode: string
}

export interface GlanceResponse {
  id: number
  name: string
  grade: string
  date: string
  category: string
  order: number
}

export interface CreateCourseResponse {
  id: number
  name: string
  grade: number
  year: string
  type: Types.CourseType
  order: number
}

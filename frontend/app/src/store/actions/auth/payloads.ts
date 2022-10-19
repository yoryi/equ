//Types
import { HighSchool,Interest } from "../../types"

export interface EmailPayload {
  email: string
}

export interface PasswordPayload {
  password: string
}

export interface CredentialsPayload extends EmailPayload, PasswordPayload {
  remember?: boolean
}

export interface SignUpPayload extends CredentialsPayload {
  captchaToken: string
  termsOfUseAccepted: boolean
}

export interface RefreshTokenPayload {
  refreshToken: string | null
}

export interface AccessTokenPayload {
  accessToken: string
  tokenType: string
}

export interface StudentSignUpDetailsPayload {
  firstName: string | null
  lastName: string | null
  school: HighSchool | null
  graduation: number | null
  birthday: Date
  zipCode: string
  stateCode: string
  latitude: number
  longitude: number
}

export interface StudentSignUpOptionalDetailsPayload {
  gender: any
  race: any
  ethnicity: any
  hardship: any
}

export interface StudentSignUpInterestsPayload {
  interests: Interest[]
}

export interface StudentSignUpPrivateAvatarPayload {
  privateAvatar: number
}

export interface UniversitySignUpPayload {
  logo: File
  name: string
  location: HighSchool
}

export interface ResetPasswordPayload extends PasswordPayload {
  token: string
}

export interface ChangePasswordPayload extends PasswordPayload {
  oldPassword: string
}

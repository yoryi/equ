import { Media , SignUpStep } from "../../types"


export interface StudentProfileResponse {
  id: number
  firstName: string
  lastName: string
  fullName: string
  graduation: number
  birthday: string
  gender: number | null
  race: number | null
  ethnicity: number | null
  interests: number[]
  privateAvatar: number
  mission: string | null
  signUpStep: SignUpStep
  avatar: Media | null
  cover: Media | null
}

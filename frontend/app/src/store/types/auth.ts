import { HighSchool } from "./highSchool"

export interface JoinPilotPayload {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  highSchool: Pick<HighSchool, "id" | "name">
  grade: Grade
  partnerNetwork: string
  captchaToken: string
}

export enum Grade {
  Freshman = `Freshman`,
  Sophomore = `Sophomore`,
  Junior = `Junior`,
  Senior = `Senior`,
}

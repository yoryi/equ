import * as s from "@typeofweb/schema"

export const name = `gender`

export enum Gender {
  MALE = 1,
  FEMALE,
  OTHER,
}

export const required = s.number()
export const optional = s.optional(required)

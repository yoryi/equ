import * as s from "@typeofweb/schema"

export enum role {
  ADMIN = `ADMIN`,
  STUDENT = `STUDENT`,
  UNIVERSITY = `UNIVERSITY`,
  PROGRAM = `PROGRAM`,
}

export const name = `role`

export const required = s.string()
export const optional = s.optional(required)

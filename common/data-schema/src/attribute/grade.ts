import * as s from "@typeofweb/schema"

export const name = `grade`

export const requiredNumber = s.number()
export const optionalNumber = s.optional(requiredNumber)

export const requiredString = s.string()
export const optionalString = s.optional(requiredString)

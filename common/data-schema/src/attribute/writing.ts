import * as s from "@typeofweb/schema"

export const name = `writing`

export const required = s.number()
export const optional = s.optional(required)

import * as s from "@typeofweb/schema"

export const name = `schoolSize`

export const required = s.number()
export const optional = s.optional(required)

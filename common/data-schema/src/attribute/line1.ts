import * as s from "@typeofweb/schema"

export const name = `line1`

export const required = s.string()
export const optional = s.optional(required)

import * as s from "@typeofweb/schema"

export const name = `question`

export const required = s.string()
export const optional = s.optional(required)

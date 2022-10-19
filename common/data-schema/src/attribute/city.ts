import * as s from "@typeofweb/schema"

export const name = `city`

export const required = s.string()
export const optional = s.optional(required)

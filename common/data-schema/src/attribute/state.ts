import * as s from "@typeofweb/schema"

export const name = `state`

export const required = s.string()
export const optional = s.optional(required)

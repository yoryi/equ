import * as s from "@typeofweb/schema"

export const name = `body`

export const required = s.string()
export const optional = s.optional(required)

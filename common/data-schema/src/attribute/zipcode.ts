import * as s from "@typeofweb/schema"

export const name = `zipcode`

export const required = s.string()
export const optional = s.optional(required)

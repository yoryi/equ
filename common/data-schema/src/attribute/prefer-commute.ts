import * as s from "@typeofweb/schema"

export const name = `prefer_commute`

export const required = s.number()
export const optional = s.optional(required)

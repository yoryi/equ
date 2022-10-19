import * as s from "@typeofweb/schema"

export const name = `order`

export const required = s.oneOf([s.number(), s.string()])()
export const optional = s.optional(required)

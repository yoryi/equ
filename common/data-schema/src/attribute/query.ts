import * as s from "@typeofweb/schema"

export const name = `query`

export const required = s.oneOf([s.string(), s.unknown()])()
export const optional = s.optional(required)

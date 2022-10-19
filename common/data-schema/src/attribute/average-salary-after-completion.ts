import * as s from "@typeofweb/schema"

export const name = `averageSalaryAfterCompletion`

export const required = s.oneOf([s.string(), s.number()])()
export const optional = s.optional(required)

import * as s from "@typeofweb/schema"

export const name = `name`
export const nameJob = `jobName`

export const required = s.string()
export const optional = s.optional(required)

/**
 * @todo duplicate longitute
 */
import * as s from "@typeofweb/schema"

export const name = `lng`

export const required = s.number()
export const optional = s.optional(required)

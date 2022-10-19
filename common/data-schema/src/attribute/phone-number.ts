import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

export const name = `phoneNumber`

export const regex: DataSchema.RegExDef[] = [
  {
    msg: `Phone number must match the format xxx-xxx-xxxx`,
    exp: /^\d{3}[-]\d{3}[-]\d{4}$/,
  },
]

export const required = helpers.setRegexes(regex)
export const optional = s.optional(required)

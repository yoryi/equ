import * as s from "@typeofweb/schema"

export const name = `zipCode`

export const regex: DataSchema.RegExDef[] = [
  {
    msg: `Please enter a valid 5-digit US zip code`,
    exp: /^\d{5}$/,
  },
]

export const required = s.string()
export const optional = s.optional(required)

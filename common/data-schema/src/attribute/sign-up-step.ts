import * as s from "@typeofweb/schema"

export const name = `signUpStep`

export const details = `DETAILS`
export const optionalDetails = `OPTIONAL_DETAILS`
export const privateAvatar = `PRIVATE_AVATAR`
export const welcome = `WELCOME`
export const finish = `FINISH`
export const required = s.oneOf([
  details,
  optionalDetails,
  privateAvatar,
  welcome,
  finish,
])()
export const optional = s.optional(required)

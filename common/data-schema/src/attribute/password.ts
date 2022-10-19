import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

export const name = `password`
export const nameNew = `${name}New`
export const nameOld = `oldPassword`

// const regexHasNumber: DataSchema.RegExDef = {
//   msg: `At least 1 number`,
//   exp: /\d/,
// }
// const regexHasUppercase: DataSchema.RegExDef = {
//   msg: `At least 1 uppercase letter`,
//   exp: /[A-Z]/,
// }
// const regexHasLowercase: DataSchema.RegExDef = {
//   msg: `At least 1 lowercase letter`,
//   exp: /[a-z]/,
// }
// const regexHasSpecialChar: DataSchema.RegExDef = {
//   msg: `At least 1 special character`,
//   exp: /[-=+^$*.[\]{}()?"!@#%&/\\,><':;|_~`]/,
// }

export const regex: DataSchema.RegExDef[] = helpers.hasLengths(8, 31)
// export const regex: DataSchema.RegExDef[] = [
//   ...helpers.hasLengths(8, 31),
//   regexHasNumber,
//   regexHasUppercase,
//   regexHasLowercase,
//   regexHasSpecialChar,
// ]

export const required = helpers.setRegexes(regex)
export const optional = s.optional(required)

export const requiredHash = s.string()
export const optionalHash = s.optional(requiredHash)

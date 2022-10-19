import * as s from "@typeofweb/schema"

export const name = `category`

export const math = `MATH`
export const english = `ENGLISH`
export const science = `SCIENCE`
export const socialStudies = `SOCIAL_STUDIES`
export const electives = `ELECTIVES`
export const requiredGlance = s.oneOf([
  math,
  english,
  science,
  socialStudies,
  electives,
])()
export const optionalGlance = s.optional(requiredGlance)

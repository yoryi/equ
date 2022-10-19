import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `activity`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.title.name]: attr.title.required,
  [attr.date.nameStartDate]: attr.date.required,
  [attr.type.name]: attr.type.requiredActivity,
  [attr.is.nameReviewed]: attr.is.required,

  [attr.id.nameLogo]: attr.id.optional,
  [attr.id.nameJourneys]: attr.id.optionalArray,
  [attr.id.nameCategory]: attr.id.optional,
  [attr.company.name]: attr.company.optional,
  [attr.description.name]: attr.description.optional,
  [attr.date.nameEndDate]: attr.date.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

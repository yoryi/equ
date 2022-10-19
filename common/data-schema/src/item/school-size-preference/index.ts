import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `school-size-preference`

export const item = s.object({
  [attr.id.nameCapital]: attr.id.required,
  [attr.id.nameStudentPreference]: attr.id.required,
  [attr.guid.name]: attr.guid.required,

  [attr.is.nameVerySmall]: attr.is.optional,
  [attr.is.nameSmall]: attr.is.optional,
  [attr.is.nameMedium]: attr.is.optional,
  [attr.is.nameLarge]: attr.is.optional,
  [attr.is.nameVeryLarge]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

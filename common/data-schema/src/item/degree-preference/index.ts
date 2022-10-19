import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `degree-preference`

export const item = s.object({
  [attr.id.nameCapital]: attr.id.required,
  [attr.id.nameStudentPreference]: attr.id.required,
  [attr.guid.name]: attr.guid.required,

  [attr.is.nameTwoYear]: attr.is.optional,
  [attr.is.nameFourYear]: attr.is.optional,
  [attr.is.nameCertificate]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

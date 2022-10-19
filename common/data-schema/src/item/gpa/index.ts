import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `gpa`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.grade.name]: attr.grade.requiredNumber,
  [attr.date.nameYear]: attr.date.requiredNumber,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

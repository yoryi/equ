import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `course`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.grade.name]: attr.grade.requiredNumber,
  [attr.date.nameYear]: attr.date.required,
  [attr.type.name]: attr.type.requiredCourseType,
  [attr.order.name]: attr.order.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

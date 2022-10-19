import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `glance`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.date.name]: attr.date.required,
  [attr.grade.name]: attr.grade.requiredString,
  [attr.category.name]: attr.category.requiredGlance,

  [attr.order.name]: attr.order.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

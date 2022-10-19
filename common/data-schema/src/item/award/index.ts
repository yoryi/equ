import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `award`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.date.name]: attr.date.required,
  [attr.organisation.name]: attr.organisation.required,
  [attr.type.name]: attr.type.requiredAward,
  [attr.is.nameReviewed]: attr.is.required,

  [attr.order.name]: attr.order.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

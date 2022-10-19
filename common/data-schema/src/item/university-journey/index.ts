import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-journey`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameNews]: attr.id.required,
  [attr.id.nameMedia]: attr.id.required,

  [attr.order.name]: attr.order.optional,
  [attr.description.name]: attr.description.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

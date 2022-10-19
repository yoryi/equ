import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `journey`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameActivity]: attr.id.required,
  [attr.id.nameMedia]: attr.id.required,

  [attr.description.name]: attr.description.optional,
  [attr.order.name]: attr.order.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

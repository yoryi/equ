import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `survey`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.title.name]: attr.title.required,
  [attr.description.name]: attr.description.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

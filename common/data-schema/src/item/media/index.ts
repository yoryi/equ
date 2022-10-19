import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `media`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.path.name]: attr.path.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

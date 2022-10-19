import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `school`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.city.name]: attr.city.required,
  [attr.state.name]: attr.state.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

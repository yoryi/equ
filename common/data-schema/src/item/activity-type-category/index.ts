import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `activity-type-category`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.type.name]: attr.type.requiredActivity,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

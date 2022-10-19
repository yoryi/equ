import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `user-relations`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.type.name]: attr.type.requiredNumber,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

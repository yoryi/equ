import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student-list`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUniversity]: attr.id.required,
  [attr.name.name]: attr.name.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

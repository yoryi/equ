import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student-followed-university-university`

export const item = s.object({
  [attr.id.nameStudent]: attr.id.required,
  [attr.id.nameUniversity]: attr.id.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

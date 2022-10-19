import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-stats`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUniversity]: attr.id.required,
  [attr.is.nameClaimed]: attr.is.required,
  [attr.is.nameContacted]: attr.is.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

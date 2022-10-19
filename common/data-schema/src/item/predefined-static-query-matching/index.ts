import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `predefined-static-query-matching`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.namePredefinedStaticQuery]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.matching.name]: attr.matching.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

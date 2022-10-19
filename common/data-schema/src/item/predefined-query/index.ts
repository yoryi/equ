import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `predefined-query`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.name.name]: attr.name.required,
  [attr.query.name]: attr.query.required,
  [attr.matching.name]: attr.matching.required,
  [attr.type.name]: attr.type.requiredPredefinedQueryType,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

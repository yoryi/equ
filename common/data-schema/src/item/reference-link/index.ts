import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `reference-link`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.type.name]: attr.type.requiredNumber,
  [attr.token.name]: attr.token.required,
  [attr.is.nameActive]: attr.is.required,
  [attr.email.name]: attr.email.optional,

  [attr.id.nameRelated]: attr.id.optional,
  [attr.date.nameCreatedAt]: attr.date.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

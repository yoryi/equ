import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `reference`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameReferenceLink]: attr.id.required,
  [attr.is.nameVisible]: attr.is.required,

  [attr.id.nameMedia]: attr.id.optional,
  [attr.date.nameCreatedAt]: attr.date.optional,
  [attr.date.nameUpdatedAt]: attr.date.optional,
  [attr.firstName.name]: attr.firstName.optional,
  [attr.lastName.name]: attr.lastName.optional,
  [attr.organization.name]: attr.organization.optional,
  [attr.position.name]: attr.position.optional,
  [attr.content.name]: attr.content.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

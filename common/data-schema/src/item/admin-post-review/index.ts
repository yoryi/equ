import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `admin-post-review`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.is.nameReviewed]: attr.is.required,
  [attr.id.namePost]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.postType.name]: attr.postType.required,
  [attr.date.nameCreatedAt]: attr.date.required,
  [attr.date.nameUpdatedAt]: attr.date.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

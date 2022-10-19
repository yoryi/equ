import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-notification-settings`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.is.nameEmailFollowActivity]: attr.is.required,
  [attr.is.nameEmailFollowerDigest]: attr.is.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

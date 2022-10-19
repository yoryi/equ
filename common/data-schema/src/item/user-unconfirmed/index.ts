import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `user-unconfirmed`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.email.name]: attr.email.required,
  [attr.password.name]: attr.password.requiredHash,
  [attr.salt.name]: attr.salt.required,
  [attr.role.name]: attr.role.required,
  [attr.emailToken.name]: attr.emailToken.required,
  [attr.date.nameCreatedAt]: attr.date.required,

  [attr.is.nameRememberLogin]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

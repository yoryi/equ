import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `user`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.email.name]: attr.email.required,
  [attr.password.name]: attr.password.requiredHash,
  [attr.salt.name]: attr.salt.required,
  [attr.role.name]: attr.role.required,

  [attr.id.nameProgram]: attr.id.optional,
  [attr.resetPasswordToken.name]: attr.resetPasswordToken.optional,
  [attr.resetPasswordExp.name]: attr.resetPasswordExp.optional,
  [attr.lastPasswordChange.name]: attr.lastPasswordChange.optional,
  [attr.date.nameCloseAt]: attr.date.optional,
  [attr.date.nameBlockedAt]: attr.date.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

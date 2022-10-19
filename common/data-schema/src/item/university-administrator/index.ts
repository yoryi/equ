import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-administrator`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUniversity]: attr.id.required,
  [attr.email.name]: attr.email.required,

  [attr.phone.name]: attr.phone.optional,
  [attr.firstName.name]: attr.firstName.optional,
  [attr.lastName.name]: attr.lastName.optional,
  [attr.position.name]: attr.position.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

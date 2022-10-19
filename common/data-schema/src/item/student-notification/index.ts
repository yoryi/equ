import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student-notification`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameSender]: attr.id.required,
  [attr.id.nameRecipient]: attr.id.required,
  [attr.status.name]: attr.status.required,
  [attr.actionType.name]: attr.actionType.requiredStudentNotification,
  [attr.date.nameCreatedAt]: attr.date.required,

  [attr.date.nameReadAt]: attr.date.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `job-error-log`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameJob]: attr.id.required,
  [attr.name.nameJob]: attr.name.required,
  [attr.data.name]: attr.data.required,
  [attr.date.nameProcessedOn]: attr.date.required,
  [attr.failedReason.name]: attr.failedReason.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

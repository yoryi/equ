import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `your-beat-answer`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.id.nameQuestion]: attr.id.required,
  [attr.answer.name]: attr.answer.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `your-beat-question`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.question.name]: attr.question.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

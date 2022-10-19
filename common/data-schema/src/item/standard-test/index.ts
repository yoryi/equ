import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `standard-test`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.composite.name]: attr.composite.required,
  [attr.math.name]: attr.math.required,
  [attr.type.name]: attr.type.requiredStandardTest,
  [attr.date.name]: attr.date.required,

  [attr.english.name]: attr.english.optional,
  [attr.reading.name]: attr.reading.optional,
  [attr.science.name]: attr.science.optional,
  [attr.writing.name]: attr.writing.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

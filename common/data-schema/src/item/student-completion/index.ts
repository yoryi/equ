import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student-completion`

const schema = {} as unknown as {
  [key in attr.completion.names]: typeof attr.completion.required
}
for (const completion of attr.completion.names) {
  schema[completion] = attr.completion.required
}

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  ...schema,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

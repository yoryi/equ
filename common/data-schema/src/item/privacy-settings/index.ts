import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `privacy-settings`

const schema = {} as unknown as {
  [key in attr.privacySetting.names]: typeof attr.privacySetting.required
}
for (const privacySetting of attr.privacySetting.names) {
  schema[privacySetting] = attr.privacySetting.required
}

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  ...schema,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

export const newPrivacySettings = (studentId) => {
  const obj = { [attr.id.nameStudent]: studentId }
  for (const privacySetting of attr.privacySetting.names) {
    obj[privacySetting] = attr.privacySetting.basePrivacySettings
  }
  return obj
}

import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `survey-question`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameSurvey]: attr.id.required,
  [attr.title.name]: attr.title.required,
  [attr.answerType.name]: attr.answerType.required,
  [attr.studentPreferenceType.name]: attr.studentPreferenceType.required,
  [attr.body.name]: attr.body.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

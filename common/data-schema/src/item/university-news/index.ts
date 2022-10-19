import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-news`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUniversity]: attr.id.required,
  [attr.title.name]: attr.title.required,
  [attr.date.name]: attr.date.required,
  [attr.type.name]: attr.type.requiredUniversityNews,
  [attr.description.name]: attr.description.required,

  [attr.id.nameLogo]: attr.id.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

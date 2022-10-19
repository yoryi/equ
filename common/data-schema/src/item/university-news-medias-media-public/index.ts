import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university-news-medias-media-public`

export const item = s.object({
  [attr.id.nameUniversityNews]: attr.id.required,
  [attr.id.nameMediaPublic]: attr.id.required,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

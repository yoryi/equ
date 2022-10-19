import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student-preference`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameStudent]: attr.id.required,
  [attr.date.nameCreatedAt]: attr.date.required,

  [attr.preferCommute.name]: attr.preferCommute.optional,
  [attr.admissionGender.name]: attr.admissionGender.optional,
  [attr.recruitment.name]: attr.recruitment.optional,
  [attr.date.nameCreatedAt]: attr.date.optional,
  [attr.guid.nameLocale]: attr.guid.optional,
  [attr.guid.nameRegion]: attr.guid.optional,
  [attr.guid.nameSchoolSize]: attr.guid.optional,
  [attr.guid.nameDegree]: attr.guid.optional,
  [attr.guid.nameInstitutionType]: attr.guid.optional,
  [attr.guid.nameFinancial]: attr.guid.optional,
  [attr.guid.nameCampusInterest]: attr.guid.optional,
  [attr.guid.nameCareerInterest]: attr.guid.optional,
  [attr.personality.name1]: attr.personality.optional,
  [attr.personality.name2]: attr.personality.optional,
  [attr.personality.name3]: attr.personality.optional,
  [attr.personality.name4]: attr.personality.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

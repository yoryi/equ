import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `campus-interest-preference`

export const item = s.object({
  [attr.id.nameCapital]: attr.id.required,
  [attr.id.nameStudentPreference]: attr.id.required,
  [attr.guid.name]: attr.guid.required,
  [attr.is.nameAthleticPrograms]: attr.is.optional,
  [attr.is.nameAcademicPrograms]: attr.is.optional,
  [attr.is.nameAcademicReputation]: attr.is.optional,
  [attr.is.nameReligiousCommunity]: attr.is.optional,
  [attr.is.nameSocialLife]: attr.is.optional,
  [attr.is.nameExpertFaculty]: attr.is.optional,
  [attr.is.nameCulturalDiversity]: attr.is.optional,
  [attr.is.nameCurrentResearch]: attr.is.optional,
  [attr.is.namePostGradSalary]: attr.is.optional,
  [attr.is.nameCampusOrganizations]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

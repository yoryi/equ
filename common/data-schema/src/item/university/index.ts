import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `university`

export const item = s.object({
  [attr.id.name]: attr.id.required,

  [attr.id.nameUser]: attr.id.optional,
  [attr.id.nameInun]: attr.id.optional,
  [attr.id.nameProfileAvatar]: attr.id.optional,
  [attr.id.nameCover]: attr.id.optional,
  [attr.name.name]: attr.name.optional,
  [attr.city.name]: attr.city.optional,
  [attr.countryCode.name]: attr.countryCode.optional,
  [attr.urlAddress.name]: attr.urlAddress.optional,
  [attr.schoolSize.name]: attr.schoolSize.optional,
  [attr.email.name]: attr.email.optional,
  [attr.onCampusHousing.name]: attr.onCampusHousing.optional,
  [attr.degreeLevelGranted.name]: attr.degreeLevelGranted.optional,
  [attr.line1.name]: attr.line1.optional,
  [attr.zipcode.name]: attr.zipcode.optional,
  [attr.stateCode.name]: attr.stateCode.optional,
  [attr.mainStudentBody.name]: attr.mainStudentBody.optional,
  [attr.applications.name]: attr.applications.optional,
  [attr.accepted.name]: attr.accepted.optional,
  [attr.enrolled.name]: attr.enrolled.optional,
  [attr.campusSetting.name]: attr.campusSetting.optional,
  [attr.freshmanClassSize.name]: attr.freshmanClassSize.optional,
  [attr.percentAcceptanceRate.name]: attr.percentAcceptanceRate.optional,
  [attr.percentGraduationRate.name]: attr.percentGraduationRate.optional,
  [attr.averageSatScore.name]: attr.averageSatScore.optional,
  [attr.satScore.name]: attr.satScore.optional,
  [attr.actScore.name]: attr.actScore.optional,
  [attr.averageActScore.name]: attr.averageActScore.optional,
  [attr.averageGpaScore.name]: attr.averageGpaScore.optional,
  [attr.percentStudents.nameMale]: attr.percentStudents.optional,
  [attr.percentStudents.nameFemale]: attr.percentStudents.optional,
  [attr.percentStudents.nameOutState]: attr.percentStudents.optional,
  [attr.percentStudents.nameWhite]: attr.percentStudents.optional,
  [attr.percentStudents.nameAsian]: attr.percentStudents.optional,
  [attr.percentStudents.nameBlack]: attr.percentStudents.optional,
  [attr.percentStudents.nameHispanic]: attr.percentStudents.optional,
  [attr.percentStudents.nameNhOrPi]: attr.percentStudents.optional,
  [attr.percentStudents.nameAiOrAn]: attr.percentStudents.optional,
  [attr.percentStudents.nameMultirace]: attr.percentStudents.optional,
  [attr.percentStudents.nameUnknown]: attr.percentStudents.optional,
  [attr.percentStudents.nameNonresidentAlien]: attr.percentStudents.optional,
  [attr.averageNbAward.name]: attr.averageNbAward.optional,
  [attr.seDiversity.name]: attr.seDiversity.optional,
  [attr.averageSalaryAfterCompletion.name]:
    attr.averageSalaryAfterCompletion.optional,
  [attr.topSocialOrg.name]: attr.topSocialOrg.optional,
  [attr.topSocialEvent.name]: attr.topSocialEvent.optional,
  [attr.mission.name]: attr.mission.optional,
  [attr.institutionType.name]: attr.institutionType.optional,
  [attr.percentageNeedingFinancialAid.name]:
    attr.percentageNeedingFinancialAid.optional,
  [attr.lat.name]: attr.lat.optional,
  [attr.lng.name]: attr.lng.optional,
  [attr.is.nameVisible]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

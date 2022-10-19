import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `student`

export const item = s.object({
  [attr.id.name]: attr.id.required,
  [attr.id.nameUser]: attr.id.required,
  [attr.extracurricularOrder.name]: attr.extracurricularOrder.required,

  [attr.id.nameAvatar]: attr.id.optional,
  [attr.id.nameCover]: attr.id.optional,
  [attr.id.nameSchool]: attr.id.optional,
  [attr.firstName.name]: attr.firstName.optional,
  [attr.lastName.name]: attr.lastName.optional,
  [attr.date.nameBirthday]: attr.date.optional,
  [attr.graduation.name]: attr.graduation.optional,
  [attr.gender.name]: attr.gender.optional,
  [attr.race.name]: attr.race.optional,
  [attr.ethnicity.name]: attr.ethnicity.optional,
  [attr.hardship.name]: attr.hardship.optional,
  [attr.interests.name]: attr.interests.optional,
  [attr.privateAvatar.name]: attr.privateAvatar.optional,
  [attr.mission.name]: attr.mission.optional,
  [attr.signUpStep.name]: attr.signUpStep.optional,
  [attr.stateCode.name]: attr.stateCode.optional,
  [attr.zipCode.name]: attr.zipCode.optional,
  [attr.latitude.name]: attr.latitude.optional,
  [attr.longitude.name]: attr.longitude.optional,
  [attr.uiSettings.name]: attr.uiSettings.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

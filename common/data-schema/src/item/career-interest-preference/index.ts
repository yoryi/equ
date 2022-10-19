import * as attr from "@equedi/data-schema/src/attribute"
import * as s from "@typeofweb/schema"

export const name = `career-interest-preference`

export const item = s.object({
  [attr.id.nameCapital]: attr.id.required,
  [attr.id.nameStudentPreference]: attr.id.required,
  [attr.guid.name]: attr.guid.required,

  [attr.is.nameHealth]: attr.is.optional,
  [attr.is.nameLegal]: attr.is.optional,
  [attr.is.nameBusiness]: attr.is.optional,
  [attr.is.nameLiberalArts]: attr.is.optional,
  [attr.is.nameStem]: attr.is.optional,
  [attr.is.nameGovernmentAdministration]: attr.is.optional,
  [attr.is.nameMilitary]: attr.is.optional,
  [attr.is.nameTradeCertificates]: attr.is.optional,
})()
export type item = s.TypeOf<typeof item>
export const itemValidator = s.validate(item)

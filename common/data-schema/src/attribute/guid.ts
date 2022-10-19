import * as s from "@typeofweb/schema"

export const name = `guid`
export const nameLocale = `locale_guid`
export const nameRegion = `region_guid`
export const nameSchoolSize = `school_size_guid`
export const nameDegree = `degree_guid`
export const nameInstitutionType = `institution_type_guid`
export const nameFinancial = `financial_guid`
export const nameCampusInterest = `campus_interest_guid`
export const nameCareerInterest = `career_interest_guid`

export const required = s.string()
export const optional = s.optional(required)

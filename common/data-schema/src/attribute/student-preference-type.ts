import * as s from "@typeofweb/schema"

export const name = `studentPreferenceType`

export enum StudentPreferenceTypes {
  PREFER_COMMUTE = 1,
  REGION_GUID,
  LOCALE_GUID,
  SCHOOL_SIZE_GUID,
  ADMISSION_GENDER,
  INSTITUTION_TYPE_GUID,
  CAMPUS_INTEREST_GUID,
  CAREER_INTEREST_GUID,
  DEGREE_GUID,
  FINANCIAL_GUID,
  RECRUITMENT,
  PERSONALITY_1,
  PERSONALITY_2,
  PERSONALITY_3,
  PERSONALITY_4,
}

export const required = s.oneOf([
  StudentPreferenceTypes.PREFER_COMMUTE,
  StudentPreferenceTypes.REGION_GUID,
  StudentPreferenceTypes.LOCALE_GUID,
  StudentPreferenceTypes.SCHOOL_SIZE_GUID,
  StudentPreferenceTypes.ADMISSION_GENDER,
  StudentPreferenceTypes.INSTITUTION_TYPE_GUID,
  StudentPreferenceTypes.CAMPUS_INTEREST_GUID,
  StudentPreferenceTypes.CAREER_INTEREST_GUID,
  StudentPreferenceTypes.DEGREE_GUID,
  StudentPreferenceTypes.FINANCIAL_GUID,
  StudentPreferenceTypes.RECRUITMENT,
  StudentPreferenceTypes.PERSONALITY_1,
  StudentPreferenceTypes.PERSONALITY_2,
  StudentPreferenceTypes.PERSONALITY_3,
  StudentPreferenceTypes.PERSONALITY_4,
])()
export const optional = s.optional(required)

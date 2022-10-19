import * as s from "@typeofweb/schema"

export const name = `type`

export const extracurriculars = `EXTRACURRICULARS`
export const academic = `ACADEMIC`
export const scholarship = `SCHOLARSHIP`
export const requiredAward = s.oneOf([
  extracurriculars,
  academic,
  scholarship,
])()
export const optionalAward = s.optional(requiredAward)

export const college = `COLLEGE`
export const ap = `AP`
export const sat = `SAT`
export const requiredCourseType = s.oneOf([college, ap, sat])()
export const optionalCourseType = s.optional(requiredCourseType)

export const universityToStudent = `uni-stu`
export const studentToUniversity = `stu-uni`
export const studentToStudent = `stu-stu`
export const requiredPredefinedQueryType = s.oneOf([
  universityToStudent,
  studentToUniversity,
  studentToStudent,
])()
export const optionalPredefinedQueryType = s.optional(
  requiredPredefinedQueryType,
)

export const extracurricular = `EXTRACURRICULAR`
export const professional = `PROFESSIONAL`
export const service = `SERVICE`
export const recognition = `RECOGNITION`
export const requiredQuote = s.oneOf([
  extracurricular,
  professional,
  service,
  recognition,
])()
export const optionalQuote = s.optional(requiredQuote)

export const requiredNumber = s.number()
export const optionalNumber = s.optional(requiredNumber)

export const act = `ACT`
export const requiredStandardTest = s.oneOf([act, sat])()
export const optionalStandardTest = s.optional(requiredStandardTest)

export const internship = `INTERNSHIP`
export const employment = `EMPLOYMENT`
export const volunteer = `VOLUNTEER`
export const activism = `ACTIVISM`
export const academicArt = `ACADEMIC_ART`
export const sportsSpirit = `SPORTS_SPIRIT`
export const hobbies = `HOBBIES`
export const requiredActivity = s.oneOf([
  internship,
  employment,
  volunteer,
  activism,
  academicArt,
  sportsSpirit,
  hobbies,
])()
export const optionalActivity = s.optional(requiredActivity)

export const spirit = `SPIRIT`
export const update = `UPDATE`
export const requiredUniversityNews = s.oneOf([spirit, update])()
export const optionalUniversityNews = s.optional(requiredUniversityNews)

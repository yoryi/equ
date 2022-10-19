export interface UniversityIDPayload {
  id: number | null
}

export enum PredefinedQueryType {
  UNIVERSITY_TO_STUDENT = `uni-stu`,
  STUDENT_TO_UNIVERSITY = `stu-uni`,
  STUDENT_TO_STUDENT = `stu-stu`,
}

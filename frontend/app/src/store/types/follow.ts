import { UniversityProfile } from "./university"

export interface YourSchoolsFilters {
  matchLevel: string[]
  location: string[]
  locale: string[]
  region: string[]
  schoolSize: string[]
  admissionGender: number | null
  schoolType: string[]
  degree: string[]
  athleticDivision: string[]
}

export interface YourSchools {
  dreamUniversity?: UniversityProfile[]
  followedUniversity: UniversityProfile[]
}

export interface FollowedStudentsFilters {
  matchLevel: string[]
  location: string[]
  satComposite: number | null
  satMath: number | null
  satReading: number | null
  apTestsTaken: number | null
  subjectTestsTaken: number | null
  collegeCoursesTaken: number | null
  gpaOverall: number | null
  gpaMath: number | null
  gpaEnglish: number | null
  gpaScience: number | null
  gpaSocialStudies: number | null
  gpaElectives: number | null
  activities: string[]
  followingUni: boolean
  dreamUni: boolean
  collegeFreshman: boolean
  seniors: false
  sortBy: string
}

import { FollowRequestStatus } from "./notifications"
import { StudentProfile } from "./student"

export declare namespace Search {
  export interface SavedSearch {
    id: number
    name: string
    matching: number | null
    query: any
  }

  export type Result = StudentResult | UniversityResult

  export interface StudentResult extends StudentProfile {
    isFollowed: boolean
    website?: undefined
    type: SearchResultType.Student
    followRequestStatus?: FollowRequestStatus
  }

  export interface UniversityResult {
    id: number
    name: string
    city: string
    state: string
    avatar: string | null
    score: number
    isDream: boolean
    isFollowed: boolean
    email: string | null
    website: string
    type: SearchResultType.University
  }

  export type ResultsLimit<T> = T & {
    skip: number
    limit: number
  }
}

export declare namespace Filters {
  interface Base {
    name: string
    matchLevel: string[]
    location: string[]
    sortBy: string
  }

  export interface Student extends Base {
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
    extracurricularActivityType: string[]
    followingUni: boolean | null
    dreamUni: boolean | null
    collegeFreshman: boolean
    seniors: boolean
  }

  export interface University extends Base {
    locale: string[]
    region: string[]
    schoolSize: string[]
    admissionGender: number | null
    schoolType: any
    degree: string[]
    athleticDivision: string[]
  }

  export type All = Student | University
}

export enum SearchResultType {
  Student = `STUDENT`,
  University = `UNIVERSITY`,
}

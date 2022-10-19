import { HighSchool } from "./highSchool"
import { Interest } from "./interest"
import { FollowRequestStatus } from "./notifications"

export enum Role {
  Student = `STUDENT`,
  University = `UNIVERSITY`,
  Admin = `ADMIN`,
  Program = `PROGRAM`,
}

export enum SignUpStep {
  Details = `DETAILS`,
  OptionalDetails = `OPTIONAL_DETAILS`,
  Interests = `INTERESTS`,
  PrivateAvatar = `PRIVATE_AVATAR`,
  Welcome = `WELCOME`,
  Finish = `FINISH`,
}

export enum CompletionStatus {
  Pending = 1,
  Completed,
  Hidden,
}

export enum CompletionStep {
  CollegePreferenceSurvey = `collegePreferenceSurvey`,
  ProfilePhoto = `profilePhoto`,
  CoverPhoto = `coverPhoto`,
  MissionStatement = `missionStatement`,
  TranscriptTab = `transcriptTab`,
  ExtracurricularsTab = `extracurricularTab`,
  ProfessionalTab = `professionalTab`,
  ServiceTab = `serviceTab`,
  RecognitionTab = `recognitionTab`,
  EquediBeat = `equediBeat`,
  DreamSchools = `dreamSchools`,
  CampusScholars = `campusScholars`,
}

export interface Completion {
  [step: string]: CompletionStatus
}

export interface Profile {
  id: number
  cover: Media | null
  avatar: Media | null
  privateAvatar: number | null
  interests: Interest[] | null
  firstName: string | null
  lastName: string | null
  name: string | null
  email: string | null
  role: Role
  school: HighSchool | null
  graduation: number | null
  mission: string | null
  birthday: Date | null
  zipCode: string | null
  latitude: number | null
  longitude: number | null
  stateCode: string | null
  gender: any
  race: any
  ethnicity: any
  hardship: any
  signUpStep: SignUpStep | null
  completion: Completion
  user?: {
    id: number
    email: string
    role: Role
  }
  score?: number
  isFollowed: boolean
  followRequestStatus?: FollowRequestStatus
  uiSettings: any
}

export interface StudentBeatQuestion {
  id: number
  question: string
  answer: string
}

export type StudentBeat = StudentBeatQuestion[]

export interface StudentUserList {
  /**
   * Program's name
   */
  name?: string
  stats: {
    averageCompletion: number
    studentsQty: number
    schoolsQty: number
  }
  students: [
    {
      id: number
      completion: any
      firstName: string | null
      lastName: string | null
      percentageCompletion: number
      school: {
        id: number
        city: string
        name: string
        state: string
      }
      user: {
        id: number
        blockedAt: Date | null
        email: string | null
        role: string | null
        stats: {
          id: number
          logins: number
        }
      }
    },
  ]
}

export interface GPA {
  year: number
  gpa: number | null
  grade?: number | null
}

export interface StandardizedTestCategory {
  id: number
  english: number | null
  math: number | null
  reading: number | null
  science: number | null
  writing: number | null
  date?: Date | null
  month?: any
  year?: any
  composite?: number | null
  type?: string
}

export interface StandardizedTests {
  sat: StandardizedTestCategory
  act: StandardizedTestCategory
}

export enum ActivityType {
  INTERNSHIP = `INTERNSHIP`,
  EMPLOYMENT = `EMPLOYMENT`,
  VOLUNTEER = `VOLUNTEER`,
  ACTIVISM = `ACTIVISM`,
  ACADEMIC_ART = `ACADEMIC_ART`,
  SPORTS_SPIRIT = `SPORTS_SPIRIT`,
  HOBBIES = `HOBBIES`,
  SPIRIT = `SPIRIT`,
}

export enum CourseType {
  AP = `AP`,
  College = `COLLEGE`,
  SAT = `SAT`,
}

export interface Course {
  id?: number
  gpa?: string
  grade?: number | string
  date?: string
  name?: string
  year?: any
  type?: CourseType
  order?: number
}

export interface CreateCourse {
  id?: number
  name: string
  grade: number
  year: any
  type: CourseType
  order?: number
}

export interface CreateActivity {
  id?: number
  title: string
  categoryId?: number
  company?: string
  description?: string
  startDate?: any
  endDate?: any
  date?: any
  logo?: string
  journeys?: any
  reference?: any
  type?: ActivityType
}

export enum GlanceCategory {
  Math = `MATH`,
  English = `ENGLISH`,
  Science = `SCIENCE`,
  SocialStudies = `SOCIAL_STUDIES`,
  Electives = `ELECTIVES`,
}

export interface Glance {
  name: GlanceCategory
  parts: GlancePart[] | null
}

export interface GlancePart {
  id: number
  name: string
  grade: string
  date: any
  order: number
}

export interface Quotes {
  content: string
  type?: string
  id?: number
}

export interface QuotesPatch {
  content: string
  id: number
}

export enum ReferenceType {
  Academic,
  Recognition,
  Activity,
}

export interface Media {
  id: number
  path: string | null
}

export interface ReferenceLink {
  id: number
  type: ReferenceType
  activity: Activity | null
  token: string
  isActive: boolean
  createdAt: Date | null
}

export interface Reference {
  id: number
  type: ReferenceType
  firstName: string
  lastName: string
  media: Media | null
  organization: string
  position: string
  content: string
  isVisible: boolean
  referenceLink: ReferenceLink
}

export interface UnsubmittedReference extends Reference {
  studentName: string
  extraData: {
    activityTitle: string | null
  } | null
}

export interface ProfileTranscript {
  gpas: GPA[] | null
  standardizedTests: StandardizedTests | null
  transcript: Glance[] | null
  apCourses: Course[] | null
  collegeCourses: Course[] | null
  satSubjectTests: Course[] | null
  academicReferences: Reference[] | null
}

export interface Activity {
  id: number
  title: string
  startDate: Date | null
  endDate: Date | null
  company?: string
  description: string
  type: ActivityType
  logo?: any
  journeys?: Journey[]
  attachments?: Attachment[]
  referenceLink: ReferenceLink | null
}

export interface Attachment {
  id: number
  path: string
  name: string
  description?: string
  order?: number
}

export interface Journey {
  description?: string
  id: number
  media: { id: number; path: string }
  order?: number
}

export interface ProfileExtracurriculars {
  quote: Quotes
  academicAndArts: Activity[]
  sportsAndSpirit: Activity[]
  hobbies: Activity[]
  extracurricularOrder?: string
}

export interface ProfileProfessional {
  quote: Quotes
  employment: Activity[]
  internship: Activity[]
}

export interface ProfileService {
  quote: Quotes
  volunteerWork: Activity[]
  activism: Activity[]
}

export interface Award {
  id?: number
  name: string
  organisation: string
  date?: any
  type: string
  order?: string
  month?: any
  year?: any
}

export enum AwardType {
  Academic = `ACADEMIC`,
  Extracurriculars = `EXTRACURRICULARS`,
  Scholarship = `SCHOLARSHIP`,
}

export interface ProfileRecognition {
  quote: Quotes
  academicAwards: Award[]
  extracurricularsAwards: Award[]
  scholarshipAwards: Award[]
  references: Reference[]
}

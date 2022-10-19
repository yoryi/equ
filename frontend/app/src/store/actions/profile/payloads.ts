import {   Activity,
  Award,
  AwardType,
  CompletionStatus,
  CompletionStep,
  Course,
  CourseType,
  GlanceCategory,
  GlancePart,
ReferenceLink ,
  ReferenceType,
} from "../../types"


export interface GetProfileFailedPayload {
  loaded: boolean
}

export interface SearchHighSchoolPayload {
  query: string
  start: number
  limit: number
}

export interface MissionPayload {
  mission: string
}

export interface UpdateStandardizedTestsFirstStep {
  type: string
  date: Date | null
}

export interface UpdateCourseOrderPayload {
  type: CourseType
  courses: Course[]
}

export interface UpdateAwardOrderPayload {
  type: AwardType
  awards: Award[]
}

export interface GlancePayload {
  category: GlanceCategory | string
  name: string
  grade: string
  date: Date | null
  order?: number
}

export interface ExistingGlancePayload extends GlancePayload {
  id: number
}

export interface UpdateGlanceOrderPayload {
  category: GlanceCategory | string
  parts: GlancePart[]
}

export interface YourBeatPayload {
  id: number
  question: string
  answer?: string
}

export interface UpdateYourBeat {
  questionId: number
  answer: string
}

export interface SendReferenceLinkPayload {
  email: string
}

export interface SendAcademicReferenceLinkPayload
  extends SendReferenceLinkPayload {
  type: ReferenceType.Academic
}

export interface SendActivityReferenceLinkPayload
  extends SendReferenceLinkPayload {
  type: ReferenceType.Activity
  activity: Activity
}

interface SendReferenceLinkSucceededPayload {
  referenceLink: ReferenceLink
}

export interface SendAcademicReferenceLinkSucceededPayload
  extends SendReferenceLinkSucceededPayload {
  activity?: undefined
}

export interface SendActivityReferenceLinkSucceededPayload
  extends SendReferenceLinkSucceededPayload {
  activity: Activity
}

export interface GetReferencePayload {
  userId: number
  token: string
}

export interface AddReferencePayload {
  userId: number
  token: string
  firstName: string
  lastName: string
  organization: string
  position: string
  image: File | null
  content: string
}

export interface UpdateCompletionStepPayload {
  step: CompletionStep
  status: CompletionStatus
}

export interface UpdateNavTabOrderPayload {
  tabOrder: number[]
}

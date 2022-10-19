export enum GetProfile {
  Trigger = `GET_PROFILE`,
  Succeeded = `GET_PROFILE_SUCCEEDED`,
  Failed = `GET_PROFILE_FAILED`,
}

export enum GetProfileTranscript {
  Trigger = `GET_PROFILE_TRANSCRIPT`,
  Succeeded = `GET_PROFILE_TRANSCRIPT_SUCCEEDED`,
  Failed = `GET_PROFILE_TRANSCRIPT_FAILED`,
}

export enum GetProfileExtracurriculars {
  Trigger = `GET_PROFILE_EXTRACURRICULARS`,
  Succeeded = `GET_PROFILE_EXTRACURRICULARS_SUCCEEDED`,
  Failed = `GET_PROFILE_EXTRACURRICULARS_FAILED`,
}

export enum GetProfileProfessional {
  Trigger = `GET_PROFILE_PROFESSIONAL`,
  Succeeded = `GET_PROFILE_PROFESSIONAL_SUCCEEDED`,
  Failed = `GET_PROFILE_PROFESSIONAL_FAILED`,
}

export enum GetProfileService {
  Trigger = `GET_PROFILE_SERVICE`,
  Succeeded = `GET_PROFILE_SERVICE_SUCCEEDED`,
  Failed = `GET_PROFILE_SERVICE_FAILED`,
}

export enum GetProfileRecognition {
  Trigger = `GET_PROFILE_RECOGNITION`,
  Succeeded = `GET_PROFILE_RECOGNITION_SUCCEEDED`,
  Failed = `GET_PROFILE_RECOGNITION_FAILED`,
}

export enum GetHighSchools {
  Trigger = `GET_HIGHSCHOOLS`,
  Succeeded = `GET_HIGHSCHOOLS_SUCCEEDED`,
  Failed = `GET_HIGHSCHOOLS_FAILED`,

  PromiseTrigger = `GET_HIGHSCHOOLS.TRIGGER`,
}

export enum UpdateMission {
  Trigger = `UPDATE_MISSION`,
  Succeeded = `UPDATE_MISSION_SUCCEEDED`,
  Failed = `UPDATE_MISSION_FAILED`,

  PromiseTrigger = `UPDATE_MISSION.TRIGGER`,
}

export enum UpdateGpa {
  Trigger = `UPDATE_GPA`,
  Succeeded = `UPDATE_GPA_SUCCEEDED`,
  Failed = `UPDATE_GPA_FAILED`,

  PromiseTrigger = `UPDATE_GPA.TRIGGER`,
}

export enum UpdateStandardizedTestFirstStep {
  Trigger = `UPDATE_STANDARDIZED_TESTS_FIRST_STEP`,
}

export enum UpdateStandardizedTests {
  Trigger = `UPDATE_STANDARDIZED_TESTS`,
  Succeeded = `UPDATE_STANDARDIZED_TESTS_SUCCEEDED`,
  Failed = `UPDATE_STANDARDIZED_TESTS_FAILED`,

  PromiseTrigger = `UPDATE_STANDARDIZED_TESTS.TRIGGER`,
}

export enum DeleteStandardizedTest {
  Trigger = `DELETE_STANDARDIZED_TEST`,
  Succeeded = `DELETE_STANDARDIZED_TEST_SUCCEEDED`,
  Failed = `DELETE_STANDARDIZED_TEST_FAILED`,

  PromiseTrigger = `DELETE_STANDARDIZED_TEST.TRIGGER`,
}

export enum CreateGlance {
  Trigger = `CREATE_GLANCE`,
  Succeeded = `CREATE_GLANCE_SUCCEEDED`,

  PromiseTrigger = `CREATE_GLANCE.TRIGGER`,
}

export enum UpdateGlance {
  Trigger = `UPDATE_GLANCE`,
  Succeeded = `UPDATE_GLANCE_SUCCEEDED`,

  PromiseTrigger = `UPDATE_GLANCE.TRIGGER`,
}

export enum DeleteGlance {
  Trigger = `DELETE_GLANCE`,
  Succeeded = `DELETE_GLANCE_SUCCEEDED`,

  PromiseTrigger = `DELETE_GLANCE.TRIGGER`,
}

export enum UpdateGlanceOrder {
  Trigger = `UPDATE_GLANCE_ORDER`,
  Succeeded = `UPDATE_GLANCE_ORDER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_GLANCE_ORDER.TRIGGER`,
}

export enum UploadFullTranscript {
  Trigger = `UPLOAD_FULL_TRANSCRIPT`,
  Succeeded = `UPLOAD_FULL_TRANSCRIPT_SUCCEEDED`,

  PromiseTrigger = `UPLOAD_FULL_TRANSCRIPT.TRIGGER`,
}

export enum GetFullTranscript {
  Trigger = `GET_FULL_TRANSCRIPT`,
  Succeeded = `GET_FULL_TRANSCRIPT_SUCCEEDED`,

  PromiseTrigger = `GET_FULL_TRANSCRIPT.TRIGGER`,
}

export enum GetGpa {
  Trigger = `GET_GPA`,
  Succeeded = `GET_GPA_SUCCEEDED`,
}

export enum UpdateExtracurricularOrder {
  Trigger = `UPDATE_EXTRACURRICULAR_ORDER`,
  Succeeded = `UPDATE_EXTRACURRICULAR_ORDER_SUCCEEDED`,
  Failed = `UPDATE_EXTRACURRICULAR_ORDER_FAILED`,

  PromiseTrigger = `UPDATE_EXTRACURRICULAR_ORDER.TRIGGER`,
}

export enum UpdateAcademicAwards {
  Trigger = `UPDATE_ACADEMIC_AWARDS`,
  Succeeded = `UPDATE_ACADEMIC_AWARDS_SUCCEEDED`,
  Failed = `UPDATE_ACADEMIC_AWARDS_FAILED`,

  PromiseTrigger = `UPDATE_ACADEMIC_AWARDS.TRIGGER`,
}

export enum UpdateExtracurricularAwards {
  Trigger = `UPDATE_EXTRACURRICULAR_AWARDS`,
  Succeeded = `UPDATE_EXTRACURRICULAR_AWARDS_SUCCEEDED`,
  Failed = `UPDATE_EXTRACURRICULAR_AWARDS_FAILED`,

  PromiseTrigger = `UPDATE_EXTRACURRICULAR_AWARDS.TRIGGER`,
}

export enum UpdateSchoolarshipAwards {
  Trigger = `UPDATE_SCHOOLARSHIP_AWARDS`,
  Succeeded = `UPDATE_SCHOOLARSHIP_AWARDS_SUCCEEDED`,
  Failed = `UPDATE_SCHOOLARSHIP_AWARDS_FAILED`,

  PromiseTrigger = `UPDATE_SCHOOLARSHIP_AWARDS.TRIGGER`,
}

export enum AddExtracurricularsQuote {
  Trigger = `ADD_EXTRACURRICULARS_QUOTE`,
  Succeeded = `ADD_EXTRACURRICULARS_QUOTE_SUCCEEDED`,
  Failed = `ADD_EXTRACURRICULARS_QUOTE_FAILED`,

  PromiseTrigger = `ADD_EXTRACURRICULARS_QUOTE.TRIGGER`,
}

export enum UpdateExtracurricularsQuote {
  Trigger = `UPDATE_EXTRACURRICULARS_QUOTE`,
  Succeeded = `UPDATE_EXTRACURRICULARS_QUOTE_SUCCEEDED`,
  Failed = `UPDATE_EXTRACURRICULARS_QUOTE_FAILED`,

  PromiseTrigger = `UPDATE_EXTRACURRICULARS_QUOTE.TRIGGER`,
}

export enum AddProfessionalQuote {
  Trigger = `ADD_PROFESSIONAL_QUOTE`,
  Succeeded = `ADD_PROFESSIONAL_QUOTE_SUCCEEDED`,
  Failed = `ADD_PROFESSIONAL_QUOTE_FAILED`,

  PromiseTrigger = `ADD_PROFESSIONAL_QUOTE.TRIGGER`,
}

export enum UpdateProfessionalQuote {
  Trigger = `UPDATE_PROFESSIONAL_QUOTE`,
  Succeeded = `UPDATE_PROFESSIONAL_QUOTE_SUCCEEDED`,
  Failed = `UPDATE_PROFESSIONAL_QUOTE_FAILED`,

  PromiseTrigger = `UPDATE_PROFESSIONAL_QUOTE.TRIGGER`,
}

export enum AddServiceQuote {
  Trigger = `ADD_SERVICE_QUOTE`,
  Succeeded = `ADD_SERVICE_QUOTE_SUCCEEDED`,
  Failed = `ADD_SERVICE_QUOTE_FAILED`,

  PromiseTrigger = `ADD_SERVICE_QUOTE.TRIGGER`,
}

export enum UpdateServiceQuote {
  Trigger = `UPDATE_SERVICE_QUOTE`,
  Succeeded = `UPDATE_SERVICE_QUOTE_SUCCEEDED`,
  Failed = `UPDATE_SERVICE_QUOTE_FAILED`,

  PromiseTrigger = `UPDATE_SERVICE_QUOTE.TRIGGER`,
}

export enum AddRecognitionQuote {
  Trigger = `ADD_RECOGNITION_QUOTE`,
  Succeeded = `ADD_RECOGNITION_QUOTE_SUCCEEDED`,
  Failed = `ADD_RECOGNITION_QUOTE_FAILED`,

  PromiseTrigger = `ADD_RECOGNITION_QUOTE.TRIGGER`,
}

export enum UpdateRecognitionQuote {
  Trigger = `UPDATE_RECOGNITION_QUOTE`,
  Succeeded = `UPDATE_RECOGNITION_QUOTE_SUCCEEDED`,
  Failed = `UPDATE_RECOGNITION_QUOTE_FAILED`,

  PromiseTrigger = `UPDATE_RECOGNITION_QUOTE.TRIGGER`,
}

export enum CreateCourse {
  Trigger = `CREATE_COURSE`,
  Succeeded = `CREATE_COURSE_SUCCEEDED`,

  PromiseTrigger = `CREATE_COURSE.TRIGGER`,
}

export enum UpdateCourse {
  Trigger = `UPDATE_COURSE`,
  Succeeded = `UPDATE_COURSE_SUCCEEDED`,

  PromiseTrigger = `UPDATE_COURSE.TRIGGER`,
}

export enum DeleteCourse {
  Trigger = `DELETE_COURSE`,
  Succeeded = `DELETE_COURSE_SUCCEEEDED`,

  PromiseTrigger = `DELETE_COURSE.TRIGGER`,
}

export enum UpdateCourseOrder {
  Trigger = `UPDATE_COURSE_ORDER`,
  Succeeded = `UPDATE_COURSE_ORDER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_COURSE_ORDER.TRIGGER`,
}

export enum CreateAward {
  Trigger = `CREATE_AWARD`,
  Succeeded = `CREATE_AWARD_SUCCEEDED`,

  PromiseTrigger = `CREATE_AWARD.TRIGGER`,
}

export enum UpdateAward {
  Trigger = `UPDATE_AWARD`,
  Succeeded = `UPDATE_AWARD_SUCCEEDED`,

  PromiseTrigger = `UPDATE_AWARD.TRIGGER`,
}

export enum DeleteAward {
  Trigger = `DELETE_AWARD`,
  Succeeded = `DELETE_AWARD_SUCCEEEDED`,

  PromiseTrigger = `DELETE_AWARD.TRIGGER`,
}

export enum UpdateAwardOrder {
  Trigger = `UPDATE_AWARD_ORDER`,
  Succeeded = `UPDATE_AWARD_ORDER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_AWARD_ORDER.TRIGGER`,
}

export enum CreateActivity {
  Trigger = `CREATE_ACTIVITY`,
  Succeeded = `CREATE_ACTIVITY_SUCCEEDED`,

  PromiseTrigger = `CREATE_ACTIVITY.TRIGGER`,
}

export enum UpdateActivity {
  Trigger = `UPDATE_ACTIVITY`,
  Succeeded = `UPDATE_ACTIVITY_SUCCEEDED`,

  PromiseTrigger = `UPDATE_ACTIVITY.TRIGGER`,
}

export enum DeleteActivity {
  Trigger = `DELETE_ACTIVITY`,
  Succeeded = `DELETE_ACTIVITY_SUCCEEEDED`,

  PromiseTrigger = `DELETE_ACTIVITY.TRIGGER`,
}

export enum UploadActivityLogo {
  Trigger = `UPLOAD_ACTIVITY_LOGO`,
  Succeeded = `UPLOAD_ACTIVITY_LOGO_SUCCEEEDED`,

  PromiseTrigger = `UPLOAD_ACTIVITY_LOGO.TRIGGER`,
}

export enum DeleteActivityLogo {
  Trigger = `DELETE_ACTIVITY_LOGO`,
  Succeeded = `DELETE_ACTIVITY_LOGO_SUCCEEEDED`,

  PromiseTrigger = `DELETE_ACTIVITY_LOGO.TRIGGER`,
}

export enum GetYourBeat {
  Trigger = `GET_YOUR_BEAT`,
  Succeeded = `GET_YOUR_BEAT_SUCCEEDED`,
  Failed = `GET_YOUR_BEAT_FAILED`,
}

export enum UpdateYourBeat {
  Trigger = `UPDATE_YOUR_BEAT`,
  Succeeded = `UPDATE_YOUR_BEAT_SUCCEEDED`,

  PromiseTrigger = `UPDATE_YOUR_BEAT.TRIGGER`,
}

export enum GetActivityTypes {
  Trigger = `GET_ACTIVITY_TYPES`,
  Succeeded = `GET_ACTIVITY_TYPES_SUCCEEDED`,
  Failed = `GET_ACTIVITY_TYPES_FAILED`,
}

export const GetCurrentActivity = `GET_CURRENT_ACTIVITY`

export const ToggleGPAModal = `TOGGLE_GPA_MODAL`

export enum GetReferences {
  Trigger = `GET_REFERENCES`,
  Succeeded = `GET_REFERENCES_SUCCEEDED`,
}

export enum DeleteReference {
  Trigger = `DELETE_REFERENCE`,
  Succeeded = `DELETE_REFERENCE_SUCCEEDED`,

  PromiseTrigger = `DELETE_REFERENCE.TRIGGER`,
}

export enum SendReferenceLink {
  Trigger = `SEND_REFERENCE_LINK`,
  Succeeded = `SEND_REFERENCE_LINK_SUCCEEDED`,

  PromiseTrigger = `SEND_REFERENCE_LINK.TRIGGER`,
}

export enum GetReference {
  Trigger = `GET_REFERENCE`,
  Succeeded = `GET_REFERENCE_SUCCEEDED`,
}

export enum AddReference {
  Trigger = `ADD_REFERENCE`,
  Succeeded = `ADD_REFERENCE_SUCCEEDED`,

  PromiseTrigger = `ADD_REFERENCE.TRIGGER`,
}

export enum GetUnacceptedReferences {
  Trigger = `GET_UNACCEPTED_REFERENCES`,
  Succeeded = `GET_UNACCEPTED_REFERENCES_SUCCEEDED`,
}

export enum AcceptReference {
  Trigger = `ACCEPT_REFERENCE`,
  Succeeded = `ACCEPT_REFERENCE_SUCCEEDED`,

  PromiseTrigger = `ACCEPT_REFERENCE.TRIGGER`,
}

export enum RejectReference {
  Trigger = `REJECT_REFERENCE`,
  Succeeded = `REJECT_REFERENCE_SUCCEEDED`,

  PromiseTrigger = `REJECT_REFERENCE.TRIGGER`,
}

export enum UpdateCompletionStep {
  Trigger = `UPDATE_COMPLETION_STEP`,
}

export enum UpdateNavTabsOrder {
  Trigger = `UPDATE_NAV_TABS_ORDER`,
  Succeeded = `UPDATE_NAV_TABS_ORDER_SUCCEEDED`,

  PromiseTrigger = `UPDATE_NAV_TABS_ORDER.TRIGGER`,
}

export const ToggleStandardizedTestModal = `TOGGLE_STANDARDIZED_TEST_MODAL`
export const ToggleTranscriptAtGlanceModal = `TOGGLE_TRANSCRIPT_AT_GLANCE_MODAL`
export const ToggleAddTranscriptAtGlanceModal =
  `TOGGLE_ADD_TRANSCRIPT_AT_GLANCE_MODAL`
export const ToggleEditTranscriptAtGlanceModal =
  `TOGGLE_EDIT_TRANSCRIPT_AT_GLANCE_MODAL`
export const ToggleApCoursesModal = `TOGGLE_AP_COURSES_MODAL`
export const ToggleAddApCoursesModal = `TOGGLE_ADD_AP_COURSES_MODAL`
export const ToggleEditApCoursesModal = `TOGGLE_EDIT_AP_COURSES_MODAL`
export const ToggleCollegeCoursesModal = `TOGGLE_COLLEGE_COURSES_MODAL`
export const ToggleAddCollegeCourseModal = `TOGGLE_ADD_COLLEGE_COURSE_MODAL`
export const ToggleEditCollegeCourseModal = `TOGGLE_EDIT_COLLEGE_COURSE_MODAL`
export const ToggleSubjectCoursesModal = `TOGGLE_SUBJECT_COURSES_MODAL`
export const ToggleAddSubjectCoursesModal = `TOGGLE_ADD_SUBJECT_COURSES_MODAL`
export const ToggleEditSubjectCoursesModal = `TOGGLE_EDIT_SUBJECT_COURSES_MODAL`
export const ToggleExtracurricularsQuoteModal =
  `TOGGLE_EXTRACURRICULARS_QUOTE_MODAL`
export const ToggleProfessionalQuoteModal = `TOGGLE_PROFESSIONAL_QUOTE_MODAL`
export const ToggleServiceQuoteModal = `TOGGLE_SERVICE_QUOTE_MODAL`
export const ToggleRecognitionQuoteModal = `TOGGLE_RECOGNITION_QUOTE_MODAL`
export const ToggleAcademicAwardsModal = `TOGGLE_ACADEMIC_AWARDS_MODAL`
export const ToggleExtracurricularsAwardsModal =
  `TOGGLE_EXTRACURRICULARS_AWARDS_MODAL`
export const ToggleSchoolarshipAwardsModal = `TOGGLE_SCHOOLARSHIP_AWARDS_MODAL`
export const ToggleAddAcademicAwardsModal = `TOGGLE_ADD_ACADEMIC_AWARDS_MODAL`
export const ToggleAddExtracurricularsAwardsModal =
  `TOGGLE_ADD_EXTRACURRICULARS_AWARDS_MODAL`
export const ToggleAddSchoolarshipAwardsModal =
  `TOGGLE_ADD_SCHOOLARSHIP_AWARDS_MODAL`
export const ToggleEditAcademicAwardsModal = `TOGGLE_EDIT_ACADEMIC_AWARDS_MODAL`
export const ToggleEditExtracurricularsAwardsModal =
  `TOGGLE_EDIT_EXTRACURRICULARS_AWARDS_MODAL`
export const ToggleEditSchoolarshipAwardsModal =
  `TOGGLE_EDIT_SCHOOLARSHIP_AWARDS_MODAL`
export const ToggleAddActivityModal = `TOGGLE_ADD_ACTIVITY_MODAL`
export const ToggleAddActivitySecondStep = `TOGGLE_ADD_ACTIVITY_SECOND_STEP`
export const ToggleEditActivityModal = `TOGGLE_EDIT_ACTIVITY_MODAL`
export const ToggleMissionStatementModal = `TOGGLE_MISSION_STATEMENT_MODAL`
export const ToggleYourBeatModal = `TOGGLE_YOUR_BEAT_MODAL`
export const ToggleUploadActivityLogoModal = `TOGGLE_UPLOAD_ACTIVITY_LOGO_MODAL`

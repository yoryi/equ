// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Responses from "../../sagas/profile/responses"
import * as Types from "../../types"
import { ActivityType, GPA, StandardizedTestCategory } from "../../types"
import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"
import * as Payloads from "./payloads"

export const getProfile = (): Action => ({
  type: ActionTypes.GetProfile.Trigger,
})
export const getProfileSucceeded = (
  payload: Types.Profile,
): Actions.PayloadAction<Types.Profile> => ({
  type: ActionTypes.GetProfile.Succeeded,
  payload,
})
export const getProfileFailed = (
  payload: Payloads.GetProfileFailedPayload,
): Actions.PayloadAction<Payloads.GetProfileFailedPayload> => ({
  type: ActionTypes.GetProfile.Failed,
  payload,
})

export const getProfileTranscript = (): Action => ({
  type: ActionTypes.GetProfileTranscript.Trigger,
})
export const getProfileTranscriptSucceeded = (
  payload: Types.ProfileTranscript,
): Actions.PayloadAction<Types.ProfileTranscript> => ({
  type: ActionTypes.GetProfileTranscript.Succeeded,
  payload,
})
export const getProfileTranscriptFailed = (): Action => ({
  type: ActionTypes.GetProfileTranscript.Failed,
})

export const getProfileExtracurriculars = (): Action => ({
  type: ActionTypes.GetProfileExtracurriculars.Trigger,
})
export const getProfileExtracurricularsSucceeded = (
  payload: Types.ProfileExtracurriculars,
): Actions.PayloadAction<Types.ProfileExtracurriculars> => ({
  type: ActionTypes.GetProfileExtracurriculars.Succeeded,
  payload,
})
export const getProfileExtracurricularsFailed = (): Action => ({
  type: ActionTypes.GetProfileExtracurriculars.Failed,
})

export const getProfileProfessional = (): Action => ({
  type: ActionTypes.GetProfileProfessional.Trigger,
})
export const getProfileProfessionalSucceeded = (
  payload: Types.ProfileProfessional,
): Actions.PayloadAction<Types.ProfileProfessional> => ({
  type: ActionTypes.GetProfileProfessional.Succeeded,
  payload,
})
export const getProfileProfessionalFailed = (): Action => ({
  type: ActionTypes.GetProfileProfessional.Failed,
})

export const getProfileService = (): Action => ({
  type: ActionTypes.GetProfileService.Trigger,
})
export const getProfileServiceSucceeded = (
  payload: Types.ProfileService,
): Actions.PayloadAction<Types.ProfileService> => ({
  type: ActionTypes.GetProfileService.Succeeded,
  payload,
})
export const getProfileServiceFailed = (): Action => ({
  type: ActionTypes.GetProfileService.Failed,
})

export const getProfileRecognition = (): Action => ({
  type: ActionTypes.GetProfileRecognition.Trigger,
})
export const getProfileRecognitionSucceeded = (
  payload: Types.ProfileRecognition,
): Actions.PayloadAction<Types.ProfileRecognition> => ({
  type: ActionTypes.GetProfileRecognition.Succeeded,
  payload,
})
export const getProfileRecognitionFailed = (): Action => ({
  type: ActionTypes.GetProfileRecognition.Failed,
})

export const getHighSchools = (payload: any): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.GetHighSchools.Trigger)(payload)
export const getHighSchoolsSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetHighSchools.Succeeded,
  payload,
})
export const getHighSchoolsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.GetHighSchools.Failed,
  err,
})

export const toggleMissionStatementModal = (payload: boolean) => ({
  type: ActionTypes.ToggleMissionStatementModal,
  payload,
})
export const updateMission = (
  payload: Payloads.MissionPayload,
): Actions.PromiseAction<Payloads.MissionPayload> =>
  createPromiseAction(ActionTypes.UpdateMission.Trigger)(payload)
export const updateMissionSucceeded = (
  payload: Payloads.MissionPayload,
): Actions.PayloadAction<Payloads.MissionPayload> => ({
  type: ActionTypes.UpdateMission.Succeeded,
  payload,
})
export const updateMissionFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateMission.Failed,
  err,
})

export const toggleGPAModal = (payload: boolean) => ({
  type: ActionTypes.ToggleGPAModal,
  payload,
})
export const updateGPA = (payload: any[]): Actions.PromiseAction<GPA[]> =>
  createPromiseAction(ActionTypes.UpdateGpa.Trigger)(payload)
export const updateGPASucceeded = (
  payload: GPA[],
): Actions.PayloadAction<GPA[]> => ({
  type: ActionTypes.UpdateGpa.Succeeded,
  payload,
})
export const updateGPAFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateGpa.Failed,
  err,
})

export const getGPA = (): Action => ({
  type: ActionTypes.GetGpa.Trigger,
})
export const getGPASucceeded = (payload: any): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetGpa.Succeeded,
  payload,
})

export const updateStandarizedTestFirstStep = (
  payload: Payloads.UpdateStandardizedTestsFirstStep,
): Actions.PayloadAction<Payloads.UpdateStandardizedTestsFirstStep> => ({
  type: ActionTypes.UpdateStandardizedTestFirstStep.Trigger,
  payload,
})

export const toggleStandardizedTestModal = (payload: boolean) => ({
  type: ActionTypes.ToggleStandardizedTestModal,
  payload,
})
export const updateStandardizedTests = (
  payload: StandardizedTestCategory,
): Actions.PromiseAction<StandardizedTestCategory> =>
  createPromiseAction(ActionTypes.UpdateStandardizedTests.Trigger)(payload)
export const updateStandardizedTestsSucceeded = (
  payload: StandardizedTestCategory,
): Actions.PayloadAction<StandardizedTestCategory> => ({
  type: ActionTypes.UpdateStandardizedTests.Succeeded,
  payload,
})
export const updateStandardizedTestsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateStandardizedTests.Failed,
  err,
})

export const deleteStandardizedTest = (
  payload: StandardizedTestCategory,
): Actions.PromiseAction<StandardizedTestCategory> =>
  createPromiseAction(ActionTypes.DeleteStandardizedTest.Trigger)(payload)
export const deleteStandardizedTestSucceeded = (
  payload: StandardizedTestCategory,
): Actions.PayloadAction<StandardizedTestCategory> => ({
  type: ActionTypes.DeleteStandardizedTest.Succeeded,
  payload,
})
export const deleteStandardizedTestFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.DeleteStandardizedTest.Failed,
  err,
})

export const toggleCollegeCoursesModal = (payload: boolean) => ({
  type: ActionTypes.ToggleCollegeCoursesModal,
  payload,
})
export const toggleAddCollegeCourseModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddCollegeCourseModal,
  payload,
})
export const toggleEditCollegeCourseModal = (payload: number | undefined) => ({
  type: ActionTypes.ToggleEditCollegeCourseModal,
  payload,
})

export const toggleApCoursesModal = (payload: boolean) => ({
  type: ActionTypes.ToggleApCoursesModal,
  payload,
})
export const toggleAddApCoursesModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddApCoursesModal,
  payload,
})
export const toggleEditApCoursesModal = (payload: number | undefined) => ({
  type: ActionTypes.ToggleEditApCoursesModal,
  payload,
})

export const toggleSubjectCoursesModal = (payload: boolean) => ({
  type: ActionTypes.ToggleSubjectCoursesModal,
  payload,
})
export const toggleAddSubjectCoursesModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddSubjectCoursesModal,
  payload,
})
export const toggleEditSubjectCoursesModal = (payload: number | undefined) => ({
  type: ActionTypes.ToggleEditSubjectCoursesModal,
  payload,
})

export const toggleGlanceModal = (payload: string) => ({
  type: ActionTypes.ToggleTranscriptAtGlanceModal,
  payload,
})
export const toggleAddGlanceModal = (payload: string) => ({
  type: ActionTypes.ToggleAddTranscriptAtGlanceModal,
  payload,
})
export const toggleEditGlanceModal = (payload: number | undefined) => ({
  type: ActionTypes.ToggleEditTranscriptAtGlanceModal,
  payload,
})
export const createGlance = (
  payload: Payloads.GlancePayload,
): Actions.PromiseAction<Payloads.GlancePayload> =>
  createPromiseAction(ActionTypes.CreateGlance.Trigger)(payload)
export const createGlanceSucceeded = (
  payload: Responses.GlanceResponse,
): Actions.PayloadAction<Responses.GlanceResponse> => ({
  type: ActionTypes.CreateGlance.Succeeded,
  payload,
})

export const updateGlance = (
  payload: Payloads.ExistingGlancePayload,
): Actions.PromiseAction<Payloads.ExistingGlancePayload> =>
  createPromiseAction(ActionTypes.UpdateGlance.Trigger)(payload)
export const updateGlanceSucceeded = (
  payload: Payloads.ExistingGlancePayload,
): Actions.PayloadAction<Payloads.ExistingGlancePayload> => ({
  type: ActionTypes.UpdateGlance.Succeeded,
  payload,
})

export const deleteGlance = (
  payload: Payloads.ExistingGlancePayload,
): Actions.PromiseAction<Payloads.ExistingGlancePayload> =>
  createPromiseAction(ActionTypes.DeleteGlance.Trigger)(payload)
export const deleteGlanceSucceeded = (
  payload: Payloads.ExistingGlancePayload,
): Actions.PayloadAction<Payloads.ExistingGlancePayload> => ({
  type: ActionTypes.DeleteGlance.Succeeded,
  payload,
})

export const updateGlanceOrder = (
  payload: Payloads.UpdateGlanceOrderPayload,
): Actions.PromiseAction<Payloads.UpdateGlanceOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateGlanceOrder.Trigger)(payload)
export const updateGlanceOrderSucceeded = (
  payload: Payloads.UpdateGlanceOrderPayload,
): Actions.PayloadAction<Payloads.UpdateGlanceOrderPayload> => ({
  type: ActionTypes.UpdateGlanceOrder.Succeeded,
  payload,
})

export const uploadFullTranscript = (
  payload: any,
): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.UploadFullTranscript.Trigger)(payload)
export const uploadFullTranscriptSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.UploadFullTranscript.Succeeded,
  payload,
})

export const getFullTranscript = (
  id: number | null,
): Actions.PayloadAction<{ id: number | null }> => ({
  type: ActionTypes.GetFullTranscript.Trigger,
  payload: {
    id,
  },
})
export const getFullTranscriptSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetFullTranscript.Succeeded,
  payload,
})

export const toggleAcademicAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAcademicAwardsModal,
  payload,
})
export const toggleAddAcademicAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddAcademicAwardsModal,
  payload,
})
export const toggleEditAcademicAwardsModal = (payload: number | undefined) => ({
  type: ActionTypes.ToggleEditAcademicAwardsModal,
  payload,
})

export const toggleExtracurricularsAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleExtracurricularsAwardsModal,
  payload,
})
export const toggleAddExtracurricularsAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddExtracurricularsAwardsModal,
  payload,
})
export const toggleEditExtracurricularsAwardsModal = (
  payload: number | undefined,
) => ({
  type: ActionTypes.ToggleEditExtracurricularsAwardsModal,
  payload,
})

export const toggleSchoolarshipAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleSchoolarshipAwardsModal,
  payload,
})
export const toggleAddSchoolarshipAwardsModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddSchoolarshipAwardsModal,
  payload,
})
export const toggleEditSchoolarshipAwardsModal = (
  payload: number | undefined,
) => ({
  type: ActionTypes.ToggleEditSchoolarshipAwardsModal,
  payload,
})

export const updateExtracurricularOrder = (payload: {
  extracurricularOrder: string
}): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.UpdateExtracurricularOrder.Trigger)(payload)

export const toggleExtracurricularQuoteModal = (payload: boolean) => ({
  type: ActionTypes.ToggleExtracurricularsQuoteModal,
  payload,
})
export const addExtracurricularQuote = (
  payload: Types.Quotes,
): Actions.PromiseAction<Types.Quotes> =>
  createPromiseAction(ActionTypes.AddExtracurricularsQuote.Trigger)(payload)
export const addExtracurricularQuoteSucceeded = (
  payload: Types.Quotes,
): Actions.PayloadAction<Types.Quotes> => ({
  type: ActionTypes.AddExtracurricularsQuote.Succeeded,
  payload,
})
export const addExtracurricularQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.AddExtracurricularsQuote.Failed,
  err,
})
export const updateExtracurricularQuote = (
  payload: Types.QuotesPatch,
): Actions.PromiseAction<Types.QuotesPatch> =>
  createPromiseAction(ActionTypes.UpdateExtracurricularsQuote.Trigger)(payload)
export const updateExtracurricularQuoteSucceeded = (
  payload: Types.QuotesPatch,
): Actions.PayloadAction<Types.QuotesPatch> => ({
  type: ActionTypes.UpdateExtracurricularsQuote.Succeeded,
  payload,
})
export const updateExtracurricularQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateExtracurricularsQuote.Failed,
  err,
})

export const toggleProfessionalQuoteModal = (payload: boolean) => ({
  type: ActionTypes.ToggleProfessionalQuoteModal,
  payload,
})
export const addProfessionalQuote = (
  payload: Types.Quotes,
): Actions.PromiseAction<Types.Quotes> =>
  createPromiseAction(ActionTypes.AddProfessionalQuote.Trigger)(payload)
export const addProfessionalQuoteSucceeded = (
  payload: Types.Quotes,
): Actions.PayloadAction<Types.Quotes> => ({
  type: ActionTypes.AddProfessionalQuote.Succeeded,
  payload,
})
export const addProfessionalQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.AddProfessionalQuote.Failed,
  err,
})
export const updateProfessionalQuote = (
  payload: Types.QuotesPatch,
): Actions.PromiseAction<Types.QuotesPatch> =>
  createPromiseAction(ActionTypes.UpdateProfessionalQuote.Trigger)(payload)
export const updateProfessionalQuoteSucceeded = (
  payload: Types.QuotesPatch,
): Actions.PayloadAction<Types.QuotesPatch> => ({
  type: ActionTypes.UpdateProfessionalQuote.Succeeded,
  payload,
})
export const updateProfessionalQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateProfessionalQuote.Failed,
  err,
})

export const toggleServiceQuoteModal = (payload: boolean) => ({
  type: ActionTypes.ToggleServiceQuoteModal,
  payload,
})
export const addServiceQuote = (
  payload: Types.Quotes,
): Actions.PromiseAction<Types.Quotes> =>
  createPromiseAction(ActionTypes.AddServiceQuote.Trigger)(payload)
export const addServiceQuoteSucceeded = (
  payload: Types.Quotes,
): Actions.PayloadAction<Types.Quotes> => ({
  type: ActionTypes.AddServiceQuote.Succeeded,
  payload,
})
export const addServiceQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.AddServiceQuote.Failed,
  err,
})
export const updateServiceQuote = (
  payload: Types.QuotesPatch,
): Actions.PromiseAction<Types.QuotesPatch> =>
  createPromiseAction(ActionTypes.UpdateServiceQuote.Trigger)(payload)
export const updateServiceQuoteSucceeded = (
  payload: Types.QuotesPatch,
): Actions.PayloadAction<Types.QuotesPatch> => ({
  type: ActionTypes.UpdateServiceQuote.Succeeded,
  payload,
})
export const updateServiceQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateServiceQuote.Failed,
  err,
})

export const toggleRecognitionQuoteModal = (payload: boolean) => ({
  type: ActionTypes.ToggleRecognitionQuoteModal,
  payload,
})
export const addRecognitionQuote = (
  payload: Types.Quotes,
): Actions.PromiseAction<Types.Quotes> =>
  createPromiseAction(ActionTypes.AddRecognitionQuote.Trigger)(payload)
export const addRecognitionQuoteSucceeded = (
  payload: Types.Quotes,
): Actions.PayloadAction<Types.Quotes> => ({
  type: ActionTypes.AddRecognitionQuote.Succeeded,
  payload,
})
export const addRecognitionQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.AddRecognitionQuote.Failed,
  err,
})
export const updateRecognitionQuote = (
  payload: Types.QuotesPatch,
): Actions.PromiseAction<Types.QuotesPatch> =>
  createPromiseAction(ActionTypes.UpdateRecognitionQuote.Trigger)(payload)
export const updateRecognitionQuoteSucceeded = (
  payload: Types.QuotesPatch,
): Actions.PayloadAction<Types.QuotesPatch> => ({
  type: ActionTypes.UpdateRecognitionQuote.Succeeded,
  payload,
})
export const updateRecognitionQuoteFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateRecognitionQuote.Failed,
  err,
})

export const createCourse = (
  payload: Types.CreateCourse,
): Actions.PromiseAction<Types.CreateCourse> =>
  createPromiseAction(ActionTypes.CreateCourse.Trigger)(payload)
export const createCourseSucceeded = (
  payload: Types.CreateCourse,
): Actions.PayloadAction<Types.CreateCourse> => ({
  type: ActionTypes.CreateCourse.Succeeded,
  payload,
})

export const updateCourse = (
  payload: Types.CreateCourse,
): Actions.PromiseAction<Types.Course> =>
  createPromiseAction(ActionTypes.UpdateCourse.Trigger)(payload)
export const updateCourseSucceeded = (
  payload: Types.Course,
): Actions.PayloadAction<Types.Course> => ({
  type: ActionTypes.UpdateCourse.Succeeded,
  payload,
})

export const deleteCourse = (
  payload: Types.CreateCourse,
): Actions.PromiseAction<Types.Course> =>
  createPromiseAction(ActionTypes.DeleteCourse.Trigger)(payload)
export const deleteCourseSucceeded = (
  payload: Types.Course,
): Actions.PayloadAction<Types.Course> => ({
  type: ActionTypes.DeleteCourse.Succeeded,
  payload,
})

export const updateCourseOrder = (
  payload: Payloads.UpdateCourseOrderPayload,
): Actions.PromiseAction<Payloads.UpdateCourseOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateCourseOrder.Trigger)(payload)
export const updateCourseOrderSucceeded = (
  payload: Payloads.UpdateCourseOrderPayload,
): Actions.PayloadAction<Payloads.UpdateCourseOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateCourseOrder.Succeeded)(payload)

export const createAward = (
  payload: Types.Award,
): Actions.PromiseAction<Types.Award> =>
  createPromiseAction(ActionTypes.CreateAward.Trigger)(payload)
export const createAwardSucceeded = (
  payload: Types.Award,
): Actions.PayloadAction<Types.Award> => ({
  type: ActionTypes.CreateAward.Succeeded,
  payload,
})

export const updateAward = (
  payload: Types.Award,
): Actions.PromiseAction<Types.Award> =>
  createPromiseAction(ActionTypes.UpdateAward.Trigger)(payload)
export const updateAwardSucceeded = (
  payload: Types.Award,
): Actions.PayloadAction<Types.Award> => ({
  type: ActionTypes.UpdateAward.Succeeded,
  payload,
})

export const deleteAward = (
  payload: Types.Award,
): Actions.PromiseAction<Types.Award> =>
  createPromiseAction(ActionTypes.DeleteAward.Trigger)(payload)
export const deleteAwardSucceeded = (
  payload: Types.Award,
): Actions.PayloadAction<Types.Award> => ({
  type: ActionTypes.DeleteAward.Succeeded,
  payload,
})

export const updateAwardOrder = (
  payload: Payloads.UpdateAwardOrderPayload,
): Actions.PromiseAction<Payloads.UpdateAwardOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateAwardOrder.Trigger)(payload)
export const updateAwardOrderSucceeded = (
  payload: Payloads.UpdateAwardOrderPayload,
): Actions.PayloadAction<Payloads.UpdateAwardOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateAwardOrder.Succeeded)(payload)

export const toggleAddActivityModal = (
  payload: Types.ActivityType | string,
) => ({
  type: ActionTypes.ToggleAddActivityModal,
  payload,
})
export const toggleAddActivitySecondStep = (payload: number) => ({
  type: ActionTypes.ToggleAddActivitySecondStep,
  payload,
})
export const createActivity = (
  payload: Types.CreateActivity,
): Actions.PromiseAction<Types.CreateActivity> =>
  createPromiseAction(ActionTypes.CreateActivity.Trigger)(payload)
export const createActivitySucceeded = (
  payload: Types.CreateActivity,
): Actions.PayloadAction<Types.CreateActivity> => ({
  type: ActionTypes.CreateActivity.Succeeded,
  payload,
})

export const getActivityTypes = (): Action => ({
  type: ActionTypes.GetActivityTypes.Trigger,
})
export const getActivityTypesSucceeded = (
  payload: Payloads.YourBeatPayload[],
): Actions.PayloadAction<Payloads.YourBeatPayload[]> => ({
  type: ActionTypes.GetActivityTypes.Succeeded,
  payload,
})
export const getActivityTypesFailed = (): Action => ({
  type: ActionTypes.GetActivityTypes.Failed,
})

export const getCurrentActivity = (payload: {
  activityId: number
  activityType: ActivityType
}): any => ({
  type: ActionTypes.GetCurrentActivity,
  payload,
})

export const toggleEditActivityModal = (payload: number) => ({
  type: ActionTypes.ToggleEditActivityModal,
  payload,
})
export const updateActivity = (
  payload: Types.CreateActivity,
): Actions.PromiseAction<Types.CreateActivity> =>
  createPromiseAction(ActionTypes.UpdateActivity.Trigger)(payload)
export const updateActivitySucceeded = (
  payload: Types.CreateActivity,
): Actions.PayloadAction<Types.CreateActivity> => ({
  type: ActionTypes.UpdateActivity.Succeeded,
  payload,
})

export const deleteActivity = (payload: {
  id: number
  type: ActivityType
}): Actions.PromiseAction<{ id: number; type: ActivityType }> =>
  createPromiseAction(ActionTypes.DeleteActivity.Trigger)(payload)
export const deleteActivitySucceeded = (payload: {
  id: number
  type: ActivityType
}): Actions.PayloadAction<{ id: number; type: ActivityType }> => ({
  type: ActionTypes.DeleteActivity.Succeeded,
  payload,
})

export const toggleYourBeatModal = (payload: number) => ({
  type: ActionTypes.ToggleYourBeatModal,
  payload,
})
export const getYourBeat = (): Action => ({
  type: ActionTypes.GetYourBeat.Trigger,
})
export const getYourBeatSucceeded = (
  payload: Payloads.YourBeatPayload[],
): Actions.PayloadAction<Payloads.YourBeatPayload[]> => ({
  type: ActionTypes.GetYourBeat.Succeeded,
  payload,
})
export const getYourBeatFailed = (): Action => ({
  type: ActionTypes.GetYourBeat.Failed,
})

export const updateYourBeat = (
  payload: Payloads.UpdateYourBeat,
): Actions.PromiseAction<Payloads.UpdateYourBeat> =>
  createPromiseAction(ActionTypes.UpdateYourBeat.Trigger)(payload)
export const updateYourBeatSucceeded = (
  payload: Payloads.UpdateYourBeat,
): Actions.PayloadAction<Payloads.UpdateYourBeat> => ({
  type: ActionTypes.UpdateYourBeat.Succeeded,
  payload,
})

export const toggleUploadActivityLogoModal = (payload: boolean) => ({
  type: ActionTypes.ToggleUploadActivityLogoModal,
  payload,
})
export const uploadActivityLogo = (payload: {
  activityId: number
  activityType: ActivityType
  data: any
}): Actions.PromiseAction<{
  activityId: number
  activityType: ActivityType
  data: any
}> => createPromiseAction(ActionTypes.UploadActivityLogo.Trigger)(payload)
export const uploadActivityLogoSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.UploadActivityLogo.Succeeded,
  payload,
})
export const deleteActivityLogo = (payload: {
  activityId: number
  activityType: ActivityType
}): Actions.PromiseAction<{ activityId: number; activityType: ActivityType }> =>
  createPromiseAction(ActionTypes.DeleteActivityLogo.Trigger)(payload)
export const deleteActivityLogoSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.DeleteActivityLogo.Succeeded,
  payload,
})

export const getReferences = (
  payload: Types.ReferenceType,
): Actions.PayloadAction<Types.ReferenceType> => ({
  type: ActionTypes.GetReferences.Trigger,
  payload,
})
export const getReferencesSucceeded = (payload: {
  type: Types.ReferenceType
  references: Types.Reference[]
}): Actions.PayloadAction<{
  type: Types.ReferenceType
  references: Types.Reference[]
}> => ({
  type: ActionTypes.GetReferences.Succeeded,
  payload,
})

export const deleteReference = (
  payload: Types.Reference,
): Actions.PromiseAction<Types.Reference> =>
  createPromiseAction(ActionTypes.DeleteReference.Trigger)(payload)
export const deleteReferenceSucceeded = (
  payload: Types.Reference,
): Actions.PayloadAction<Types.Reference> => ({
  type: ActionTypes.DeleteReference.Succeeded,
  payload,
})

export const sendReferenceLink = (
  payload:
    | Payloads.SendAcademicReferenceLinkPayload
    | Payloads.SendActivityReferenceLinkPayload,
): Actions.PromiseAction<
  Payloads.SendReferenceLinkPayload | Payloads.SendActivityReferenceLinkPayload
> => createPromiseAction(ActionTypes.SendReferenceLink.Trigger)(payload)
export const sendReferenceLinkSucceeded = (
  payload:
    | Payloads.SendAcademicReferenceLinkSucceededPayload
    | Payloads.SendActivityReferenceLinkSucceededPayload,
): Actions.PayloadAction<
  | Payloads.SendAcademicReferenceLinkSucceededPayload
  | Payloads.SendActivityReferenceLinkSucceededPayload
> => ({
  type: ActionTypes.SendReferenceLink.Succeeded,
  payload,
})

export const getReference = (
  payload: Payloads.GetReferencePayload,
): Actions.PayloadAction<Payloads.GetReferencePayload> => ({
  type: ActionTypes.GetReference.Trigger,
  payload,
})
export const getReferenceSucceeded = (
  payload: Types.UnsubmittedReference,
): Actions.PayloadAction<Types.UnsubmittedReference> => ({
  type: ActionTypes.GetReference.Succeeded,
  payload,
})

export const addReference = (
  payload: Payloads.AddReferencePayload,
): Actions.PromiseAction<Payloads.AddReferencePayload> =>
  createPromiseAction(ActionTypes.AddReference.Trigger)(payload)
export const addReferenceSucceeded = (
  payload: Types.Reference,
): Actions.PayloadAction<Types.Reference> => ({
  type: ActionTypes.AddReference.Succeeded,
  payload,
})

export const getUnacceptedReferences = (): Action => ({
  type: ActionTypes.GetUnacceptedReferences.Trigger,
})
export const getUnacceptedReferencesSucceeded = (
  payload: Types.Reference[],
): Actions.PayloadAction<Types.Reference[]> => ({
  type: ActionTypes.GetUnacceptedReferences.Succeeded,
  payload,
})

export const acceptReference = (
  payload: Types.Reference,
): Actions.PromiseAction<Types.Reference> =>
  createPromiseAction(ActionTypes.AcceptReference.Trigger)(payload)
export const acceptReferenceSucceeded = (
  payload: Types.Reference,
): Actions.PayloadAction<Types.Reference> => ({
  type: ActionTypes.AcceptReference.Succeeded,
  payload,
})

export const rejectReference = (
  payload: Types.Reference,
): Actions.PromiseAction<Types.Reference> =>
  createPromiseAction(ActionTypes.RejectReference.Trigger)(payload)
export const rejectReferenceSucceeded = (
  payload: Types.Reference,
): Actions.PayloadAction<Types.Reference> => ({
  type: ActionTypes.RejectReference.Succeeded,
  payload,
})

export const updateCompletionStep = (
  payload: Payloads.UpdateCompletionStepPayload,
): Actions.PayloadAction<Payloads.UpdateCompletionStepPayload> => ({
  type: ActionTypes.UpdateCompletionStep.Trigger,
  payload,
})

export const updateNavTabsOrder = (
  payload: Payloads.UpdateNavTabOrderPayload,
): Actions.PromiseAction<Payloads.UpdateNavTabOrderPayload> =>
  createPromiseAction(ActionTypes.UpdateNavTabsOrder.Trigger)(payload)
export const updateNavTabsOrderSucceeded = (
  payload: Payloads.UpdateNavTabOrderPayload,
): Actions.PayloadAction<Payloads.UpdateNavTabOrderPayload> => ({
  type: ActionTypes.UpdateNavTabsOrder.Succeeded,
  payload,
})

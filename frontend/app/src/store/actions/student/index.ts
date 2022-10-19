//Action types
//Types
import { Action } from "redux"

import {   GetStudentReferencesRequestPayload,
GetStudentReferencesSucceededPayload ,   Profile,
  ProfileExtracurriculars,
  ProfileProfessional,
  ProfileRecognition,
  ProfileService,
  ProfileTranscript,
StudentBeat ,
} from "../../types"
import * as Actions from "../actions"
import { PayloadAction } from "../actions"
import * as Payloads from "../profile/payloads"
import * as ActionTypes from "./actionTypes"

export const getStudentProfile = (payload: number): PayloadAction<number> => ({
  type: ActionTypes.GetStudentProfile.Trigger,
  payload,
})
export const getStudentProfileSucceeded = (
  payload: Profile,
): PayloadAction<Profile> => ({
  type: ActionTypes.GetStudentProfile.Succeeded,
  payload,
})
export const getStudentProfileFailed = (
  payload: Payloads.GetProfileFailedPayload,
): Actions.PayloadAction<Payloads.GetProfileFailedPayload> => ({
  type: ActionTypes.GetStudentProfile.Failed,
  payload,
})

export const getStudentTranscript = (
  payload: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetStudentTranscript.Trigger,
  payload,
})
export const getStudentTranscriptSucceeded = (
  payload: ProfileTranscript,
): PayloadAction<ProfileTranscript> => ({
  type: ActionTypes.GetStudentTranscript.Succeeded,
  payload,
})
export const getStudentTranscriptFailed = (): Action => ({
  type: ActionTypes.GetStudentTranscript.Failed,
})

export const getStudentExtracurriculars = (
  payload: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetStudentExtracurriculars.Trigger,
  payload,
})
export const getStudentExtracurricularsSucceeded = (
  payload: ProfileExtracurriculars,
): PayloadAction<ProfileExtracurriculars> => ({
  type: ActionTypes.GetStudentExtracurriculars.Succeeded,
  payload,
})
export const getStudentExtracurricularsFailed = (): Action => ({
  type: ActionTypes.GetStudentExtracurriculars.Failed,
})

export const getStudentProfessional = (
  payload: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetStudentProfessional.Trigger,
  payload,
})
export const getStudentProfessionalSucceeded = (
  payload: ProfileProfessional,
): PayloadAction<ProfileProfessional> => ({
  type: ActionTypes.GetStudentProfessional.Succeeded,
  payload,
})
export const getStudentProfessionalFailed = (): Action => ({
  type: ActionTypes.GetStudentProfessional.Failed,
})

export const getStudentService = (payload: number): PayloadAction<number> => ({
  type: ActionTypes.GetStudentService.Trigger,
  payload,
})
export const getStudentServiceSucceeded = (
  payload: ProfileService,
): PayloadAction<ProfileService> => ({
  type: ActionTypes.GetStudentService.Succeeded,
  payload,
})
export const getStudentServiceFailed = (): Action => ({
  type: ActionTypes.GetStudentService.Failed,
})

export const getStudentRecognition = (
  payload: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetStudentRecognition.Trigger,
  payload,
})
export const getStudentRecognitionSucceeded = (
  payload: ProfileRecognition,
): PayloadAction<ProfileRecognition> => ({
  type: ActionTypes.GetStudentRecognition.Succeeded,
  payload,
})
export const getStudentRecognitionFailed = (): Action => ({
  type: ActionTypes.GetStudentRecognition.Failed,
})

export const getStudentEquediBeat = (
  studentId: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetStudentEquediBeat.Trigger,
  payload: studentId,
})
export const getStudentEquediBeatSucceeded = (
  payload: StudentBeat,
): PayloadAction<StudentBeat> => ({
  type: ActionTypes.GetStudentEquediBeat.Succeeded,
  payload,
})
export const getStudentEquediBeatFailed = (): Action => ({
  type: ActionTypes.GetStudentEquediBeat.Failed,
})

export const getStudentReferences = (
  payload: GetStudentReferencesRequestPayload,
): PayloadAction<GetStudentReferencesRequestPayload> => ({
  type: ActionTypes.GetStudentReferences.Trigger,
  payload,
})
export const getStudentReferencesSucceeded = (
  payload: GetStudentReferencesSucceededPayload,
): PayloadAction<GetStudentReferencesSucceededPayload> => ({
  type: ActionTypes.GetStudentReferences.Succeeded,
  payload,
})
export const getStudentReferencesFailed = (): Action => ({
  type: ActionTypes.GetStudentReferences.Failed,
})

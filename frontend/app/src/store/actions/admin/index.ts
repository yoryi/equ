// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
import { Action } from "redux"

import {
  APIError,
  Reference,
  StudentUserList,
  UniversitiesAdminData,
  UniversityAdminData,
  UniversityAdministrator,
  UniversityContact,
  UpdateStudentAccountSettingsByAdminPayload,
} from "../../types"
import { APIErrorAction,PayloadAction, PromiseAction } from "../actions"
import { EmailPayload } from "../auth/payloads"
//Types
import * as ActionTypes from "./actionTypes"

export const getStudentsList = (): Action => ({
  type: ActionTypes.GetStudentsList.Trigger,
})
export const getStudentsListSucceeded = (
  payload: any,
): PayloadAction<StudentUserList> => ({
  type: ActionTypes.GetStudentsList.Succeeded,
  payload,
})
export const getStudentsListFailed = (): Action => ({
  type: ActionTypes.GetStudentsList.Failed,
})

export const getStudentByIdAdmin = (payload: number): any =>
  createPromiseAction(ActionTypes.GetStudentByIdAdmin.Trigger)(payload)
export const getStudentByIdAdminSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.GetStudentByIdAdmin.Succeeded,
  payload,
})
export const getStudentByIdAdminFailed = (): Action => ({
  type: ActionTypes.GetStudentByIdAdmin.Failed,
})

export const getUniversitiesAdminData = (): Action => ({
  type: ActionTypes.GetUniversitiesAdminData.Trigger,
})
export const getUniversitiesDataAdminDataSucceeded = (
  payload: UniversitiesAdminData,
): PayloadAction<UniversitiesAdminData> => ({
  type: ActionTypes.GetUniversitiesAdminData.Succeeded,
  payload,
})

export const getUniversityAdminData = (
  universityId: number,
): PayloadAction<number> => ({
  type: ActionTypes.GetUniversityAdminData.Trigger,
  payload: universityId,
})
export const getUniversityAdminDataSucceeded = (
  payload: UniversityAdminData,
): PayloadAction<UniversityAdminData> => ({
  type: ActionTypes.GetUniversityAdminData.Succeeded,
  payload,
})

export const updateUniversityEmail = (
  payload: UniversityContact,
): PromiseAction<UniversityContact> =>
  createPromiseAction(ActionTypes.UpdateUniversityEmail.Trigger)(payload)
export const updateUniversityEmailSucceeded = (
  payload: UniversityContact,
): PayloadAction<UniversityContact> => ({
  type: ActionTypes.UpdateUniversityEmail.Succeeded,
  payload,
})
export const updateUniversityEmailFailed = (): Action => ({
  type: ActionTypes.UpdateUniversityEmail.Failed,
})

export const assignUniversityProfile = (
  payload: UniversityAdministrator,
): PromiseAction<UniversityAdministrator> =>
  createPromiseAction(ActionTypes.AssignUniversityProfile.Trigger)(payload)
export const assignUniversityProfileSucceeded = (
  payload: UniversityAdministrator,
): PayloadAction<UniversityAdministrator> => ({
  type: ActionTypes.AssignUniversityProfile.Succeeded,
  payload,
})
export const assignUniversityProfileFailed = (): Action => ({
  type: ActionTypes.AssignUniversityProfile.Failed,
})

export const updateUniversityAdministrator = (
  payload: UniversityAdministrator,
): PromiseAction<UniversityAdministrator> =>
  createPromiseAction(ActionTypes.UpdateUniversityAdministrator.Trigger)(
    payload,
  )
export const updateUniversityAdministratorSucceeded = (
  payload: UniversityAdministrator,
): PayloadAction<UniversityAdministrator> => ({
  type: ActionTypes.UpdateUniversityAdministrator.Succeeded,
  payload,
})
export const updateUniversityAdministratorFailed = (): Action => ({
  type: ActionTypes.UpdateUniversityAdministrator.Failed,
})

export const unassignUniversityProfile = (): PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.UnassignUniversityProfile.Trigger)()
export const unassignUniversityProfileSucceeded = (): Action => ({
  type: ActionTypes.UnassignUniversityProfile.Succeeded,
})
export const unassignUniversityProfileFailed = (): Action => ({
  type: ActionTypes.UnassignUniversityProfile.Failed,
})

export const toggleUniversityVisibility = (): Action => ({
  type: ActionTypes.ToggleUniversityVisibility.Trigger,
})
export const toggleUniversityVisibilitySucceeded = (
  isVisible: boolean,
): PayloadAction<boolean> => ({
  type: ActionTypes.ToggleUniversityVisibility.Succeeded,
  payload: isVisible,
})
export const toggleUniversityVisibilityFailed = (): Action => ({
  type: ActionTypes.ToggleUniversityVisibility.Failed,
})

export const resetUniversityPassword = (
  payload: EmailPayload,
): PromiseAction<EmailPayload> =>
  createPromiseAction(ActionTypes.ResetUniversityPassword.Trigger)(payload)

export const resetStudentPassword = (payload: number): any =>
  createPromiseAction(ActionTypes.ResetStudentPassword.Trigger)(payload)
export const resetStudentPasswordSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.ResetStudentPassword.Succeeded,
  payload,
})
export const resetStudentPasswordFailed = (): Action => ({
  type: ActionTypes.ResetStudentPassword.Failed,
})

export const toggleLockStudentAccount = (payload: number): any =>
  createPromiseAction(ActionTypes.ToggleLockStudentAccount.Trigger)(payload)
export const toggleLockStudentAccountSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.ToggleLockStudentAccount.Succeeded,
  payload,
})
export const toggleLockStudentAccountFailed = (): Action => ({
  type: ActionTypes.ToggleLockStudentAccount.Failed,
})

export const deleteStudentAccount = (payload: number): any =>
  createPromiseAction(ActionTypes.DeleteStudentAccount.Trigger)(payload)
export const deleteStudentAccountSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.DeleteStudentAccount.Succeeded,
  payload,
})
export const deleteStudentAccountFailed = (): Action => ({
  type: ActionTypes.DeleteStudentAccount.Failed,
})

export const updateBaseStudentDataByAdmin = (
  payload: UpdateStudentAccountSettingsByAdminPayload,
): any =>
  createPromiseAction(ActionTypes.UpdateBaseStudentDataByAdmin.Trigger)(payload)
export const updateBaseStudentDataByAdminSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.UpdateBaseStudentDataByAdmin.Succeeded,
  payload,
})
export const updateBaseStudentDataByAdminFailed = (
  err: APIError,
): APIErrorAction => ({
  type: ActionTypes.UpdateBaseStudentDataByAdmin.Failed,
  err,
})

export const updateStudentNotificationSettingsByAdmin = (payload: any): any =>
  createPromiseAction(
    ActionTypes.UpdateStudentNotificationSettingsByAdmin.Trigger,
  )(payload)
export const updateStudentNotificationSettingsByAdminSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.UpdateStudentNotificationSettingsByAdmin.Succeeded,
  payload,
})
export const updateStudentNotificationSettingsByAdminFailed = (
  err: APIError,
): APIErrorAction => ({
  type: ActionTypes.UpdateStudentNotificationSettingsByAdmin.Failed,
  err,
})

export const updateStudentPrivacySettingsByAdmin = (payload: any): any =>
  createPromiseAction(ActionTypes.UpdateStudentPrivacySettingsByAdmin.Trigger)(
    payload,
  )
export const updateStudentPrivacySettingsByAdminSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.UpdateStudentPrivacySettingsByAdmin.Succeeded,
  payload,
})
export const updateStudentPrivacySettingsByAdminFailed = (
  err: APIError,
): APIErrorAction => ({
  type: ActionTypes.UpdateStudentPrivacySettingsByAdmin.Failed,
  err,
})

export const getPostReviewList = (): Action => ({
  type: ActionTypes.GetPostReviewAdminData.Trigger,
})
export const getPostReviewListSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.GetPostReviewAdminData.Succeeded,
  payload,
})
export const getPostReviewListFailed = (): Action => ({
  type: ActionTypes.GetPostReviewAdminData.Failed,
})

export const toggleReviewPost = (payload: { id: number; type: number }): any =>
  createPromiseAction(ActionTypes.ToggleReviewPost.Trigger)(payload)
export const toggleReviewPostSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.ToggleReviewPost.Succeeded,
  payload,
})
export const toggleReviewPostFailed = (): Action => ({
  type: ActionTypes.ToggleReviewPost.Failed,
})

export const getPostPreview = (payload: any): any =>
  createPromiseAction(ActionTypes.GetPostPreview.Trigger)(payload)
export const getPostPreviewSucceeded = (payload: any): PayloadAction<any> => ({
  type: ActionTypes.GetPostPreview.Succeeded,
  payload,
})
export const getPostPreviewFailed = () => ({
  type: ActionTypes.GetPostPreview.Failed,
})

export const deletePostByAdmin = (payload: {
  id: number
  type: number
  reason: string
  message: string
  isReviewed: boolean
}): any => createPromiseAction(ActionTypes.DeletePostByAdmin.Trigger)(payload)
export const deletePostByAdminSucceeded = (
  payload: any,
): PayloadAction<any> => ({
  type: ActionTypes.DeletePostByAdmin.Succeeded,
  payload,
})
export const deletePostByAdminFailed = () => ({
  type: ActionTypes.DeletePostByAdmin.Failed,
})

export const deletePostReference = (payload: {
  userId: number
  reference: Reference
}): PromiseAction<{ userId: number; reference: Reference }> =>
  createPromiseAction(ActionTypes.DeletePostReference.Trigger)(payload)
export const deletePostReferenceSucceeded = (
  payload: Reference,
): PayloadAction<Reference> => ({
  type: ActionTypes.DeletePostReference.Succeeded,
  payload,
})
export const deletePostReferenceFailed = () => ({
  type: ActionTypes.DeletePostReference.Failed,
})

export const mailStudentByAdmin = (payload: {
  email: string
  message: string
}): any => createPromiseAction(ActionTypes.MailStudentByAdmin.Trigger)(payload)
export const mailStudentByAdminSucceeded = () => ({
  type: ActionTypes.MailStudentByAdmin.Succeeded,
})
export const mailStudentByAdminFailed = () => ({
  type: ActionTypes.MailStudentByAdmin.Failed,
})

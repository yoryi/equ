// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Types from "../../types"
//Actions
import * as Actions from "../actions"
//Action types
import * as ActionTypes from "../settings/actionTypes"

export const getPrivacyAndSecuritySettings = (): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.GetPrivacyAndSecuritySettings.Trigger)()
export const getPrivacyAndSecuritySettingsSucceeded = (
  payload: Types.PrivacyAndSecuritySettings,
): Actions.PayloadAction<Types.PrivacyAndSecuritySettings> => ({
  type: ActionTypes.GetPrivacyAndSecuritySettings.Succeeded,
  payload,
})
export const getPrivacyAndSecuritySettingsFailed = () => ({
  type: ActionTypes.GetPrivacyAndSecuritySettings.Failed,
})

export const updatePrivacyAndSecuritySettings = (
  payload: Types.PrivacyAndSecuritySettings,
): Actions.PromiseAction<Types.PrivacyAndSecuritySettings> =>
  createPromiseAction(ActionTypes.UpdatePrivacyAndSecuritySettings.Trigger)(
    payload,
  )
export const updatePrivacyAndSecuritySettingsSucceeded = (
  payload: Types.PrivacyAndSecuritySettings,
): Actions.PayloadAction<Types.PrivacyAndSecuritySettings> => ({
  type: ActionTypes.UpdatePrivacyAndSecuritySettings.Succeeded,
  payload,
})

export const getNotificationsSettings = (): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.GetNotificationsSettings.Trigger)()
export const getNotificationsSettingsSucceeded = (
  payload: Types.NotificationsSettings,
): Actions.PayloadAction<Types.NotificationsSettings> => ({
  type: ActionTypes.GetNotificationsSettings.Succeeded,
  payload,
})

export const updateNotificationsSettings = (
  payload: Types.NotificationsSettings,
): Actions.PromiseAction<Types.NotificationsSettings> =>
  createPromiseAction(ActionTypes.UpdateNotificationsSettings.Trigger)(payload)
export const updateNotificationsSettingsSucceeded = (
  payload: Types.NotificationsSettings,
): Actions.PayloadAction<Types.NotificationsSettings> => ({
  type: ActionTypes.UpdateNotificationsSettings.Succeeded,
  payload,
})

export const updateStudentAccountSettings = (
  payload: Types.UpdateStudentAccountSettingsPayload,
): Actions.PromiseAction<Types.UpdateStudentAccountSettingsPayload> =>
  createPromiseAction(ActionTypes.UpdateStudentAccountSettings.Trigger)(payload)
export const updateStudentAccountSettingsSucceeded = (
  payload: Types.UpdateStudentAccountSettingsPayload,
): Actions.PayloadAction<Types.UpdateStudentAccountSettingsPayload> => ({
  type: ActionTypes.UpdateStudentAccountSettings.Succeeded,
  payload,
})

export const updateStudentPrivateAvatar = (
  payload: Types.UpdateStudentPrivateAvatarPayload,
): Actions.PromiseAction<Types.UpdateStudentPrivateAvatarPayload> =>
  createPromiseAction(ActionTypes.UpdateStudentsPrivateAvatar.Trigger)(payload)
export const updateStudentPrivateAvatarSucceeded = (
  payload: Types.UpdateStudentPrivateAvatarPayload,
): Actions.PayloadAction<Types.UpdateStudentPrivateAvatarPayload> => ({
  type: ActionTypes.UpdateStudentsPrivateAvatar.Succeeded,
  payload,
})

export const updateStudentAvatar = (
  payload: Types.CroppedImage,
): Actions.PromiseAction<Types.CroppedImage> =>
  createPromiseAction(ActionTypes.UpdateStudentAvatar.Trigger)(payload)
export const updateStudentAvatarSucceeded = (
  payload: Types.Media,
): Actions.PayloadAction<Types.Media> => ({
  type: ActionTypes.UpdateStudentAvatar.Succeeded,
  payload,
})

export const deleteStudentAvatar = (): Actions.PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.DeleteStudentAvatar.Trigger)()
export const deleteStudentAvatarSucceeded = (): Action => ({
  type: ActionTypes.DeleteStudentAvatar.Succeeded,
})

export const updateStudentCover = (
  payload: File,
): Actions.PromiseAction<File> =>
  createPromiseAction(ActionTypes.UpdateStudentCover.Trigger)(payload)
export const updateStudentCoverSucceeded = (
  payload: Types.Media,
): Actions.PayloadAction<Types.Media> => ({
  type: ActionTypes.UpdateStudentCover.Succeeded,
  payload,
})

export const deleteStudentCover = (): Actions.PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.DeleteStudentCover.Trigger)()
export const deleteStudentCoverSucceeded = (): Action => ({
  type: ActionTypes.DeleteStudentCover.Succeeded,
})

export const updateUniversityAvatar = (
  payload: Types.CroppedImage,
): Actions.PromiseAction<Types.CroppedImage> =>
  createPromiseAction(ActionTypes.UpdateUniversityAvatar.Trigger)(payload)
export const updateUniversityAvatarSucceeded = (
  payload: Types.Media,
): Actions.PayloadAction<Types.Media> => ({
  type: ActionTypes.UpdateUniversityAvatar.Succeeded,
  payload,
})

export const deleteUniversityAvatar = (): Actions.PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.DeleteUniversityAvatar.Trigger)()
export const deleteUniversityAvatarSucceeded = (): Action => ({
  type: ActionTypes.DeleteUniversityAvatar.Succeeded,
})

export const updateUniversityCover = (
  payload: File,
): Actions.PromiseAction<File> =>
  createPromiseAction(ActionTypes.UpdateUniversityCover.Trigger)(payload)
export const updateUniversityCoverSucceeded = (
  payload: Types.Media,
): Actions.PayloadAction<Types.Media> => ({
  type: ActionTypes.UpdateUniversityCover.Succeeded,
  payload,
})

export const deleteUniversityCover = (): Actions.PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.DeleteUniversityCover.Trigger)()
export const deleteUniversityCoverSucceeded = (): Action => ({
  type: ActionTypes.DeleteUniversityCover.Succeeded,
})

export const getUniversityAccountSettings = (): Action => ({
  type: ActionTypes.GetUniversityAccountSettings.Trigger,
})
export const getUniversityAccountSettingsSucceeded = (
  payload: Types.UniversityAccountSettings,
): Actions.PayloadAction<Types.UniversityAccountSettings> => ({
  type: ActionTypes.GetUniversityAccountSettings.Succeeded,
  payload,
})

export const updateUniversityAccountSettings = (
  payload: Types.UniversityAccountSettings,
): Actions.PromiseAction<Types.UniversityAccountSettings> =>
  createPromiseAction(ActionTypes.UpdateUniversityAccountSettings.Trigger)(
    payload,
  )
export const updateUniversityAccountSettingsSucceeded = (
  payload: Types.UniversityAccountSettings,
): Actions.PayloadAction<Types.UniversityAccountSettings> => ({
  type: ActionTypes.UpdateUniversityAccountSettings.Succeeded,
  payload,
})

export const getUniversityPageAdministrator = (): Action => ({
  type: ActionTypes.GetUniversityPageAdministrator.Trigger,
})
export const getUniversityPageAdministratorSucceeded = (
  payload: Types.PageAdministrator | null,
): Actions.PayloadAction<Types.PageAdministrator | null> => ({
  type: ActionTypes.GetUniversityPageAdministrator.Succeeded,
  payload,
})

export const closeAccount = () =>
  createPromiseAction(ActionTypes.CloseAccount.Trigger)()

export const toggleChangePasswordModal = (payload: boolean) => ({
  type: ActionTypes.ToggleChangePasswordModal,
  payload,
})

export const toggleChangePrivateAvatarModal = (payload: boolean) => ({
  type: ActionTypes.ToggleChangePrivateAvatarModal,
  payload,
})

export const toggleCloseAccountModal = () => ({
  type: ActionTypes.ToggleCloseAccountModal,
})

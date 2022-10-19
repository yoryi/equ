//Action types
//Types
import { Action } from "redux"

import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Types from "../../types"

export interface SettingsReducer {
  arePrivacyAndSecuritySettingsLoading: boolean
  arePrivacyAndSecuritySettingsLoaded: boolean
  privacyAndSecurity: Types.PrivacyAndSecuritySettings | null

  notifications: Types.NotificationsSettings | null

  isCloseAccountModalOpen: boolean

  universityAccountSettings: Types.UniversityAccountSettings | null

  isUniversityPageAdministratorLoaded: boolean
  universityPageAdministrator: Types.PageAdministrator | null
}

export const initialState: SettingsReducer = {
  arePrivacyAndSecuritySettingsLoading: false,
  arePrivacyAndSecuritySettingsLoaded: false,
  privacyAndSecurity: null,

  notifications: null,
  isCloseAccountModalOpen: false,

  universityAccountSettings: null,

  isUniversityPageAdministratorLoaded: false,
  universityPageAdministrator: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetPrivacyAndSecuritySettings.PromiseTrigger: {
      return {
        ...state,
        arePrivacyAndSecuritySettingsLoading: true,
      }
    }
    case ActionTypes.GetPrivacyAndSecuritySettings.Succeeded:
    case ActionTypes.UpdatePrivacyAndSecuritySettings.Succeeded: {
      const privacyAndSecurity = (action as Actions.PayloadAction<Types.PrivacyAndSecuritySettings>)
        .payload
      return {
        ...state,
        arePrivacyAndSecuritySettingsLoading: false,
        arePrivacyAndSecuritySettingsLoaded: true,
        privacyAndSecurity,
      }
    }
    case ActionTypes.GetPrivacyAndSecuritySettings.Failed: {
      return {
        ...state,
        arePrivacyAndSecuritySettingsLoading: false,
      }
    }
    case ActionTypes.GetNotificationsSettings.Succeeded:
    case ActionTypes.UpdateNotificationsSettings.Succeeded:
      const notifications = (action as Actions.PayloadAction<Types.NotificationsSettings>)
        .payload
      return {
        ...state,
        notifications,
      }
    case ActionTypes.ToggleChangePasswordModal:
      const isChangePasswordModalOpen = (action as Actions.PayloadAction<boolean>)
        .payload
      return {
        ...state,
        isChangePasswordModalOpen,
      }
    case ActionTypes.ChangePassword.Failed:
      const err = action as any
      return {
        ...state,
        changePasswordError: err.err.message,
      }
    case ActionTypes.ChangePassword.Succeeded:
      return {
        ...state,
        changePasswordError: null,
      }
    case ActionTypes.ToggleChangePrivateAvatarModal:
      const isChangeAvatarModalOpen = (action as Actions.PayloadAction<boolean>)
        .payload
      return {
        ...state,
        isChangeAvatarModalOpen,
      }
    case ActionTypes.ToggleCloseAccountModal:
      return {
        ...state,
        isCloseAccountModalOpen: !state.isCloseAccountModalOpen,
      }
    case ActionTypes.GetUniversityAccountSettings.Succeeded:
    case ActionTypes.UpdateUniversityAccountSettings.Succeeded: {
      const universityAccountSettings = (action as Actions.PayloadAction<Types.UniversityAccountSettings>)
        .payload
      return {
        ...state,
        universityAccountSettings,
      }
    }
    case ActionTypes.GetUniversityPageAdministrator.Succeeded: {
      const universityPageAdministrator = (action as Actions.PayloadAction<Types.PageAdministrator | null>)
        .payload
      return {
        ...state,
        isUniversityPageAdministratorLoaded: true,
        universityPageAdministrator,
      }
    }
    default:
      return state
  }
}

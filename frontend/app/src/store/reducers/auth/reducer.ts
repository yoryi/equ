//Types
import { Action } from "redux"

import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/auth/actionTypes"
import * as Payloads from "../../actions/payloads"
import { Role } from "../../types"

export interface AuthReducer {
  isTokenLoaded: boolean
  accessToken: string | null
  tokenType: string | null
  refreshToken: string | null
  isSignUpFinished: boolean
  signInErrorMessage: string | null
  requestNewPasswordErrorMessage?: string
  signUpErrorStatus?: string
  signUpSucceded?: boolean
  user: {
    role: Role
  } | null
  isLogoutTokenDeprecatedModalOpen: boolean
}

export const initialState: AuthReducer = {
  isTokenLoaded: false,
  accessToken: null,
  tokenType: null,
  refreshToken: null,
  isSignUpFinished: false,
  signInErrorMessage: null,
  signUpSucceded: false,
  user: null,
  isLogoutTokenDeprecatedModalOpen: false,
}

export default (
  state: AuthReducer = initialState,
  { type, ...action }: Actions.PayloadAction<any> | Action,
) => {
  switch (type) {
    case ActionTypes.LoadRefreshToken.Trigger: {
      const {
        refreshToken,
      } = (action as Actions.PayloadAction<Payloads.RefreshTokenPayload>).payload
      return {
        ...state,
        isTokenLoaded: true,
        refreshToken,
        isSignUpFinished: true,
      }
    }
    case ActionTypes.RefreshAccessToken.Succeeded:
      const {
        accessToken,
        tokenType,
        refreshToken,
      } = (action as Actions.PayloadAction<
        Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
      >).payload
      return {
        ...state,
        accessToken,
        tokenType,
        refreshToken,
      }
    case ActionTypes.ConfirmSignUp.Succeeded: {
      const {
        accessToken,
        tokenType,
        refreshToken,
      } = (action as Actions.PayloadAction<
        Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
      >).payload
      return {
        ...state,
        accessToken,
        tokenType,
        refreshToken,
        isSignUpFinished: false,
        signUpErrorStatus: ``,
      }
    }
    case ActionTypes.SignUp.Failed: {
      const error = action as any
      return {
        ...state,
        signUpErrorStatus: error.err,
      }
    }
    case ActionTypes.ResetSignUpError.Trigger: {
      return {
        ...state,
        signUpErrorStatus: ``,
      }
    }
    case ActionTypes.FinishSignUp.Trigger: {
      return {
        ...state,
        isSignUpFinished: true,
      }
    }
    case ActionTypes.SignIn.Succeeded: {
      const {
        accessToken,
        tokenType,
        refreshToken,
      } = (action as Actions.PayloadAction<
        Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
      >).payload
      return {
        ...state,
        accessToken,
        tokenType,
        refreshToken,
        isSignUpFinished: true,
        signUpSucceded: true,
      }
    }
    case ActionTypes.SignIn.Failed: {
      const error = action as any
      return {
        ...state,
        signInErrorMessage: error.err,
        signUpSucceded: false,
      }
    }
    case ActionTypes.ResetSignInError.Trigger: {
      return {
        ...state,
        signInErrorMessage: ``,
      }
    }
    case ActionTypes.RequestPasswordReset.Succeeded: {
      return {
        ...state,
        requestNewPasswordErrorMessage: ``,
      }
    }
    case ActionTypes.ResetRequestPasswordResetError.Trigger: {
      return {
        ...state,
        requestNewPasswordErrorMessage: ``,
      }
    }
    case ActionTypes.RequestPasswordReset.Failed: {
      const error = action as any
      return {
        ...state,
        requestNewPasswordErrorMessage: error.err,
      }
    }
    case ActionTypes.GetUser.Succeeded: {
      const user = (action as any).payload
      return {
        ...state,
        user,
      }
    }
    case ActionTypes.SignOut.Trigger: {
      return {
        ...state,
        accessToken: null,
        tokenType: null,
        refreshToken: null,
        isSignUpFinished: false,
        signUpErrorStatus: ``,
        signInErrorMessage: null,
        requestNewPasswordErrorMessage: ``,
        signUpSucceded: false,
        isLogoutTokenDeprecatedModalOpen: false,
        user: null,
      }
    }
    case ActionTypes.ToggleLogoutTokenDeprecatedModal: {
      const isLogoutTokenDeprecatedModalOpen = (action as any).payload
      return {
        ...state,
        accessToken: null,
        tokenType: null,
        refreshToken: null,
        isLogoutTokenDeprecatedModalOpen,
      }
    }
    default:
      return state
  }
}

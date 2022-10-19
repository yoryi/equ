// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Types from "../../types"
import { PayloadAction } from "../actions"
import * as Actions from "../actions"
import * as ActionTypes from "./actionTypes"
import { ChangePasswordPayload , UniversitySignUpPayload } from "./payloads"
import * as Payloads from "./payloads"


export const loadRefreshToken = (
  refreshToken: string | null,
): Actions.PayloadAction<Payloads.RefreshTokenPayload> => ({
  type: ActionTypes.LoadRefreshToken.Trigger,
  payload: {
    refreshToken,
  },
})

export const refreshAccessToken = (): Action => ({
  type: ActionTypes.RefreshAccessToken.Trigger,
})

export const refreshAccessTokenSucceeded = (
  payload: Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload,
): Actions.PayloadAction<
  Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
> => ({
  type: ActionTypes.RefreshAccessToken.Succeeded,
  payload,
})

export const signUp = (
  payload: Payloads.SignUpPayload,
): Actions.PromiseAction<Payloads.SignUpPayload> =>
  createPromiseAction(ActionTypes.SignUp.Trigger)(payload)
export const signUpSucceeded = (): Action => ({
  type: ActionTypes.SignUp.Succeeded,
})
export const signUpFailed = (err: Types.APIError): Actions.APIErrorAction => ({
  type: ActionTypes.SignUp.Failed,
  err,
})

export const confirmSignUp = (payload: {
  token: string
}): Actions.PayloadAction<{ token: string }> => ({
  type: ActionTypes.ConfirmSignUp.Trigger,
  payload,
})
export const confirmSignUpSucceeded = (
  payload: Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload,
): Actions.PayloadAction<
  Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
> => ({
  type: ActionTypes.ConfirmSignUp.Succeeded,
  payload,
})
export const confirmSignUpFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.ConfirmSignUp.Failed,
  err,
})

export const resetSignUpError = (): Action => ({
  type: ActionTypes.ResetSignUpError.Trigger,
})

export const studentSignUpDetails = (
  payload: Payloads.StudentSignUpDetailsPayload,
): Actions.PromiseAction<Payloads.StudentSignUpDetailsPayload> =>
  createPromiseAction(ActionTypes.StudentSignUpDetails.Trigger)(payload)
export const studentSignUpDetailsSucceeded = (
  payload: any,
): Actions.PayloadAction<Payloads.StudentSignUpDetailsPayload> => ({
  type: ActionTypes.StudentSignUpDetails.Succeeded,
  payload,
})
export const studentSignUpDetailsFailed = (): Action => ({
  type: ActionTypes.StudentSignUpDetails.Failed,
})

export const studentSignUpOptionalDetails = (
  payload: Payloads.StudentSignUpOptionalDetailsPayload,
): Actions.PromiseAction<Payloads.StudentSignUpOptionalDetailsPayload> =>
  createPromiseAction(ActionTypes.StudentSignUpOptionalDetails.Trigger)(payload)
export const studentSignUpOptionalDetailsSucceeded = (
  payload: any,
): Actions.PayloadAction<Payloads.StudentSignUpOptionalDetailsPayload> => ({
  type: ActionTypes.StudentSignUpOptionalDetails.Succeeded,
  payload,
})
export const studentSignUpOptionalDetailsFailed = (): Action => ({
  type: ActionTypes.StudentSignUpOptionalDetails.Failed,
})

export const studentSignUpSkipOptionalDetails = (): Actions.PromiseAction<undefined> =>
  createPromiseAction(ActionTypes.StudentSignUpOptionalDetails.Trigger)()
export const studentSignUpSkinOptionalDetailsSucceeded = (): Action => ({
  type: ActionTypes.StudentSignUpSkipOptionalDetails.Succeeded,
})
export const studentSignUpSkipOptionalDetailsFailed = (): Action => ({
  type: ActionTypes.StudentSignUpSkipOptionalDetails.Failed,
})

export const studentSignUpInterests = (
  payload: Payloads.StudentSignUpInterestsPayload,
): Actions.PromiseAction<Payloads.StudentSignUpInterestsPayload> =>
  createPromiseAction(ActionTypes.StudentSignUpInterests.Trigger)(payload)
export const studentSignUpInterestsSucceeded = (
  payload: any,
): Actions.PayloadAction<Payloads.StudentSignUpInterestsPayload> => ({
  type: ActionTypes.StudentSignUpInterests.Succeeded,
  payload,
})
export const studentSignUpInterestsFailed = (): Action => ({
  type: ActionTypes.StudentSignUpInterests.Failed,
})

export const studentSignUpPrivateAvatar = (
  payload: Payloads.StudentSignUpPrivateAvatarPayload,
): Actions.PromiseAction<Payloads.StudentSignUpPrivateAvatarPayload> =>
  createPromiseAction(ActionTypes.StudentSignUpPrivateAvatar.Trigger)(payload)
export const studentSignUpPrivateAvatarSucceeded = (
  payload: any,
): Actions.PayloadAction<Payloads.StudentSignUpPrivateAvatarPayload> => ({
  type: ActionTypes.StudentSignUpPrivateAvatar.Succeeded,
  payload,
})
export const studentSignUpPrivateAvatarFailed = (): Action => ({
  type: ActionTypes.StudentSignUpPrivateAvatar.Failed,
})

export const studentSignUpFinish = (): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.StudentSignUpFinish.Trigger)()
export const studentSignUpFinishSucceeded = (
  payload: any,
): Actions.PayloadAction<Payloads.StudentSignUpPrivateAvatarPayload> => ({
  type: ActionTypes.StudentSignUpFinish.Succeeded,
  payload,
})
export const studentSignUpFinishFailed = (): Action => ({
  type: ActionTypes.StudentSignUpFinish.Failed,
})

export const finishSignUp = (): Action => ({
  type: ActionTypes.FinishSignUp.Trigger,
})

export const universitySignUp = (
  payload: Payloads.UniversitySignUpPayload,
): Actions.PromiseAction<UniversitySignUpPayload> =>
  createPromiseAction(ActionTypes.UniversitySignUp.Trigger)(payload)

export const signIn = (
  payload: Payloads.CredentialsPayload,
): Actions.PromiseAction<Payloads.CredentialsPayload> =>
  createPromiseAction(ActionTypes.SignIn.Trigger)(payload)
export const signInSucceeded = (
  payload: Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload,
): Actions.PayloadAction<
  Payloads.AccessTokenPayload & Payloads.RefreshTokenPayload
> => ({
  type: ActionTypes.SignIn.Succeeded,
  payload,
})
export const signInFailed = (err: Types.APIError): Actions.APIErrorAction => ({
  type: ActionTypes.SignIn.Failed,
  err,
})
export const resetSignInError = (): Action => ({
  type: ActionTypes.ResetSignInError.Trigger,
})

export const requestPasswordReset = (
  payload: Payloads.EmailPayload,
): Actions.PromiseAction<Payloads.EmailPayload> =>
  createPromiseAction(ActionTypes.RequestPasswordReset.Trigger)(payload)
export const requestPasswordResetSucceeded = () => ({
  type: ActionTypes.RequestPasswordReset.Succeeded,
})
export const requestPasswordResetFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.RequestPasswordReset.Failed,
  err,
})
export const resetPassword = (
  payload: Payloads.ResetPasswordPayload,
): Actions.PromiseAction<Payloads.ResetPasswordPayload> =>
  createPromiseAction(ActionTypes.ResetPassword.Trigger)(payload)
export const resetRequestPasswordResetError = (): Action => ({
  type: ActionTypes.ResetRequestPasswordResetError.Trigger,
})

export const changePassword = (
  payload: Payloads.ChangePasswordPayload,
): Actions.PromiseAction<Payloads.ChangePasswordPayload> =>
  createPromiseAction(ActionTypes.ChangePassword.Trigger)(payload)
export const changePasswordSucceeded = (
  payload: ChangePasswordPayload,
): PayloadAction<ChangePasswordPayload> => ({
  type: ActionTypes.ChangePassword.Succeeded,
  payload,
})
export const changePasswordFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.ChangePassword.Failed,
  err,
})

export const getUser = (): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.GetUser.Trigger)()
export const getUserSucceded = (payload: any): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetUser.Succeeded,
  payload,
})

export const signOut = (): Action => ({
  type: ActionTypes.SignOut.Trigger,
})

export const joinPilot = (
  payload: Types.JoinPilotPayload,
): Actions.PromiseAction<Types.JoinPilotPayload> =>
  createPromiseAction(ActionTypes.JoinPilot.Trigger)(payload)

export const toggleLogoutTokenDeprecatedModal = (
  payload: boolean,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.ToggleLogoutTokenDeprecatedModal,
  payload,
})

//Action creators
// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Types from "../../types"
import * as Actions from "../actions"
import * as Payloads from "../payloads"
//Action enums
import * as ActionTypes from "./actionTypes"

export const getSharedOptions = (): Action => ({
  type: ActionTypes.GetSharedOptions.Trigger,
})
export const getSharedOptionsSucceeded = (
  payload: Payloads.GetSharedOptionsSucceededPayload,
): Actions.PayloadAction<Payloads.GetSharedOptionsSucceededPayload> => ({
  type: ActionTypes.GetSharedOptions.Succeeded,
  payload,
})
export const getSharedOptionsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.GetSharedOptions.Failed,
  err,
})

export const getStudentSearchParams = (): Action => ({
  type: ActionTypes.GetStudentSearchParams.Trigger,
})
export const getStudentSearchParamsSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetStudentSearchParams.Succeeded,
  payload,
})
export const getStudentSearchParamsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.GetStudentSearchParams.Failed,
  err,
})

export const getUniversitySearchParams = (): Action => ({
  type: ActionTypes.GetUniversitySearchParams.Trigger,
})
export const getUniversitySearchParamsSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetUniversitySearchParams.Succeeded,
  payload,
})
export const getUniversitySearchParamsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.GetUniversitySearchParams.Failed,
  err,
})

export const getPostReviewDeletionReasons = (): Action => ({
  type: ActionTypes.GetPostReviewDeletionReasons.Trigger,
})
export const getPostReviewDeletionReasonsSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetPostReviewDeletionReasons.Succeeded,
  payload,
})
export const getPostReviewDeletionReasonsFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.GetPostReviewDeletionReasons.Failed,
  err,
})

export const signUpForUpdates = (
  payload: Payloads.EmailPayload,
): Actions.PromiseAction<Payloads.EmailPayload> =>
  createPromiseAction(ActionTypes.SignUpForUpdates.Trigger)(payload)

export const searchZipCode = (
  query: string,
): Actions.PromiseAction<{ query: string }> =>
  createPromiseAction(ActionTypes.SearchZipCode.Trigger)({ query })

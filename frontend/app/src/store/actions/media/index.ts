// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"
import * as Payloads from "./payloads"

export const getMedia = (payload: {
  path: string
}): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.GetMedia.Trigger)(payload)
export const getMediaSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetMedia.Succeeded,
  payload,
})
export const getMediaFailed = () => ({
  type: ActionTypes.GetMedia.Failed,
})

export const refreshMediaToken = (): Action => ({
  type: ActionTypes.RefreshMediaToken.Trigger,
})
export const refreshMediaTokenSucceeded = (
  payload: Payloads.MediaTokenPayload,
): Actions.PayloadAction<Payloads.MediaTokenPayload> => ({
  type: ActionTypes.RefreshMediaToken.Succeeded,
  payload,
})

// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import { Activity, ActivityType } from "../../types"
import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"
import * as Payloads from "./payloads"

export const toggleJourneyModal = (payload: number) => ({
  type: ActionTypes.ToggleJourneyModal,
  payload,
})
export const getJourney = (): Action => ({
  type: ActionTypes.GetJourney.Trigger,
})
export const getJourneySucceeded = (
  payload: Payloads.JourneyPayload,
): Actions.PayloadAction<Payloads.JourneyPayload> => ({
  type: ActionTypes.GetJourney.Succeeded,
  payload,
})
export const getJourneyFailed = (): Action => ({
  type: ActionTypes.GetJourney.Failed,
})

export const updateJourney = (
  payload: Payloads.UpdateJourney,
): Actions.PromiseAction<Payloads.UpdateJourney> =>
  createPromiseAction(ActionTypes.UpdateJourney.Trigger)(payload)
export const updateJourneySucceeded = (
  payload: Payloads.UpdateJourney,
): Actions.PayloadAction<Payloads.UpdateJourney> => ({
  type: ActionTypes.UpdateJourney.Succeeded,
  payload,
})

export const toggleEditJourneyModal = (payload: number) => ({
  type: ActionTypes.ToggleEditJourneyModal,
  payload,
})

export const removePhotoOrVideo = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
}) => createPromiseAction(ActionTypes.RemovePhovoOrVideo.Trigger)(payload)
export const removePhotoOrVideoSucceeded = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
}) => ({
  type: ActionTypes.RemovePhovoOrVideo.Succeeded,
  payload,
})

export const deleteJourney = (payload: Activity) =>
  createPromiseAction(ActionTypes.DeleteJourney.Trigger)(payload)
export const deleteJourneySucceeded = (payload: {
  activityId: number
  activityType: ActivityType
}) => ({
  type: ActionTypes.DeleteJourney.Succeeded,
  payload,
})

export const makeFirstPhotoJourney = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
}): Actions.PromiseAction<{
  activityId: number
  journeyId: number
  activityType: ActivityType
}> => createPromiseAction(ActionTypes.MakeFirstPhoto.Trigger)(payload)
export const makeFirstPhotoJourneySucceeded = (payload: {
  activityId: number
  data: any
  activityType: ActivityType
}): Actions.PayloadAction<{
  activityId: number
  data: any
  activityType: ActivityType
}> => ({
  type: ActionTypes.MakeFirstPhoto.Succeeded,
  payload,
})

export const toggleAddJourneyDescriptionModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAddJourneyDescriptionModal,
  payload,
})
export const addJourneyDescription = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
  description: string
}): Actions.PromiseAction<{
  activityId: number
  journeyId: number
  activityType: ActivityType
  description: string
}> => createPromiseAction(ActionTypes.AddJourneyDescription.Trigger)(payload)
export const addJourneyDescriptionSucceeded = (payload: {
  activityId: number
  activityType: ActivityType
  data: any
}): Actions.PayloadAction<{
  activityId: number
  activityType: ActivityType
  data: any
}> => ({
  type: ActionTypes.AddJourneyDescription.Succeeded,
  payload,
})

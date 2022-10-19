// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import * as Types from "../../types"
import { Activity, ActivityType, UniversityProfile } from "../../types"
import * as Actions from "../actions"
//Actions
import * as ActionTypes from "./actionTypes"
import * as Payloads from "./payloads"
import { PredefinedQueryType } from "./payloads"

export const getUniversity = (
  id?: number,
): Actions.PayloadAction<Payloads.UniversityIDPayload> => ({
  type: ActionTypes.GetUniversity.Trigger,
  payload: {
    id: id ?? null,
  },
})
export const getUniversitySucceeded = (payload: {
  profile: Types.University
  id: number | null
}): Actions.PayloadAction<{
  profile: Types.University
  id: number | null
}> => ({
  type: ActionTypes.GetUniversity.Succeeded,
  payload,
})
export const getUniversityFailed = (): Action => ({
  type: ActionTypes.GetUniversity.Failed,
})

export const getUniversityMatchingScore = (
  id: number,
): Actions.PayloadAction<Payloads.UniversityIDPayload> => ({
  type: ActionTypes.GetUniversityMatchingScore.Trigger,
  payload: {
    id: id,
  },
})
export const getUniversityMatchingScoreSucceeded = (
  payload: UniversityProfile,
): Actions.PayloadAction<UniversityProfile> => ({
  type: ActionTypes.GetUniversityMatchingScore.Succeeded,
  payload,
})
export const getUniversityMatchingScoreFailed = () => ({
  type: ActionTypes.GetUniversityMatchingScore.Failed,
})

export const getUniversitySpirit = (
  id?: number,
): Actions.PayloadAction<Payloads.UniversityIDPayload> => ({
  type: ActionTypes.GetUniversitySpirit.Trigger,
  payload: {
    id: id ?? null,
  },
})
export const getUniversitySpiritSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.GetUniversitySpirit.Succeeded,
  payload,
})
export const getUniversitySpiritFailed = (): Action => ({
  type: ActionTypes.GetUniversitySpirit.Failed,
})

export const toggleAddSpiritModal = (payload: string) => ({
  type: ActionTypes.ToggleAddSpiritModal,
  payload,
})
export const toggleAddSpiritSecondStep = (payload: number) => ({
  type: ActionTypes.ToggleAddSpiritSecondStep,
  payload,
})
export const createSpirit = (
  payload: Types.CreateActivity,
): Actions.PromiseAction<Types.CreateActivity> =>
  createPromiseAction(ActionTypes.CreateSpirit.Trigger)(payload)
export const createSpiritSucceeded = (
  payload: Types.CreateActivity,
): Actions.PayloadAction<Types.CreateActivity> => ({
  type: ActionTypes.CreateSpirit.Succeeded,
  payload,
})

export const getCurrentSpirit = (payload: {
  activityId: number
  activityType: ActivityType
}): any => ({
  type: ActionTypes.GetCurrentSpirit,
  payload,
})
export const toggleEditSpiritModal = (payload: number) => ({
  type: ActionTypes.ToggleEditSpiritModal,
  payload,
})
export const updateSpirit = (
  payload: Types.CreateActivity,
): Actions.PromiseAction<Types.CreateActivity> =>
  createPromiseAction(ActionTypes.UpdateSpirit.Trigger)(payload)
export const updateSpiritSucceeded = (
  payload: Types.CreateActivity,
): Actions.PayloadAction<Types.CreateActivity> => ({
  type: ActionTypes.UpdateSpirit.Succeeded,
  payload,
})

export const deleteSpirit = (payload: {
  id: number
  type: ActivityType
}): Actions.PromiseAction<{ id: number; type: ActivityType }> =>
  createPromiseAction(ActionTypes.DeleteSpirit.Trigger)(payload)
export const deleteSpiritSucceeded = (payload: {
  id: number
  type: ActivityType
}): Actions.PayloadAction<{ id: number; type: ActivityType }> => ({
  type: ActionTypes.DeleteSpirit.Succeeded,
  payload,
})

export const updateSpiritJourney = (payload: any): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.UpdateSpiritJourney.Trigger)(payload)
export const updateSpiritJourneySucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.UpdateSpiritJourney.Succeeded,
  payload,
})

export const makeFirstPhotoSpiritJourney = (
  payload: any,
): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.MakeFirstPhotoSpiritJourney.Trigger)(payload)
export const makeFirstPhotoSpiritJourneySucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.MakeFirstPhotoSpiritJourney.Succeeded,
  payload,
})

export const addDescriptionSpiritJourney = (
  payload: any,
): Actions.PromiseAction<any> =>
  createPromiseAction(ActionTypes.AddDescriptionSpiritJourney.Trigger)(payload)
export const addDescriptionSpiritJourneySucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.AddDescriptionSpiritJourney.Succeeded,
  payload,
})

export const updateUniversityMission = (payload: {
  mission: string
}): Actions.PromiseAction<{ mission: string }> =>
  createPromiseAction(ActionTypes.UpdateUniversityMission.Trigger)(payload)
export const updateUniversityMissionSucceeded = (payload: {
  mission: string
}): Actions.PayloadAction<{ mission: string }> => ({
  type: ActionTypes.UpdateUniversityMission.Succeeded,
  payload,
})
export const updateUniversityMissionFailed = (
  err: Types.APIError,
): Actions.APIErrorAction => ({
  type: ActionTypes.UpdateUniversityMission.Failed,
  err,
})

export const removePhotoOrVideoSpirit = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
}) =>
  createPromiseAction(ActionTypes.RemovePhotoOrVideoSpiritJourney.Trigger)(
    payload,
  )
export const removePhotoOrVideoSpiritSucceeded = (payload: {
  activityId: number
  journeyId: number
  activityType: ActivityType
}) => ({
  type: ActionTypes.RemovePhotoOrVideoSpiritJourney.Succeeded,
  payload,
})

export const deleteSpiritJourney = (payload: Activity) =>
  createPromiseAction(ActionTypes.DeleteSpiritJourney.Trigger)(payload)
export const deleteSpiritJourneySucceeded = (payload: {
  activityId: number
  activityType: ActivityType
}) => ({
  type: ActionTypes.DeleteSpiritJourney.Succeeded,
  payload,
})

export const saveSearch = (payload: {
  name: string
  query: any
  type: PredefinedQueryType
  matching: number | null
}) => createPromiseAction(ActionTypes.SaveSearch.Trigger)(payload)
export const saveSearchSucceeded = (payload: any) => ({
  type: ActionTypes.SaveSearch.Succeeded,
  payload,
})

export const getDebugResponse = (payload: any) => ({
  type: ActionTypes.GetDebugResponse,
  payload,
})

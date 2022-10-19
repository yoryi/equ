//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import _ from "lodash"
import { call, put, select, take, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/journeys/payloads"
//Services
import { api } from "../../services/axios"
import { Activity, ActivityType } from "../../types"
import { handleError } from "../../utils/errors"

export function* updateJourney(
  action: Actions.PromiseAction<Payloads.UpdateJourney>,
) {
  const journey = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp = yield api.request({
      method: `POST`,
      url: `/journeys/${journey.activityId}`,
      data: journey.formData,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.updateJourneySucceeded(resp.data.data))
    yield put(
      actions.getCurrentActivity({
        activityType: journey.activityType,
        activityId: journey.activityId,
      }),
    )
    yield put(actions.toggleEditJourneyModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(
        actions.getCurrentActivity({
          activityType: journey.activityType,
          activityId: journey.activityId,
        }),
      )
      yield put(actions.toggleEditJourneyModal(0))
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* removePhotoOrVideo(
  action: Actions.PromiseAction<{
    activityId: number
    journeyId: number
    activityType: ActivityType
  }>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    yield api.request({
      method: `DELETE`,
      url: `/journeys/${action.payload.journeyId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.removePhotoOrVideoSucceeded(action.payload))
    yield put(
      actions.getCurrentActivity({
        activityType: action.payload.activityType,
        activityId: action.payload.activityId,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(
        actions.getCurrentActivity({
          activityType: action.payload.activityType,
          activityId: action.payload.activityId,
        }),
      )
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteJourney(action: Actions.PromiseAction<Activity>) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    for (let i = 0; i < action.payload.journeys!.length; i++) {
      const journey = action.payload.journeys![i]
      yield api.request({
        method: `DELETE`,
        url: `/journeys/${journey.id}`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": `application/json`,
        },
      })
    }
    yield put(
      actions.deleteJourneySucceeded({
        activityId: action.payload.id,
        activityType: action.payload.type,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* makeFirstPhotoJourney(
  action: Actions.PromiseAction<{
    activityId: number
    journeyId: number
    activityType: ActivityType
  }>,
) {
  const { activityId, journeyId, activityType } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp = yield api.request({
      method: `PATCH`,
      url: `/journeys/${journeyId}/make-first-photo/${activityId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.makeFirstPhotoJourneySucceeded({
        activityId,
        activityType,
        data: resp.data,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addJourneyDescription(
  action: Actions.PromiseAction<{
    activityId: number
    journeyId: number
    activityType: ActivityType
    description: string
  }>,
) {
  const { activityId, journeyId, activityType, description } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp = yield api.request({
      method: `PATCH`,
      url: `/journeys/${journeyId}/description`,
      data: { description },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(
      actions.addJourneyDescriptionSucceeded({
        activityId,
        activityType,
        data: resp.data,
      }),
    )
    yield put(actions.getCurrentActivity({ activityType, activityId }))
    yield put(actions.toggleAddJourneyDescriptionModal(false))
    yield put(actions.toggleEditJourneyModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getCurrentActivity({ activityType, activityId }))
      yield put(actions.toggleAddJourneyDescriptionModal(false))
      yield put(actions.toggleEditJourneyModal(0))
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export const journeySaga = [
  takeLatest(ActionTypes.UpdateJourney.PromiseTrigger, updateJourney),
  takeLatest(ActionTypes.RemovePhovoOrVideo.PromiseTrigger, removePhotoOrVideo),
  takeLatest(ActionTypes.DeleteJourney.PromiseTrigger, deleteJourney),
  takeLatest(ActionTypes.MakeFirstPhoto.PromiseTrigger, makeFirstPhotoJourney),
  takeLatest(
    ActionTypes.AddJourneyDescription.PromiseTrigger,
    addJourneyDescription,
  ),
]

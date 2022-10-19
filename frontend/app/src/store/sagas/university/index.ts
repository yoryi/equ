//@ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
//Redux saga
import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
import { PredefinedQueryType } from "../../actions/university/payloads"
//Services
import { api } from "../../services/axios"
import * as Types from "../../types"
import { ActivityType } from "../../types"
//Utils
import { handleError } from "../../utils/errors"

function* getUniversity({ payload }: ReturnType<typeof actions.getUniversity>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Types.University>({
      method: `GET`,
      url: `/university/${payload.id ?? ``}`,
      headers: {
        Authorization:
          tokenType && accessToken && `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.getUniversitySucceeded({ profile: resp.data, id: payload.id }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversity(payload.id ?? undefined))
      return
    }

    yield put(actions.getUniversityFailed())
  }
}

function* getUniversityMatchingScore({
  payload,
}: ReturnType<typeof actions.getUniversityMatchingScore>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<{ universities: Types.UniversityProfile[] }>(
      {
        method: `GET`,
        url: `/search/universities/${payload.id}`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    )

    yield put(
      actions.getUniversityMatchingScoreSucceeded(resp.data.universities[0]),
    )
    yield put(actions.getDebugResponse(resp.data.debugResponse))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversityMatchingScore(payload.id!))
      return
    }

    yield put(actions.getUniversityMatchingScoreFailed())
  }
}

function* getUniversitySpirit({
  payload,
}: ReturnType<typeof actions.getUniversitySpirit>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Types.University>({
      method: `GET`,
      url: payload.id
        ? `/university/spirit/${payload.id}`
        : `/university/spirit/`,
      headers: {
        Authorization:
          tokenType && accessToken && `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getUniversitySpiritSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversitySpirit(payload.id ?? undefined))
      return
    }

    yield put(actions.getUniversitySpiritFailed())
  }
}

export function* createSpirit(
  action: Actions.PromiseAction<Types.CreateActivity>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Types.CreateActivity>({
      method: `POST`,
      url: `/university/spirit`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.createSpiritSucceeded(resp.data))
    yield put(actions.toggleAddSpiritSecondStep(resp.data.id))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      const resp = yield put(action)
      yield put(actions.toggleAddSpiritSecondStep(resp.data.id))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateSpirit(
  action: Actions.PromiseAction<Types.CreateActivity>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))
    yield api.request<Types.CreateActivity>({
      method: `PATCH`,
      url: `/university/spirit/${action.payload.id}`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateSpiritSucceeded(action.payload))
    yield put(actions.toggleEditSpiritModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleEditSpiritModal(0))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteSpirit(
  action: Actions.PromiseAction<{ id: number; type: ActivityType }>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    yield api.request({
      method: `DELETE`,
      url: `/university/spirit/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteSpiritSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
    yield put(actions.toggleEditSpiritModal(0))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleEditSpiritModal(0))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateUniversityMission(action: Actions.PromiseAction<any>) {
  const { mission } = action.payload

  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/university/mission`,
      data: {
        mission,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateUniversityMissionSucceeded({ mission }))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield put(actions.toggleMissionStatementModal(false))
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.updateUniversityMissionFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateSpiritJourney(action: Actions.PromiseAction<any>) {
  const journey = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `POST`,
      url: `/university/spirit/journey/${journey.activityId}`,
      data: journey.formData,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })
    yield put(actions.updateSpiritJourneySucceeded(resp.data.data))
    yield put(
      actions.getCurrentSpirit({
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
        actions.getCurrentSpirit({
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

export function* removePhotoOrVideoSpirit(
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
      url: `/university/spirit/journey/${action.payload.journeyId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.removePhotoOrVideoSpiritSucceeded(action.payload))
    yield put(
      actions.getCurrentSpirit({
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
        actions.getCurrentSpirit({
          activityType: action.payload.activityType,
          activityId: action.payload.activityId,
        }),
      )
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteSpiritJourney(
  action: Actions.PromiseAction<Types.Activity>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    for (let i = 0; i < action.payload.journeys!.length; i++) {
      const journey = action.payload.journeys![i]
      yield api.request({
        method: `DELETE`,
        url: `/university/spirit/journey/${journey.id}`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      })
    }
    yield put(
      actions.deleteSpiritJourneySucceeded({
        activityId: action.payload.id,
        activityType: action.payload.type,
      }),
    )
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

export function* makeFirstPhotoSpiritJourney(
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
      url: `/university/${journeyId}/make-first-photo/${activityId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.makeFirstPhotoSpiritJourneySucceeded({
        activityId,
        activityType,
        data: resp.data,
      }),
    )
    yield put(actions.getCurrentSpirit({ activityType, activityId }))
    yield put(actions.toggleEditJourneyModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getCurrentSpirit({ activityType, activityId }))
      yield put(actions.toggleEditJourneyModal(0))
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addJourneySpiritDescription(
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
      url: `/university/spirit/journey/${journeyId}/description`,
      data: { description },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(
      actions.addDescriptionSpiritJourneySucceeded({
        activityId,
        activityType,
        data: resp.data,
      }),
    )
    yield put(actions.getCurrentSpirit({ activityType, activityId }))
    yield put(actions.toggleAddJourneyDescriptionModal(false))
    yield put(actions.toggleEditJourneyModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getCurrentSpirit({ activityType, activityId }))
      yield put(actions.toggleAddJourneyDescriptionModal(false))
      yield put(actions.toggleEditJourneyModal(0))
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* saveSearch(
  action: Actions.PromiseAction<{
    name: string
    query: any
    type: PredefinedQueryType
    matching: number
  }>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    yield api.request({
      method: `POST`,
      url: `/search/predefined-query`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.saveSearchSucceeded(action.payload))
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

export const universitySaga = [
  takeEvery(ActionTypes.GetUniversity.Trigger, getUniversity),
  takeLatest(
    ActionTypes.GetUniversityMatchingScore.Trigger,
    getUniversityMatchingScore,
  ),

  takeLatest(ActionTypes.GetUniversitySpirit.Trigger, getUniversitySpirit),
  takeLatest(ActionTypes.CreateSpirit.PromiseTrigger, createSpirit),
  takeLatest(ActionTypes.UpdateSpirit.PromiseTrigger, updateSpirit),
  takeLatest(ActionTypes.DeleteSpirit.PromiseTrigger, deleteSpirit),
  takeLatest(
    ActionTypes.UpdateUniversityMission.PromiseTrigger,
    updateUniversityMission,
  ),
  takeLatest(
    ActionTypes.UpdateSpiritJourney.PromiseTrigger,
    updateSpiritJourney,
  ),
  takeLatest(
    ActionTypes.MakeFirstPhotoSpiritJourney.PromiseTrigger,
    makeFirstPhotoSpiritJourney,
  ),
  takeLatest(
    ActionTypes.AddDescriptionSpiritJourney.PromiseTrigger,
    addJourneySpiritDescription,
  ),
  takeLatest(
    ActionTypes.RemovePhotoOrVideoSpiritJourney.PromiseTrigger,
    removePhotoOrVideoSpirit,
  ),
  takeLatest(
    ActionTypes.DeleteSpiritJourney.PromiseTrigger,
    deleteSpiritJourney,
  ),
  takeLatest(ActionTypes.SaveSearch.PromiseTrigger, saveSearch),
]

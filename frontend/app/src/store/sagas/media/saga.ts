//Redux saga
//Types
import { AxiosResponse } from "axios"
import { put, select, take, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import { ReduxState, SurveyDetails } from "../../types"

export function* getMedia(action: Actions.PromiseAction<any>) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))
    const { mediaToken } = yield select<
      (state: ReduxState) => { mediaToken: string | null }
    >((state) => ({
      mediaToken: state.media.mediaToken,
    }))

    const resp: AxiosResponse<SurveyDetails> = yield api.request({
      method: `GET`,
      url: `/media/${action.payload.path}?eqmt=${mediaToken}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        accept: `*/*`,
      },
    })

    yield put(actions.getMediaSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getMedia(action.payload.path))
      return
    }

    yield put(actions.getMediaFailed())
  }
}

export function* refreshMediaToken() {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    const resp = yield api.request({
      method: `GET`,
      url: `/media/token`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.refreshMediaTokenSucceeded({ mediaToken: resp.data }))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      const { accessToken, tokenType } = yield select<
        (
          state: ReduxState,
        ) => { accessToken: string | null; tokenType: string | null }
      >((state) => ({
        accessToken: state.auth.accessToken,
        tokenType: state.auth.tokenType,
      }))
      const resp = yield api.request({
        method: `GET`,
        url: `/media/token`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": `application/json`,
        },
      })

      yield put(actions.refreshMediaTokenSucceeded({ mediaToken: resp.data }))
      return
    }
  }
}

export const mediaSaga = [
  takeLatest(ActionTypes.GetMedia.PromiseTrigger, getMedia),
  takeLatest(ActionTypes.RefreshMediaToken.Trigger, refreshMediaToken),
]

//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import _ from "lodash"
import { call, put, take, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/attachments/payloads"
import { handleError } from "../../utils/errors"

export function* updateAttachments(
  action: Actions.PromiseAction<Payloads.UpdateAttachments>,
) {
  const payload = action.payload
  try {
    // const {tokenType, accessToken} = yield select(state => state.auth);
    // const resp = yield api.request({
    //     method: 'POST',
    //     url: `/journeys/${journey.activityId}`,
    //     data: journey.formData,
    //     headers: {
    //         Authorization: `${tokenType} ${accessToken}`,
    //         'Content-Type': 'multipart/form-data'
    //     }
    // });

    //TODO: replace with real response from the api
    const tmpResp = {
      id: 0,
      activity: {
        type: payload.activityType,
        id: payload.activityId,
      },
      attachments: payload.formData.files?.map(
        (file: { path: string }, index: number) => {
          return { ...file, name: file.path, id: index }
        },
      ),
    }

    console.log(`tmpresp`, tmpResp)
    yield put(actions.updateAttachmentsSucceeded(tmpResp))
    yield put(
      actions.getCurrentActivity({
        activityType: payload.activityType,
        activityId: payload.activityId,
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
          activityType: payload.activityType,
          activityId: payload.activityId,
        }),
      )
      yield put(actions.toggleEditJourneyModal(0))
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteAttachment(
  action: Actions.PromiseAction<Payloads.DeleteAttachment>,
) {
  try {
    const payload = action.payload
    // const {tokenType, accessToken} = yield select(state => state.auth);
    //     yield api.request({
    //         method: 'DELETE',
    //         url: `/journeys/${journey.id}`,
    //         headers: {
    //             Authorization: `${tokenType} ${accessToken}`,
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //TODO: Replace the payload with actual api response, sync payload type with response

    yield put(actions.deleteAttachmentSucceeded(payload))
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

export const attachmentsSaga = [
  takeLatest(ActionTypes.UpdateAttachments.PromiseTrigger, updateAttachments),
  takeLatest(ActionTypes.DeleteAttachment.PromiseTrigger, deleteAttachment),
]

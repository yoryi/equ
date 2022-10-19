//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { call, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
//Types
import * as ActionTypes from "../../actions/help/actionTypes"
//Services
import { api } from "../../services/axios"
//Utils
import { handleError } from "../../utils/errors"

export function* sendHelpMessage(
  action: ReturnType<typeof actions.sendHelpMessage>,
) {
  try {
    const { phoneNumber, ...payload } = action.payload

    yield api.request({
      method: `POST`,
      url: `/shared/help`,
      data: {
        ...payload,
        phoneNumber: phoneNumber?.length === 0 ? undefined : phoneNumber,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export const helpSaga = [
  takeLatest(ActionTypes.SendHelpMessage.PromiseTrigger, sendHelpMessage),
]

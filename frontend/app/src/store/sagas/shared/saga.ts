//Redux saga
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions/shared"
//Types
import * as ActionTypes from "../../actions/shared/actionTypes"
//Services
import { api } from "../../services/axios"
import * as Types from "../../types"
//Utils
import { handleError } from "../../utils/errors"
import * as Responses from "./responses"

export function* getSharedOptions() {
  try {
    const resp: AxiosResponse<Responses.GetSharedResponse> = yield api.request({
      method: `GET`,
      url: `/shared`,
    })

    yield put(
      actions.getSharedOptionsSucceeded({
        genders: resp.data.GENDERS,
        races: resp.data.RACES,
        ethnicities: resp.data.ETHNICITY,
        hardships: resp.data.HARDSHIP,
      }),
    )
  } catch (err) {
    const errors = handleError(err)

    yield put(actions.getSharedOptionsFailed(errors))
  }
}

export function* getStudentSearchParams() {
  try {
    const resp: AxiosResponse = yield api.request({
      method: `GET`,
      url: `/shared/student-search-params`,
    })

    yield put(actions.getStudentSearchParamsSucceeded(resp.data))
  } catch (err) {
    const errors = handleError(err)

    yield put(actions.getStudentSearchParamsFailed(errors))
  }
}

export function* getUniversitySearchParams() {
  try {
    const resp: AxiosResponse = yield api.request({
      method: `GET`,
      url: `/shared/student-university-search-params`,
    })

    yield put(actions.getUniversitySearchParamsSucceeded(resp.data))
  } catch (err) {
    const errors = handleError(err)

    yield put(actions.getUniversitySearchParamsFailed(errors))
  }
}

export function* getPostReviewDeletionReasons() {
  try {
    const resp: AxiosResponse = yield api.request({
      method: `GET`,
      url: `/shared/post-review-delete-reason`,
    })

    yield put(actions.getPostReviewDeletionReasonsSucceeded(resp.data))
  } catch (err) {
    const errors = handleError(err)

    yield put(actions.getPostReviewDeletionReasonsFailed(errors))
  }
}

export function* signUpForUpdates(
  action: ReturnType<typeof actions.signUpForUpdates>,
) {
  try {
    yield api.request({
      method: `POST`,
      url: `/shared/get-notified`,
      data: action.payload,
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield call(rejectPromiseAction, action)
  }
}

export function* searchZipCode(
  action: ReturnType<typeof actions.searchZipCode>,
) {
  try {
    const resp: AxiosResponse<Types.SearchZipCodeResponse> = yield api.request({
      method: `GET`,
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${encodeURIComponent(
        action.payload.query,
      )}&region=us&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }&language=en`,
    })

    const result = resp.data.results
      .map((result) => {
        const zipCode = result.address_components.find(
          (component) =>
            component.types.includes(Types.AddressComponentType.PostalCode),
        )?.short_name
        const stateCode = result.address_components.find(
          (component) =>
            component.types.includes(Types.AddressComponentType.State),
        )?.short_name
        if (!zipCode || !stateCode) {
          return
        }

        return {
          zipCode,
          stateCode,
          formattedAddress: result.formatted_address,
          ...result.geometry.location,
        }
      })
      .filter((result) => !!result)

    yield call(resolvePromiseAction, action, result)
  } catch (err) {
    yield call(rejectPromiseAction, action)
  }
}

export const sharedSaga = [
  takeLatest(ActionTypes.GetSharedOptions.Trigger, getSharedOptions),
  takeLatest(
    ActionTypes.GetStudentSearchParams.Trigger,
    getStudentSearchParams,
  ),
  takeLatest(
    ActionTypes.GetUniversitySearchParams.Trigger,
    getUniversitySearchParams,
  ),
  takeLatest(
    ActionTypes.GetPostReviewDeletionReasons.Trigger,
    getPostReviewDeletionReasons,
  ),
  takeLatest(ActionTypes.SignUpForUpdates.PromiseTrigger, signUpForUpdates),
  takeLatest(ActionTypes.SearchZipCode.PromiseTrigger, searchZipCode),
]

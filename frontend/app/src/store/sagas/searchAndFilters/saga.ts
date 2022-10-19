//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { AxiosResponse } from "axios"
import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects"

import { getSchoolTypeValue } from "../../../const/schoolTypeValue"
//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import { Filters,ReduxState, Search, SearchResultType } from "../../types"
import { handleError } from "../../utils/errors"

export function* searchUniversities(action: Actions.PromiseAction<any>) {
  const { schoolType, ...filters } = action.payload

  const schoolTypeValue = getSchoolTypeValue(schoolType[0])

  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<{
      resultsQty: number
      universities: Search.UniversityResult[]
      debugResponse?: any
    }> = yield api.request({
      method: `POST`,
      url: `/search/universities`,
      data: { schoolType: schoolTypeValue, ...filters },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.searchUniversitiesSucceeded({
        searchResultsCount: resp.data.resultsQty,
        searchResults: resp.data.universities.map((result) => ({
          ...result,
          type: SearchResultType.University,
        })),
        debugResponse: resp.data.debugResponse,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    console.error(err)

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

export function* searchStudents(
  action: Actions.PromiseAction<Filters.Student>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp: AxiosResponse<{
      resultsQty: number
      students: Search.StudentResult[]
      debugResponse?: any
    }> = yield api.request({
      method: `POST`,
      url: `/search/students`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.searchStudentsSucceeded({
        searchResultsCount: resp.data.resultsQty,
        searchResults: resp.data.students.map((result) => ({
          ...result,
          type: SearchResultType.Student,
        })),
        debugResponse: resp.data.debugResponse,
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

export function* searchUniversitiesByName(action: Actions.PromiseAction<any>) {
  const name = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp = yield api.request({
      method: `POST`,
      url: `/university/find-fullname`,
      data: name,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.searchUniversitiesByNameSucceeded(resp.data))
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

export function* searchStudentsByName(action: Actions.PromiseAction<any>) {
  const name = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const resp = yield api.request({
      method: `POST`,
      url: `/students/find-fullname`,
      data: name,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.searchStudentsByNameSucceeded(resp.data))
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

export function* getEquediLists() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Search.SavedSearch[]>({
      method: `GET`,
      url: `/search/static-university-student-query`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getEquediListsSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getEquediLists())
      return
    }

    yield put(actions.getEquediListsFailed())
  }
}

export function* getSavedSearches() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request({
      method: `GET`,
      url: `/search/predefined-query`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.getSavedSearchesSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getSavedSearches())
      return
    }
  }
}

export function* deleteSavedSearch(
  action: ReturnType<typeof actions.deleteSavedSearch>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    yield api.request({
      method: `DELETE`,
      url: `/search/predefined-query`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteSavedSearchSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    yield call(rejectPromiseAction, action)
  }
}

export const searchAndFiltersSaga = [
  takeLatest(ActionTypes.SearchUniversities.PromiseTrigger, searchUniversities),
  takeLatest(ActionTypes.SearchStudents.PromiseTrigger, searchStudents),
  takeLatest(
    ActionTypes.SearchUniversitiesByName.PromiseTrigger,
    searchUniversitiesByName,
  ),
  takeLatest(
    ActionTypes.SearchStudentsByName.PromiseTrigger,
    searchStudentsByName,
  ),
  takeLatest(ActionTypes.GetEquediLists.Trigger, getEquediLists),
  takeLatest(ActionTypes.GetSavedSearches.Trigger, getSavedSearches),
  takeEvery(ActionTypes.DeleteSavedSearch.PromiseTrigger, deleteSavedSearch),
]

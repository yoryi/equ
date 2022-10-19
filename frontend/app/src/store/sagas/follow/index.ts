//Redux saga
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { call, put, select, take, takeEvery } from "redux-saga/effects"

import { getSchoolTypeValue } from "../../../const/schoolTypeValue"
//Actions
import * as actions from "../../actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import {   Notifications,
  ReduxState,
  StudentProfile,
  University,
YourSchools ,
} from "../../types"
//Utils
import { handleError } from "../../utils/errors"

function* followStudent(action: ReturnType<typeof actions.followStudent>) {
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
      method: `POST`,
      url: `/students/follow`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.followStudentSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.followStudent(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

function* unfollowStudent(action: ReturnType<typeof actions.unfollowStudent>) {
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
      method: `POST`,
      url: `/students/unfollow`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.unfollowStudentSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.unfollowStudent(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

function* followUniversity(
  action: ReturnType<typeof actions.followUniversity>,
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
      method: `POST`,
      url: `/students/follow-university/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.followUniversitySucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.followUniversity(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

function* unfollowUniversity(
  action: ReturnType<typeof actions.unfollowUniversity>,
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
      url: `/students/unfollow-university/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.unfollowUniversitySucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.followUniversity(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

function* acceptFollowRequest(
  action: ReturnType<typeof actions.acceptFollowRequest>,
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
    const notifications: Notifications = yield select<
      (state: ReduxState) => Notifications | null
    >((state) => state.notifications.notifications)

    yield api.request({
      method: `POST`,
      url: `/students/accept-follow`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.acceptFollowRequestSucceeded(action.payload))
    yield put(
      actions.getNotifications({
        start: 0,
        limit: notifications.length,
        loadMore: false,
      }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.acceptFollowRequest(action.payload))
      return
    }
  }
}

function* declineFollowRequest(
  action: ReturnType<typeof actions.declineFollowRequest>,
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
    const notifications: Notifications = yield select<
      (state: ReduxState) => Notifications | null
    >((state) => state.notifications.notifications)

    yield api.request({
      method: `POST`,
      url: `/students/reject-follow-request/`,
      data: {
        notificationId: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.declineFollowRequestSucceeded(action.payload))
    yield put(
      actions.getNotifications({
        start: 0,
        limit: notifications.length,
        loadMore: false,
      }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.declineFollowRequest(action.payload))
      return
    }
  }
}

function* acceptAllFollowRequests() {
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
      method: `POST`,
      url: `/students/accept-follow-all`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.acceptAllFollowRequestsSucceeded())
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.acceptAllFollowRequests())
      return
    }
  }
}

function* addDreamUniversity(
  action: ReturnType<typeof actions.addDreamUniversity>,
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
      method: `POST`,
      url: `/students/dream-universities/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.addDreamUniversitySucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.addDreamUniversity(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

function* removeDreamUniversity({
  payload,
}: ReturnType<typeof actions.removeDreamUniversity>) {
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
      url: `/students/dream-universities/${payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.removeDreamUniversitySucceeded(payload))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.removeDreamUniversity(payload))
      return
    }
  }
}

function* getYourSchools(action: ReturnType<typeof actions.getYourSchools>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    if (action.payload) {
      const { schoolType, ...filters } = action.payload
      const schoolTypeValue = getSchoolTypeValue(schoolType[0])
      const resp = yield api.request<YourSchools>({
        method: `POST`,
        url: `/search/student-related-universities`,
        data: { schoolType: schoolTypeValue, ...filters },
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          Accept: `application/json`,
        },
      })
      yield put(actions.getYourSchoolsSucceeded(resp.data))
      yield call(resolvePromiseAction, action)
    } else {
      const resp = yield api.request<YourSchools>({
        method: `GET`,
        url: `/search/student-related-universities`,
        data: action.payload,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          Accept: `application/json`,
        },
      })
      yield put(actions.getYourSchoolsSucceeded(resp.data))
      yield call(resolvePromiseAction, action)
    }
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getYourSchools())
      return
    }

    yield call(rejectPromiseAction, action)
  }
}

function* getRecommendedUniversities() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<University[]>({
      method: `GET`,
      url: `/search/matched-universities`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getRecommendedUniversitiesSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getRecommendedUniversities())
      return
    }

    yield put(
      actions.getRecommendedUniversitiesFailed(err.response?.status !== 422),
    )
  }
}

function* getFollowedStudents(
  action: ReturnType<typeof actions.getFollowedStudents>,
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

    const resp = yield api.request<StudentProfile[]>({
      method: action.payload ? `POST` : `GET`,
      url: `/search/students/followed`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.getFollowedStudentsSucceeded(resp.data.students ?? resp.data),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getFollowedStudents())
      return
    }
  }
}

export const followSaga = [
  takeEvery(ActionTypes.FollowStudent.PromiseTrigger, followStudent),
  takeEvery(ActionTypes.UnfollowStudent.PromiseTrigger, unfollowStudent),
  takeEvery(ActionTypes.FollowUniversity.PromiseTrigger, followUniversity),
  takeEvery(ActionTypes.UnfollowUniversity.PromiseTrigger, unfollowUniversity),

  takeEvery(ActionTypes.AcceptFollowRequest.Trigger, acceptFollowRequest),
  takeEvery(ActionTypes.DeclineFollowRequest.Trigger, declineFollowRequest),
  takeEvery(
    ActionTypes.AcceptAllFollowRequests.Trigger,
    acceptAllFollowRequests,
  ),

  takeEvery(ActionTypes.AddDreamUniversity.PromiseTrigger, addDreamUniversity),
  takeEvery(
    ActionTypes.RemoveDreamUniversity.PromiseTrigger,
    removeDreamUniversity,
  ),
  takeEvery(ActionTypes.GetYourSchools.PromiseTrigger, getYourSchools),
  takeEvery(
    ActionTypes.GetRecommendedUniversities.Trigger,
    getRecommendedUniversities,
  ),
  takeEvery(
    ActionTypes.GetFollowedStudents.PromiseTrigger,
    getFollowedStudents,
  ),
]

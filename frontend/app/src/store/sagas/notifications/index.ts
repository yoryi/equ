//Redux saga
//@ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
//Types
import { AxiosResponse } from "axios"
//Utils
import _ from "lodash"
import {
  call,
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import { Notifications, NotificationType, ReduxState, Role } from "../../types"

export function* startNotificationsTask() {
  yield race({
    task: call(notificationsSync),
    cancel: take(ActionTypes.SignOut.Trigger),
  })
}

export function* notificationsSync() {
  const role = yield select<(state: ReduxState) => Role | null>(
    (state) => state.auth.user?.role ?? null,
  )
  if (!role || role === Role.Admin || role === Role.Program) {
    return
  }

  while (true) {
    yield put(
      actions.getNotifications({ start: 0, limit: 10, loadMore: false }),
    )
    if (role === Role.Student) {
      yield put(actions.getUnacceptedReferences())
    }
    yield delay(60000)
  }
}

export function* getNotifications(
  action: ReturnType<typeof actions.getNotifications>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))
    const role: Role = yield select<(state: ReduxState) => Role | null>(
      (state) => state.auth.user?.role ?? null,
    )

    const resp: AxiosResponse<Notifications> = yield api.request<Notifications>(
      {
        method: `GET`,
        url: `/notification?start=${action.payload.start}&limit=${
          action.payload.limit + 1
        }`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    )

    const notifications = resp.data.filter(
      (notification) =>
        notification.actionType !== NotificationType.UnfollowRequest ||
        role !== Role.Student,
    )

    yield put(
      actions.getNotificationsSucceeded({
        notifications: _.take(notifications, action.payload.limit),
        loadMore: action.payload.loadMore,
        canLoadMore: notifications.length === action.payload.limit + 1,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getNotifications(action.payload))
      return
    }

    yield call(rejectPromiseAction, action)
  }
}

export function* markNotificationsAsRead(
  action: ReturnType<typeof actions.markNotificationsAsRead>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    yield delay(2000)
    yield api.request({
      method: `POST`,
      url: `/notification/mark-as-read`,
      data: {
        notificationIds: action.payload.map(({ id }) => id),
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.markNotificationsAsReadSucceeded(action.payload))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.markNotificationsAsRead(action.payload))
      return
    }

    yield put(actions.markNotificationsAsReadFailed())
  }
}

export function* deleteNotification(
  action: ReturnType<typeof actions.deleteNotification>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))
    const notifications: Notifications = yield select<
      (state: ReduxState) => Notifications | null
    >((state) => state.notifications.notifications)

    yield api.request({
      method: `DELETE`,
      url: `/notification/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteNotificationSucceeded(action.payload))
    yield call(resolvePromiseAction, action)

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
      yield put(actions.deleteNotification(action.payload))
      return
    }

    yield put(actions.markNotificationsAsReadFailed())
    yield call(rejectPromiseAction, action)
  }
}

export const notificationsSaga = [
  takeLatest(
    ActionTypes.StartNotificationsTask.Trigger,
    startNotificationsTask,
  ),
  takeLatest(ActionTypes.GetNotifications.PromiseTrigger, getNotifications),
  takeLeading(
    ActionTypes.MarkNotificationsAsRead.Trigger,
    markNotificationsAsRead,
  ),
  takeEvery(ActionTypes.DeleteNotification.PromiseTrigger, deleteNotification),
]

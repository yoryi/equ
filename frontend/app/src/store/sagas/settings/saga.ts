//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { AxiosResponse } from "axios"
import { call, put, select, take, takeLatest } from "redux-saga/effects"

import history from "../../../history"
//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import { UniversityAccountSettings } from "../../types"
import * as Types from "../../types"
import { handleError } from "../../utils/errors"
import * as Responses from "./responses"

export function* getPrivacyAndSecuritySettings(
  action: Actions.PromiseAction<null>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.PrivacyAndSecuritySettings | null> = yield api.request(
      {
        method: `GET`,
        url: `/students/privacy`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": `application/json`,
        },
      },
    )

    const privacyAndSecuritySettings = resp.data ?? {
      nameAndPhoto: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      beat: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      transcript: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      extracurriculars: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      professional: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      service: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
      recognition: {
        universities: Types.Visibility.Visible,
        students: Types.Visibility.Visible,
        public: true,
      },
    }

    yield call(resolvePromiseAction, action)
    yield put(
      actions.getPrivacyAndSecuritySettingsSucceeded(
        privacyAndSecuritySettings,
      ),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    yield call(rejectPromiseAction, action)
    yield put(actions.getPrivacyAndSecuritySettingsFailed())
  }
}

export function* updatePrivacyAndSecuritySettings(
  action: Actions.PromiseAction<Types.PrivacyAndSecuritySettings>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/privacy`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.updatePrivacyAndSecuritySettingsSucceeded(action.payload))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
    }

    yield call(rejectPromiseAction, action)
  }
}

export function* updateStudentAccountSettings(
  action: Actions.PromiseAction<any>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `PATCH`,
      url: `/students/base-data`,
      data: {
        ...action.payload,
        school: action.payload.school.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.updateStudentAccountSettingsSucceeded(action.payload))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
    }

    yield call(rejectPromiseAction, action)
  }
}

export function* updateStudentPrivateAvatar(
  action: Actions.PromiseAction<Types.UpdateStudentPrivateAvatarPayload>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/privateAvatar`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.updateStudentPrivateAvatarSucceeded(action.payload))
    yield put(actions.toggleChangePrivateAvatarModal(false))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleChangePrivateAvatarModal(false))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateStudentAvatar(
  action: Actions.PromiseAction<Types.CroppedImage>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    const data = new FormData()
    data.append(`avatar`, action.payload.blob, action.payload.filename)

    const resp = yield api.request<Responses.MediaResponse>({
      method: `POST`,
      url: `/students/avatar`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.updateStudentAvatarSucceeded(resp.data.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteStudentAvatar(
  action: ReturnType<typeof actions.deleteStudentAvatar>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    yield api.request({
      method: `DELETE`,
      url: `/students/avatar`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteStudentAvatarSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateStudentCover(action: Actions.PromiseAction<File>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    const data = new FormData()
    data.append(`cover`, action.payload, action.payload.name)

    const resp = yield api.request<Types.Media>({
      method: `POST`,
      url: `/students/cover`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.updateStudentCoverSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteStudentCover(
  action: ReturnType<typeof actions.deleteStudentCover>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    yield api.request({
      method: `DELETE`,
      url: `/students/cover`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteStudentCoverSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateUniversityAvatar(
  action: ReturnType<typeof actions.updateUniversityAvatar>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    const data = new FormData()
    data.append(`avatar`, action.payload.blob, action.payload.filename)

    const resp = yield api.request<Responses.MediaResponse>({
      method: `POST`,
      url: `/university/avatar`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.updateUniversityAvatarSucceeded(resp.data.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteUniversityAvatar(
  action: ReturnType<typeof actions.deleteUniversityAvatar>,
) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => state.auth)

    yield api.request({
      method: `DELETE`,
      url: `/university/avatar`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteUniversityAvatarSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateUniversityCover(
  action: ReturnType<typeof actions.updateUniversityCover>,
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

    const data = new FormData()
    data.append(`cover`, action.payload, action.payload.name)

    const resp = yield api.request<Responses.MediaResponse>({
      method: `POST`,
      url: `/university/cover`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.updateUniversityCoverSucceeded(resp.data.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteUniversityCover(
  action: ReturnType<typeof actions.deleteUniversityCover>,
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
      url: `/university/cover`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteUniversityCoverSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* closeAccount(action: Actions.PromiseAction<any>) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/user/close-account`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.toggleCloseAccountModal())
    history.push(`/sign-in`)
    localStorage.removeItem(`refreshToken`)
    window.location.reload()
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleCloseAccountModal())
      yield put(action)
      history.push(`/sign-in`)
      localStorage.removeItem(`refreshToken`)
      window.location.reload()
    }

    yield call(rejectPromiseAction, action)
  }
}

/* istanbul ignore next */
export function* getNotificationSettings(
  action: Actions.PromiseAction<Types.NotificationsSettings>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.NotificationsSettings> = yield api.request({
      method: `GET`,
      url: `/notification/notificationSettings`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.getNotificationsSettingsSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
    }

    yield call(rejectPromiseAction, action)
  }
}

/* istanbul ignore next */
export function* updateNotificationSettings(
  action: Actions.PromiseAction<Types.NotificationsSettings>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `PATCH`,
      url: `/notification/updateNotificationSettings`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield call(resolvePromiseAction, action)
    yield put(actions.updateNotificationsSettingsSucceeded(action.payload))
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

export function* getUniversityAccountSettings() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<UniversityAccountSettings>({
      method: `GET`,
      url: `/university/account-base-data`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getUniversityAccountSettingsSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversityAccountSettings())
      return
    }
  }
}

export function* updateUniversityAccountSettings(
  action: ReturnType<typeof actions.updateUniversityAccountSettings>,
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
      method: `PATCH`,
      url: `/university/account-base-data`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.updateUniversityAccountSettingsSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.updateUniversityAccountSettings(action.payload))
      return
    }
  }
}

export function* getUniversityPageAdministrator() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Types.PageAdministrator | null>({
      method: `GET`,
      url: `/university/administrator`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getUniversityPageAdministratorSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversityPageAdministrator())
      return
    }
  }
}

export const settingsSaga = [
  takeLatest(
    ActionTypes.GetPrivacyAndSecuritySettings.PromiseTrigger,
    getPrivacyAndSecuritySettings,
  ),
  takeLatest(
    ActionTypes.UpdatePrivacyAndSecuritySettings.PromiseTrigger,
    updatePrivacyAndSecuritySettings,
  ),
  takeLatest(
    ActionTypes.GetNotificationsSettings.PromiseTrigger,
    getNotificationSettings,
  ),
  takeLatest(
    ActionTypes.UpdateNotificationsSettings.PromiseTrigger,
    updateNotificationSettings,
  ),
  takeLatest(
    ActionTypes.UpdateStudentAccountSettings.PromiseTrigger,
    updateStudentAccountSettings,
  ),
  takeLatest(
    ActionTypes.UpdateStudentsPrivateAvatar.PromiseTrigger,
    updateStudentPrivateAvatar,
  ),
  takeLatest(
    ActionTypes.UpdateStudentAvatar.PromiseTrigger,
    updateStudentAvatar,
  ),
  takeLatest(
    ActionTypes.DeleteStudentAvatar.PromiseTrigger,
    deleteStudentAvatar,
  ),
  takeLatest(ActionTypes.UpdateStudentCover.PromiseTrigger, updateStudentCover),
  takeLatest(ActionTypes.DeleteStudentCover.PromiseTrigger, deleteStudentCover),
  takeLatest(
    ActionTypes.UpdateUniversityAvatar.PromiseTrigger,
    updateUniversityAvatar,
  ),
  takeLatest(
    ActionTypes.DeleteUniversityAvatar.PromiseTrigger,
    deleteUniversityAvatar,
  ),
  takeLatest(
    ActionTypes.UpdateUniversityCover.PromiseTrigger,
    updateUniversityCover,
  ),
  takeLatest(
    ActionTypes.DeleteUniversityCover.PromiseTrigger,
    deleteUniversityCover,
  ),
  takeLatest(
    ActionTypes.GetUniversityAccountSettings.Trigger,
    getUniversityAccountSettings,
  ),
  takeLatest(
    ActionTypes.UpdateUniversityAccountSettings.PromiseTrigger,
    updateUniversityAccountSettings,
  ),
  takeLatest(
    ActionTypes.GetUniversityPageAdministrator.Trigger,
    getUniversityPageAdministrator,
  ),
  takeLatest(ActionTypes.CloseAccount.PromiseTrigger, closeAccount),
]

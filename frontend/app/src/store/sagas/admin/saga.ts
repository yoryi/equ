//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { call,put, select, take, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/payloads"
//Services
import { api } from "../../services/axios"
//Types
import {
  ReduxState,
  Reference,
  UniversitiesAdminData,
  University,
} from "../../types"
import { handleError } from "../../utils/errors"

export function* getStudentsList() {
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
      url: `/admin/student`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentsListSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentsList())
      return
    }

    yield put(actions.getStudentsListFailed())
  }
}

export function* getStudentByIdAdmin({
  payload: id,
}: ReturnType<typeof actions.getStudentByIdAdmin>) {
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
      url: `/admin/student/${id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentByIdAdminSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentByIdAdmin(id))
      return
    }

    yield put(actions.getStudentByIdAdminFailed())
  }
}

export function* getUniversityList() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<UniversitiesAdminData>({
      method: `GET`,
      url: `/admin/university`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getUniversitiesDataAdminDataSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversitiesAdminData())
      return
    }
  }
}

export function* getUniversityAdminData({
  payload: universityId,
}: ReturnType<typeof actions.getUniversityAdminData>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<University>({
      method: `GET`,
      url: `/admin/university/${universityId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getUniversityAdminDataSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getUniversityAdminData(universityId))
      return
    }
  }
}

export function* updateUniversityEmail(
  action: ReturnType<typeof actions.updateUniversityEmail>,
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
    const universityId = yield select<(state: ReduxState) => number>(
      (state) => state.admin.university!.id,
    )

    yield api.request({
      method: `POST`,
      url: `/admin/university/${universityId}/contact`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateUniversityEmailSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.updateUniversityEmail(action.payload))
      return
    }

    yield put(actions.updateUniversityEmailFailed())
    yield call(rejectPromiseAction, action)
  }
}

export function* assignUniversityProfile(
  action: ReturnType<typeof actions.assignUniversityProfile>,
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
    const universityId = yield select<(state: ReduxState) => number>(
      (state) => state.admin.university!.id,
    )

    yield api.request({
      method: `POST`,
      url: `/admin/university/${universityId}/profile`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.assignUniversityProfileSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.assignUniversityProfile(action.payload))
      return
    }

    yield put(actions.assignUniversityProfileFailed())
    yield call(rejectPromiseAction, action)
  }
}

export function* updateUniversityAdministrator(
  action: ReturnType<typeof actions.updateUniversityAdministrator>,
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
    const universityId = yield select<(state: ReduxState) => number>(
      (state) => state.admin.university!.id,
    )

    yield api.request({
      method: `PUT`,
      url: `/admin/university/${universityId}/profile`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateUniversityAdministratorSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.updateUniversityAdministrator(action.payload))
      return
    }

    yield put(actions.updateUniversityAdministratorFailed())
    yield call(rejectPromiseAction, action)
  }
}

export function* unassignUniversityProfile(
  action: ReturnType<typeof actions.unassignUniversityProfile>,
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
    const universityId = yield select<(state: ReduxState) => number>(
      (state) => state.admin.university!.id,
    )

    yield api.request({
      method: `DELETE`,
      url: `/admin/university/${universityId}/profile`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.unassignUniversityProfileSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    console.error(err)

    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.unassignUniversityProfile())
      return
    }

    yield put(actions.unassignUniversityProfileFailed())
    yield call(rejectPromiseAction, action)
  }
}

export function* toggleUniversityVisibility() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))
    const universityId = yield select<(state: ReduxState) => number>(
      (state) => state.admin.university!.id,
    )

    const resp = yield api.request({
      method: `GET`,
      url: `/admin/university/${universityId}/toggle-visibility`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.toggleUniversityVisibilitySucceeded(resp.data.isVisible))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleUniversityVisibility())
      return
    }

    yield put(actions.toggleUniversityVisibilityFailed())
  }
}

export function* resetUniversityPassword(
  action: Actions.PromiseAction<Payloads.EmailPayload>,
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
      url: `/admin/university/reset-password`,
      data: {
        email: action.payload.email,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.resetUniversityPassword(action.payload))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* resetStudentPassword(
  action: Actions.PromiseAction<Payloads.ResetPasswordPayload>,
) {
  const studentId = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `GET`,
      url: `/admin/student/${studentId}/reset-password`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.resetStudentPasswordFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* toggleLockStudentAccount(
  action: Actions.PromiseAction<Payloads.ResetPasswordPayload>,
) {
  const studentId = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    const resp = yield api.request({
      method: `GET`,
      url: `/admin/student/${studentId}/toggle-block`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.toggleLockStudentAccountSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.toggleLockStudentAccountFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* deleteStudentAccount(
  action: Actions.PromiseAction<Payloads.ResetPasswordPayload>,
) {
  const studentId = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    const resp = yield api.request({
      method: `DELETE`,
      url: `/admin/student/${studentId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.deleteStudentAccountSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.toggleLockStudentAccountFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* updateBaseStudentDataByAdmin(
  action: Actions.PromiseAction<any>,
) {
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `PUT`,
      url: `/admin/student/${action.payload.id}/base-data`,
      data: {
        ...action.payload,
        schoolId: action.payload.school.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.updateBaseStudentDataByAdminSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* updateStudentNotificationSettingsByAdmin(
  action: Actions.PromiseAction<any>,
) {
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `PUT`,
      url: `/admin/student/${action.payload.id}/notification-settings`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(
      actions.updateStudentNotificationSettingsByAdminSucceeded(action.payload),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* updateStudentPrivacySettingsByAdmin(
  action: Actions.PromiseAction<any>,
) {
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `PUT`,
      url: `/admin/student/${action.payload.id}/privacy-settings`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(
      actions.updateStudentPrivacySettingsByAdminSucceeded(action.payload),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* getPostReviewList() {
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
      url: `/admin/post-review`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getPostReviewListSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getPostReviewList())
      return
    }

    yield put(actions.getPostReviewListFailed())
  }
}

export function* toggleReviewPost(action: Actions.PromiseAction<any>) {
  const { id, type } = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    const resp = yield api.request({
      method: `GET`,
      url: `/admin/post-review/${type}/${id}/toggle-review`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.toggleReviewPostSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.toggleReviewPostFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* getPostPreview(action: Actions.PromiseAction<any>) {
  const { id, type } = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    const resp = yield api.request({
      method: `GET`,
      url: `/admin/post-review/${type}/${id}/preview-post`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.getPostPreviewSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.getPostPreviewFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* deletePostByAdmin(
  action: Actions.PromiseAction<{
    id: number
    type: number
    reason: string
    message: string
    isReviewed: boolean
  }>,
) {
  const { id, type, isReviewed, reason, message } = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `DELETE`,
      url: `/admin/post-review/${type}/${id}`,
      data: {
        id,
        reason,
        message,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.deletePostByAdminSucceeded({ id, isReviewed }))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.deletePostByAdminFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* deletePostReference(
  action: Actions.PromiseAction<{ userId: number; reference: Reference }>,
) {
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))

  try {
    yield api.request({
      method: `DELETE`,
      url: `/admin/post-review/${action.payload.userId}/${action.payload.reference.id}/reference`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.deletePostReferenceSucceeded(action.payload.reference))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.deletePostReferenceFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* mailStudentByAdmin(
  action: Actions.PromiseAction<{ email: string; message: string }>,
) {
  const { email, message } = action.payload
  const { tokenType, accessToken } = yield select<
    (
      state: ReduxState,
    ) => { tokenType: string | null; accessToken: string | null }
  >((state) => ({
    tokenType: state.auth.tokenType,
    accessToken: state.auth.accessToken,
  }))
  try {
    yield api.request({
      method: `POST`,
      url: `/admin/send-email-to-user`,
      data: { email, message },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    yield put(actions.mailStudentByAdminSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.mailStudentByAdminFailed())
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export const adminSaga = [
  takeLatest(ActionTypes.GetStudentsList.Trigger, getStudentsList),
  takeLatest(
    ActionTypes.GetStudentByIdAdmin.PromiseTrigger,
    getStudentByIdAdmin,
  ),

  takeLatest(ActionTypes.GetUniversitiesAdminData.Trigger, getUniversityList),
  takeLatest(
    ActionTypes.GetUniversityAdminData.Trigger,
    getUniversityAdminData,
  ),

  takeLatest(
    ActionTypes.UpdateUniversityEmail.PromiseTrigger,
    updateUniversityEmail,
  ),
  takeLatest(
    ActionTypes.AssignUniversityProfile.PromiseTrigger,
    assignUniversityProfile,
  ),
  takeLatest(
    ActionTypes.UpdateUniversityAdministrator.PromiseTrigger,
    updateUniversityAdministrator,
  ),
  takeLatest(
    ActionTypes.UnassignUniversityProfile.PromiseTrigger,
    unassignUniversityProfile,
  ),

  takeLatest(
    ActionTypes.ToggleUniversityVisibility.Trigger,
    toggleUniversityVisibility,
  ),
  takeLatest(
    ActionTypes.ResetUniversityPassword.PromiseTrigger,
    resetUniversityPassword,
  ),
  takeLatest(
    ActionTypes.ResetStudentPassword.PromiseTrigger,
    resetStudentPassword,
  ),
  takeLatest(
    ActionTypes.ToggleLockStudentAccount.PromiseTrigger,
    toggleLockStudentAccount,
  ),
  takeLatest(
    ActionTypes.DeleteStudentAccount.PromiseTrigger,
    deleteStudentAccount,
  ),

  takeLatest(
    ActionTypes.UpdateBaseStudentDataByAdmin.PromiseTrigger,
    updateBaseStudentDataByAdmin,
  ),
  takeLatest(
    ActionTypes.UpdateStudentNotificationSettingsByAdmin.PromiseTrigger,
    updateStudentNotificationSettingsByAdmin,
  ),
  takeLatest(
    ActionTypes.UpdateStudentPrivacySettingsByAdmin.PromiseTrigger,
    updateStudentPrivacySettingsByAdmin,
  ),

  takeLatest(ActionTypes.GetPostReviewAdminData.Trigger, getPostReviewList),
  takeLatest(ActionTypes.ToggleReviewPost.PromiseTrigger, toggleReviewPost),
  takeLatest(ActionTypes.GetPostPreview.PromiseTrigger, getPostPreview),
  takeLatest(ActionTypes.DeletePostByAdmin.PromiseTrigger, deletePostByAdmin),
  takeLatest(
    ActionTypes.DeletePostReference.PromiseTrigger,
    deletePostReference,
  ),
  takeLatest(ActionTypes.MailStudentByAdmin.PromiseTrigger, mailStudentByAdmin),
]

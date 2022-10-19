//Redux saga
//Services
import { toast } from "react-hot-toast"
import { put, select, take, takeLatest } from "redux-saga/effects"

import i18n from "../../../services/i18n"
//Actions
import * as actions from "../../actions"
import * as ActionTypes from "../../actions/actionTypes"
import { api } from "../../services/axios"
import { Role, StudentBeat } from "../../types"
//Types
import {
  Profile,
  ProfileExtracurriculars,
  ProfileProfessional,
  ProfileRecognition,
  ProfileService,
  ProfileTranscript,
  ReduxState,
  Reference,
} from "../../types"
import { StudentProfileResponse } from "./responses"

export function* getStudentProfile({
  payload: id,
}: ReturnType<typeof actions.getStudentProfile>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<StudentProfileResponse>({
      method: `GET`,
      url: `${
        user?.role !== Role.University
          ? `/students/${id}`
          : `/search/students/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    const profile: Profile = {
      ...resp.data,
      name:
        resp.data.firstName && resp.data.lastName
          ? `${resp.data.firstName} ${resp.data.lastName}`
          : resp.data.fullName,
      birthday: resp.data.birthday ? new Date(resp.data.birthday) : null,
    }

    yield put(actions.getStudentProfileSucceeded(profile))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentProfile(id))
      return
    }

    toast(i18n.t(`errors:somethingGoneWrong`))

    yield put(
      actions.getStudentProfileFailed({
        loaded: err.response?.status === 403,
      }),
    )
  }
}

export function* getStudentTranscript({
  payload: id,
}: ReturnType<typeof actions.getStudentTranscript>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<ProfileTranscript>({
      method: `GET`,
      url: `${
        user && (user.role === Role.Admin || user.role === Role.Program)
          ? `/admin/students/transcript/${id}`
          : `/students/transcript/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentTranscriptSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentTranscript(id))
      return
    }

    yield put(actions.getStudentTranscriptFailed())
  }
}

export function* getStudentExtracurriculars({
  payload: id,
}: ReturnType<typeof actions.getStudentExtracurriculars>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<ProfileExtracurriculars>({
      method: `GET`,
      url: `${
        user && (user.role === Role.Admin || user.role === Role.Program)
          ? `/admin/students/extracurriculars/${id}`
          : `/students/extracurriculars/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentExtracurricularsSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentExtracurriculars(id))
      return
    }

    console.error(err)
    yield put(actions.getStudentExtracurricularsFailed())
  }
}

export function* getStudentProfessional({
  payload: id,
}: ReturnType<typeof actions.getStudentProfessional>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<ProfileProfessional>({
      method: `GET`,
      url: `${
        user && (user.role === Role.Admin || user.role === Role.Program)
          ? `/admin/students/professional/${id}`
          : `/students/professional/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentProfessionalSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentProfessional(id))
      return
    }

    yield put(actions.getStudentProfessionalFailed())
  }
}

export function* getStudentService({
  payload: id,
}: ReturnType<typeof actions.getStudentService>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<ProfileService>({
      method: `GET`,
      url: `${
        user && (user.role === Role.Admin || user.role === Role.Program)
          ? `/admin/students/service/${id}`
          : `/students/service/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentServiceSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentService(id))
      return
    }

    yield put(actions.getStudentServiceFailed())
  }
}

export function* getStudentRecognition({
  payload: id,
}: ReturnType<typeof actions.getStudentRecognition>) {
  try {
    const { tokenType, accessToken, user } = yield select<
      (state: ReduxState) => {
        tokenType: string | null
        accessToken: string | null
        user: { role: Role } | null
      }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    }))

    const resp = yield api.request<ProfileRecognition>({
      method: `GET`,
      url: `${
        user && (user.role === Role.Admin || user.role === Role.Program)
          ? `/admin/students/recognition/${id}`
          : `/students/recognition/${id}`
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentRecognitionSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentRecognition(id))
      return
    }

    yield put(actions.getStudentRecognitionFailed())
  }
}

export function* getStudentEquediBeat({
  payload: studentId,
}: ReturnType<typeof actions.getStudentEquediBeat>) {
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

    const resp = yield api.request<StudentBeat>({
      method: `GET`,
      url: `/students/beat/${studentId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getStudentEquediBeatSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentEquediBeat(studentId))
    }
  }
}

export function* getStudentReferences({
  payload,
}: ReturnType<typeof actions.getStudentReferences>) {
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

    const resp = yield api.request<Reference[]>({
      method: `GET`,
      url: `/reference/${payload.type}/${payload.studentId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.getStudentReferencesSucceeded({
        references: resp.data,
        type: payload.type,
      }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getStudentReferences(payload))
      return
    }

    yield put(actions.getStudentReferencesFailed())
  }
}

export const studentSaga = [
  takeLatest(ActionTypes.GetStudentProfile.Trigger, getStudentProfile),
  takeLatest(ActionTypes.GetStudentTranscript.Trigger, getStudentTranscript),
  takeLatest(
    ActionTypes.GetStudentExtracurriculars.Trigger,
    getStudentExtracurriculars,
  ),
  takeLatest(
    ActionTypes.GetStudentProfessional.Trigger,
    getStudentProfessional,
  ),
  takeLatest(ActionTypes.GetStudentService.Trigger, getStudentService),
  takeLatest(ActionTypes.GetStudentRecognition.Trigger, getStudentRecognition),
  takeLatest(ActionTypes.GetStudentEquediBeat.Trigger, getStudentEquediBeat),
  takeLatest(ActionTypes.GetStudentReferences.Trigger, getStudentReferences),
]

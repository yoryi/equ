//Redux saga
//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
//Types
import { AxiosResponse } from "axios"
import qs from "querystring"
//Services
import { toast } from "react-hot-toast"
import {
  call,
  put,
  putResolve,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects"

import i18n from "../../../services/i18n"
//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/payloads"
import { api } from "../../services/axios"
import { ActivityType, AwardType, CourseType,ReduxState, ReferenceType  } from "../../types"
import * as Types from "../../types"
import { handleError } from "../../utils/errors"
import * as Responses from "./responses"

export function* getProfile() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Responses.GetProfileResponse> = yield api.request(
      {
        method: `GET`,
        url: `/students`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": `application/json`,
        },
      },
    )

    const { id, ...completion } = resp.data.completion
    const profile: Types.Profile = {
      id: resp.data.id,
      cover: resp.data.cover,
      avatar: resp.data.avatar,
      privateAvatar: resp.data.privateAvatar,
      interests:
        resp.data.interests?.map((raw: string) => parseInt(raw)) ?? null,
      firstName: resp.data.firstName,
      lastName: resp.data.lastName,
      name:
        resp.data.firstName && resp.data.lastName
          ? `${resp.data.firstName} ${resp.data.lastName}`
          : resp.data.fullName,
      email: resp.data.user.email,
      role: resp.data.user.role as Types.Role,
      school: resp.data.school,
      graduation: resp.data.graduation,
      mission: resp.data.mission || ``,
      birthday: resp.data.birthday ? new Date(resp.data.birthday) : null,
      gender: resp.data.gender,
      race: resp.data.race,
      ethnicity: resp.data.ethnicity,
      hardship: resp.data.hardship,
      signUpStep: resp.data.signUpStep,
      completion,
      isFollowed: resp.data.isFollowed,
      followRequestStatus: resp.data.followRequestStatus,
      uiSettings: resp.data.uiSettings,
      latitude: resp.data.latitude,
      longitude: resp.data.longitude,
      stateCode: resp.data.stateCode,
      zipCode: resp.data.zipCode,
    }

    yield put(actions.getProfileSucceeded(profile))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfile())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(
      actions.getProfileFailed({
        loaded: err.response?.status === 404,
      }),
    )
  }
}

export function* getProfileTranscript() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.ProfileTranscript> = yield api.request({
      method: `GET`,
      url: `/students/transcript`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfileTranscriptSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileTranscript())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(actions.getProfileTranscriptFailed())
  }
}

export function* getProfileExtracurriculars() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.ProfileExtracurriculars> = yield api.request(
      {
        method: `GET`,
        url: `/students/extracurriculars`,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": `application/json`,
        },
      },
    )

    yield put(actions.getProfileExtracurricularsSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileExtracurriculars())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(actions.getProfileExtracurricularsFailed())
  }
}

export function* getProfileProfessional() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.ProfileProfessional> = yield api.request({
      method: `GET`,
      url: `/students/professional`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfileProfessionalSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileProfessional())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(actions.getProfileProfessionalFailed())
  }
}

export function* getProfileService() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.ProfileService> = yield api.request({
      method: `GET`,
      url: `/students/service`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfileServiceSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileService())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(actions.getProfileServiceFailed())
  }
}

export function* getProfileRecognition() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<Types.ProfileRecognition> = yield api.request({
      method: `GET`,
      url: `/students/recognition`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfileRecognitionSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileRecognition())
      return
    }

    toast.error(i18n.t(`errors:somethingGoneWrong`), {
      duration: 2 ** 31 - 1,
      role: `alert`,
    })

    yield put(actions.getProfileRecognitionFailed())
  }
}

export function* getHighschools(action: Actions.PromiseAction<any>) {
  const payload = action.payload

  try {
    const resp = yield api.request({
      method: `POST`,
      url: `/school`,
      data: {
        ...payload,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getHighSchoolsSucceeded(resp.data))
    yield call(resolvePromiseAction, action, resp.data)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.getHighSchoolsFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateMission(
  action: Actions.PromiseAction<Payloads.MissionPayload>,
) {
  const { mission } = action.payload

  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/mission`,
      data: {
        mission,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateMissionSucceeded({ mission }))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield put(actions.toggleMissionStatementModal(false))
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.updateMissionFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateGPA(action: Actions.PromiseAction<Types.GPA[]>) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/data/gpa`,
      data: action.payload.map(({ gpa, year }) => ({
        grade: gpa,
        year,
      })),
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateGPASucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleGPAModal(false))
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.updateGPAFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* getGPA(action: any) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request({
      method: `GET`,
      url: `/students/data/gpa`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.getGPASucceeded(resp.data))
  } catch (err) {
    return
  }
}

/* istanbul ignore next */
export function* updateStandardizedTests(
  action: Actions.PromiseAction<Types.StandardizedTestCategory>,
) {
  const standardizedTests = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse<{ id: number }> = yield api.request({
      method: `POST`,
      url: `/students/data/test`,
      data: standardizedTests,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.updateStandardizedTestsSucceeded({
        ...standardizedTests,
        id: resp.data.id,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleStandardizedTestModal(false))
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.updateStandardizedTestsFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteStandardizedTest(
  action: Actions.PromiseAction<Types.StandardizedTestCategory>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `DELETE`,
      url: `/students/data/test/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteStandardizedTestSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
    yield put(actions.toggleStandardizedTestModal(false))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleStandardizedTestModal(false))
      yield put(action)
      return
    }

    const errors = handleError(err)

    yield put(actions.deleteStandardizedTestFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* createGlance(
  action: Actions.PromiseAction<Payloads.GlancePayload>,
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

    const resp = yield api.request<Responses.GlanceResponse>({
      method: `POST`,
      url: `/students/data/glance`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.createGlanceSucceeded(resp.data))
    yield put(actions.getGPA())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleGlanceModal(``))
        yield put(actions.toggleAddGlanceModal(``))
        yield putResolve(actions.createGlance(action.payload))
        yield call(resolvePromiseAction, action)
      } catch (err) {
        yield call(rejectPromiseAction, action, handleError(err))
      }
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateGlance(
  action: Actions.PromiseAction<Payloads.ExistingGlancePayload>,
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
      url: `/students/data/glance/${action.payload.id}`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.updateGlanceSucceeded(action.payload))
    yield put(actions.toggleEditGlanceModal(0))
    yield put(actions.getGPA())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield putResolve(actions.updateGlance(action.payload))
        yield put(actions.toggleEditGlanceModal(0))
        yield call(resolvePromiseAction, action)
      } catch (err) {
        yield call(rejectPromiseAction, action, handleError(err))
      }
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteGlance(
  action: Actions.PromiseAction<Payloads.ExistingGlancePayload>,
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
      url: `/students/data/glance/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteGlanceSucceeded(action.payload))
    yield put(actions.getGPA())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield putResolve(actions.deleteGlance(action.payload))
        yield put(actions.toggleEditGlanceModal(0))
        yield call(resolvePromiseAction, action)
      } catch (err) {
        yield call(rejectPromiseAction, action, handleError(err))
      }
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateGlanceOrder(
  action: Actions.PayloadAction<Payloads.UpdateGlanceOrderPayload>,
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

    const data: Payloads.OrderPayload = action.payload.parts.reduce(
      (order, part) => ({
        ...order,
        [part.id]: part.order,
      }),
      {},
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/glance/order`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateGlanceOrderSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield putResolve(actions.updateGlanceOrder(action.payload))
        yield call(resolvePromiseAction, action)
      } catch (err) {
        yield call(rejectPromiseAction, action, handleError(err))
      }
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* uploadFullTranscript(action: Actions.PromiseAction<any>) {
  const { data } = action.payload
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
      method: `POST`,
      url: `/students/data/transcript`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.uploadFullTranscriptSucceeded(action.payload.data))
    yield put(actions.getFullTranscript(null))
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

export function* getFullTranscript(
  action: ReturnType<typeof actions.getFullTranscript>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `GET`,
      url: `/media/transcript${
        action.payload.id ? `/${action.payload.id}` : ``
      }`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/pdf`,
      },
      responseType: `blob`,
    })

    yield put(
      actions.getFullTranscriptSucceeded({
        id: action.payload.id,
        data: resp.data,
      }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getFullTranscript(action.payload.id))
      return
    }
  }
}

export function* createCourse(
  action: Actions.PromiseAction<Types.CreateCourse>,
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

    const resp = yield api.request<Types.Course>({
      method: `POST`,
      url: `/students/data/courses`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.createCourseSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === CourseType.AP) {
        yield put(actions.toggleApCoursesModal(false))
        yield put(actions.toggleAddApCoursesModal(false))
        yield put(actions.toggleEditApCoursesModal(0))
      } else if (action.payload.type === CourseType.College) {
        yield put(actions.toggleCollegeCoursesModal(false))
        yield put(actions.toggleAddCollegeCourseModal(false))
        yield put(actions.toggleEditCollegeCourseModal(0))
      } else {
        yield put(actions.toggleSubjectCoursesModal(false))
        yield put(actions.toggleAddSubjectCoursesModal(false))
        yield put(actions.toggleEditSubjectCoursesModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateCourse(action: Actions.PromiseAction<Types.Course>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    yield api.request<Types.Course>({
      method: `PATCH`,
      url: `/students/data/courses/${action.payload.id}`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateCourseSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === CourseType.AP) {
        yield put(actions.toggleEditApCoursesModal(0))
      } else if (action.payload.type === CourseType.College) {
        yield put(actions.toggleEditCollegeCourseModal(0))
      } else {
        yield put(actions.toggleEditSubjectCoursesModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteCourse(action: Actions.PromiseAction<Types.Course>) {
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
      url: `/students/data/courses/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteCourseSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === CourseType.AP) {
        yield put(actions.toggleEditApCoursesModal(0))
      } else if (action.payload.type === CourseType.College) {
        yield put(actions.toggleEditCollegeCourseModal(0))
      } else {
        yield put(actions.toggleEditSubjectCoursesModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateCourseOrder(
  action: Actions.PayloadAction<Payloads.UpdateCourseOrderPayload>,
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

    const data: Payloads.OrderPayload = action.payload.courses.reduce(
      (order, course) => ({
        ...order,
        [course.id as number]: course.order,
      }),
      {},
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/courses/order`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateCourseOrderSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
    yield put(actions.getProfileTranscript())
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getProfileTranscript())
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addExtracurricularQuotes(
  action: Actions.PromiseAction<Types.Quotes>,
) {
  const quotes = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `POST`,
      url: `/students/data/quotes`,
      data: quotes,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.addExtracurricularQuoteSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleExtracurricularQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.addExtracurricularQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      return
    }
    yield put(actions.addExtracurricularQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateExtracurricularQuotes(
  action: Actions.PromiseAction<Types.QuotesPatch>,
) {
  const { id, content } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const prevContent = yield select<(state: ReduxState) => string | null>(
      (state) => state.profile.extracurriculars?.quote.content ?? null,
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/quote/${id}`,
      data: { content, prevContent },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateExtracurricularQuoteSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleExtracurricularQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.updateExtracurricularQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleExtracurricularQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.updateExtracurricularQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addProfessionalQuotes(
  action: Actions.PromiseAction<Types.Quotes>,
) {
  const quotes = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `POST`,
      url: `/students/data/quotes`,
      data: quotes,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.addProfessionalQuoteSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleProfessionalQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.addProfessionalQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleProfessionalQuoteModal(false))
      yield put(action)
      return
    }

    yield put(actions.addProfessionalQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateProfessionalQuotes(
  action: Actions.PromiseAction<Types.QuotesPatch>,
) {
  const { id, content } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const prevContent = yield select<(state: ReduxState) => string | null>(
      (state) => state.profile.professional?.quote.content ?? null,
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/quote/${id}`,
      data: { content, prevContent },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateProfessionalQuoteSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleProfessionalQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.updateProfessionalQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleProfessionalQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.updateProfessionalQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addServiceQuotes(action: Actions.PromiseAction<Types.Quotes>) {
  const quotes = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `POST`,
      url: `/students/data/quotes`,
      data: quotes,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.addServiceQuoteSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleServiceQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.addServiceQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleServiceQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.addServiceQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateServiceQuotes(
  action: Actions.PromiseAction<Types.QuotesPatch>,
) {
  const { id, content } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const prevContent = yield select<(state: ReduxState) => string | null>(
      (state) => state.profile.service?.quote.content ?? null,
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/quote/${id}`,
      data: { content, prevContent },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateServiceQuoteSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleServiceQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.updateServiceQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleServiceQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.updateServiceQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* addRecognitionQuotes(
  action: Actions.PromiseAction<Types.Quotes>,
) {
  const quotes = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp = yield api.request({
      method: `POST`,
      url: `/students/data/quotes`,
      data: quotes,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.addRecognitionQuoteSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleRecognitionQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.addRecognitionQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleRecognitionQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.addRecognitionQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateRecognitionQuotes(
  action: Actions.PromiseAction<Types.QuotesPatch>,
) {
  const { id, content } = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const prevContent = yield select<(state: ReduxState) => string | null>(
      (state) => state.profile.recognition?.quote.content ?? null,
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/quote/${id}`,
      data: { content, prevContent },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateRecognitionQuoteSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(actions.toggleRecognitionQuoteModal(false))
        yield put(action)
      } catch (err) {
        yield put(actions.updateRecognitionQuoteFailed(errors))
        yield call(rejectPromiseAction, action, errors)
      }
      yield put(actions.toggleRecognitionQuoteModal(false))
      yield put(action)
      return
    }
    yield put(actions.updateRecognitionQuoteFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* createAward(action: Actions.PromiseAction<Types.Award>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp = yield api.request<Types.Award>({
      method: `POST`,
      url: `/students/data/awards`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.createAwardSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === AwardType.Academic) {
        yield put(actions.toggleAcademicAwardsModal(false))
        yield put(actions.toggleAddAcademicAwardsModal(false))
        yield put(actions.toggleEditAcademicAwardsModal(0))
      } else if (action.payload.type === AwardType.Extracurriculars) {
        yield put(actions.toggleExtracurricularsAwardsModal(false))
        yield put(actions.toggleAddExtracurricularsAwardsModal(false))
        yield put(actions.toggleEditExtracurricularsAwardsModal(0))
      } else {
        yield put(actions.toggleSchoolarshipAwardsModal(false))
        yield put(actions.toggleAddSchoolarshipAwardsModal(false))
        yield put(actions.toggleEditSchoolarshipAwardsModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateAward(action: Actions.PromiseAction<Types.Award>) {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    yield api.request<Types.Award>({
      method: `PATCH`,
      url: `/students/data/awards/${action.payload.id}`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateAwardSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === AwardType.Academic) {
        yield put(actions.toggleEditAcademicAwardsModal(0))
      } else if (action.payload.type === AwardType.Extracurriculars) {
        yield put(actions.toggleEditExtracurricularsAwardsModal(0))
      } else {
        yield put(actions.toggleEditSchoolarshipAwardsModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteAward(action: Actions.PromiseAction<Types.Award>) {
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
      url: `/students/data/awards/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteAwardSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      if (action.payload.type === AwardType.Academic) {
        yield put(actions.toggleEditAcademicAwardsModal(0))
      } else if (action.payload.type === AwardType.Extracurriculars) {
        yield put(actions.toggleEditExtracurricularsAwardsModal(0))
      } else {
        yield put(actions.toggleEditSchoolarshipAwardsModal(0))
      }
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateAwardOrder(
  action: Actions.PayloadAction<Payloads.UpdateAwardOrderPayload>,
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

    const data: Payloads.OrderPayload = action.payload.awards.reduce(
      (order, award) => ({
        ...order,
        [award.id as number]: award.order,
      }),
      {},
    )

    yield api.request({
      method: `PATCH`,
      url: `/students/data/awards/order`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateAwardOrderSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
    yield put(actions.getProfileRecognition())
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getProfileRecognition())
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateExtracurricularOrder(
  action: Actions.PromiseAction<{ order: string }>,
) {
  const order = action.payload
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/extracurricular-order`,
      data: order,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfileExtracurriculars())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getProfileExtracurriculars())
      yield put(action)
      return
    }

    yield call(rejectPromiseAction, action, errors)
  }
}

export function* createActivity(
  action: Actions.PromiseAction<Types.CreateActivity>,
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

    const resp = yield api.request<Types.CreateActivity>({
      method: `POST`,
      url: `/students/data/activity`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.createActivitySucceeded(resp.data))
    yield put(actions.toggleAddActivitySecondStep(resp.data.id))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      const resp = yield put(action)
      yield put(actions.toggleAddActivitySecondStep(resp.data.id))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* updateActivity(
  action: Actions.PromiseAction<Types.CreateActivity>,
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
    yield api.request<Types.CreateActivity>({
      method: `PATCH`,
      url: `/students/data/activity/${action.payload.id}`,
      data: {
        ...action.payload,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateActivitySucceeded(action.payload))
    yield put(actions.toggleEditActivityModal(0))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleEditActivityModal(0))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteActivity(
  action: Actions.PromiseAction<{ id: number; type: ActivityType }>,
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
      url: `/students/data/activity/${action.payload.id}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.deleteActivitySucceeded(action.payload))
    yield call(resolvePromiseAction, action)
    yield put(actions.toggleEditActivityModal(0))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleEditActivityModal(0))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* uploadActivityLogo(
  action: Actions.PromiseAction<{
    activityId: number
    activityType: ActivityType
    data: any
  }>,
) {
  const { activityId, data, activityType } = action.payload
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))
    const resp = yield api.request({
      method: `PATCH`,
      url: `/students/data/activity/${activityId}/logo`,
      data,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(
      actions.uploadActivityLogoSucceeded({
        id: activityId,
        type: activityType,
        media: resp.data.data,
      }),
    )
    yield put(actions.getCurrentActivity({ activityType, activityId }))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      yield put(actions.getCurrentActivity({ activityType, activityId }))
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* deleteActivityLogo(
  action: Actions.PromiseAction<{
    activityId: number
    activityType: ActivityType
  }>,
) {
  const { activityId, activityType } = action.payload
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
      url: `/students/data/activity/${activityId}/logo`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })

    yield put(actions.deleteActivityLogoSucceeded(action.payload))
    yield put(actions.getCurrentActivity({ activityType, activityId }))
    yield put(actions.toggleUploadActivityLogoModal(false))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleUploadActivityLogoModal(false))
      yield put(action)
      yield put(actions.getCurrentActivity({ activityType, activityId }))

      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* getYourBeat() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse = yield api.request({
      method: `GET`,
      url: `/students/data/your-beat-question`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getYourBeatSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getYourBeat())
      return
    }

    yield put(actions.getYourBeatFailed())
  }
}

export function* updateYourBeat(
  action: Actions.PayloadAction<Payloads.UpdateYourBeat>,
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

    yield api.request<Types.Award>({
      method: `PATCH`,
      url: `/students/data/your-beat-answers`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateYourBeatSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.toggleYourBeatModal(0))
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* getActivityTypes() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    const resp: AxiosResponse = yield api.request({
      method: `GET`,
      url: `/students/data/activity/type-categories`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
    yield put(actions.getActivityTypesSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getActivityTypes())
      return
    }

    yield put(actions.getActivityTypesFailed())
  }
}

export function* getReferences(
  action: Actions.PayloadAction<Types.ReferenceType>,
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

    const resp: AxiosResponse<Types.Reference[]> = yield api.request({
      method: `GET`,
      url: `/reference/${action.payload}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.getReferencesSucceeded({
        type: action.payload,
        references: resp.data,
      }),
    )
  } catch (err) {}
}

export function* deleteReference(
  action: Actions.PromiseAction<Types.Reference>,
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
      url: `/reference`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.deleteReferenceSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield call(rejectPromiseAction, err)
  }
}

export function* sendReferenceLink(
  action: Actions.PromiseAction<
    | Payloads.SendAcademicReferenceLinkPayload
    | Payloads.SendActivityReferenceLinkPayload
  >,
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

    const resp = yield api.request<Types.ReferenceLink>({
      method: `POST`,
      url: `/reference/${
        action.payload.type === ReferenceType.Academic
          ? `reference-link`
          : `activity-reference-link`
      }/email`,
      data: {
        email: action.payload.email,
        type: action.payload.type,
        activityId:
          action.payload.type === ReferenceType.Activity
            ? action.payload.activity.id
            : undefined,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.sendReferenceLinkSucceeded({
        activity:
          action.payload.type === ReferenceType.Activity
            ? action.payload.activity
            : undefined,
        referenceLink: resp.data,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield putResolve(actions.sendReferenceLink(action.payload))
        yield call(resolvePromiseAction, action)
      } catch (err) {
        yield call(rejectPromiseAction, action, err)
      }
      return
    }

    yield call(rejectPromiseAction, action, {
      errors: { email: err.response?.data?.message ?? err.message },
    })
  }
}

export function* getReference(
  action: Actions.PayloadAction<Payloads.GetReferencePayload>,
) {
  try {
    const resp: AxiosResponse<Types.UnsubmittedReference> = yield api.request({
      method: `GET`,
      url: `/reference?${qs.stringify({
        user: action.payload.userId,
        token: action.payload.token,
      })}`,
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getReferenceSucceeded(resp.data))
  } catch (err) {}
}

export function* addReference(
  action: Actions.PromiseAction<Payloads.AddReferencePayload>,
) {
  try {
    let path: string | null = null
    if (action.payload.image) {
      const data = new FormData()
      data.append(`image`, action.payload.image, action.payload.image.name)

      const resp = yield api.request<{ data: string }>({
        method: `POST`,
        url: `/reference/photo`,
        data,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })

      path = resp.data.data
    }

    const resp = yield api.request<Types.Reference>({
      method: `POST`,
      url: `/reference`,
      data: {
        userId: action.payload.userId,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        organization: action.payload.organization,
        position: action.payload.position,
        content: action.payload.content,
        path: path ?? ``,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.addReferenceSucceeded(resp.data))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield call(rejectPromiseAction, action, err)
  }
}

export function* getUnacceptedReferences() {
  try {
    const { tokenType, accessToken } = yield select<
      (
        state: Types.ReduxState,
      ) => { tokenType: string | null; accessToken: string | null }
    >((state) => ({
      tokenType: state.auth.tokenType,
      accessToken: state.auth.accessToken,
    }))

    const resp: AxiosResponse<Types.Reference[]> = yield api.request({
      method: `GET`,
      url: `/reference/unaccepted`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getUnacceptedReferencesSucceeded(resp.data))
  } catch (err) {}
}

export function* acceptReference(
  action: Actions.PromiseAction<Types.Reference>,
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
      method: `POST`,
      url: `/reference/accept`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.acceptReferenceSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield call(rejectPromiseAction, action, err)
  }
}

export function* rejectReference(
  action: Actions.PromiseAction<Types.Reference>,
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
      method: `POST`,
      url: `/reference/reject`,
      data: {
        id: action.payload.id,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.rejectReferenceSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield call(rejectPromiseAction, action, err)
  }
}

export function* updateCompletionStep(
  action: Actions.PromiseAction<Payloads.UpdateCompletionStepPayload>,
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
      method: `POST`,
      url: `/students/completion-toggle`,
      data: {
        [action.payload.step]: action.payload.status,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })
  } catch (err) {
    if (err.response.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.updateCompletionStep(action.payload))
      return
    }
  }
}

export function* updateNavTabsOrder(
  action: Actions.PromiseAction<Payloads.UpdateNavTabOrderPayload>,
) {
  const { tabOrder } = action.payload

  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/students/ui-settings/tab-order`,
      data: {
        tabOrder,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.updateNavTabsOrderSucceeded({ tabOrder }))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }
  }
}

export const profileSaga = [
  takeLatest(ActionTypes.GetProfile.Trigger, getProfile),
  takeLatest(ActionTypes.GetProfileTranscript.Trigger, getProfileTranscript),
  takeLatest(
    ActionTypes.GetProfileExtracurriculars.Trigger,
    getProfileExtracurriculars,
  ),
  takeLatest(
    ActionTypes.GetProfileProfessional.Trigger,
    getProfileProfessional,
  ),
  takeLatest(ActionTypes.GetProfileService.Trigger, getProfileService),
  takeLatest(ActionTypes.GetProfileRecognition.Trigger, getProfileRecognition),
  takeLatest(ActionTypes.GetHighSchools.PromiseTrigger, getHighschools),
  takeLatest(ActionTypes.UpdateMission.PromiseTrigger, updateMission),
  takeLatest(ActionTypes.UpdateGpa.PromiseTrigger, updateGPA),
  takeLatest(
    ActionTypes.UpdateStandardizedTests.PromiseTrigger,
    updateStandardizedTests,
  ),
  takeLatest(
    ActionTypes.DeleteStandardizedTest.PromiseTrigger,
    deleteStandardizedTest,
  ),
  takeLatest(ActionTypes.CreateGlance.PromiseTrigger, createGlance),
  takeLatest(ActionTypes.UpdateGlance.PromiseTrigger, updateGlance),
  takeLatest(ActionTypes.DeleteGlance.PromiseTrigger, deleteGlance),
  takeLatest(ActionTypes.UpdateGlanceOrder.PromiseTrigger, updateGlanceOrder),
  takeLatest(
    ActionTypes.UploadFullTranscript.PromiseTrigger,
    uploadFullTranscript,
  ),
  takeLatest(ActionTypes.GetFullTranscript.Trigger, getFullTranscript),
  takeLatest(
    ActionTypes.UpdateExtracurricularOrder.PromiseTrigger,
    updateExtracurricularOrder,
  ),
  takeLatest(
    ActionTypes.AddExtracurricularsQuote.PromiseTrigger,
    addExtracurricularQuotes,
  ),
  takeLatest(
    ActionTypes.UpdateExtracurricularsQuote.PromiseTrigger,
    updateExtracurricularQuotes,
  ),
  takeLatest(
    ActionTypes.AddProfessionalQuote.PromiseTrigger,
    addProfessionalQuotes,
  ),
  takeLatest(
    ActionTypes.UpdateProfessionalQuote.PromiseTrigger,
    updateProfessionalQuotes,
  ),
  takeLatest(ActionTypes.AddServiceQuote.PromiseTrigger, addServiceQuotes),
  takeLatest(
    ActionTypes.UpdateServiceQuote.PromiseTrigger,
    updateServiceQuotes,
  ),
  takeLatest(
    ActionTypes.AddRecognitionQuote.PromiseTrigger,
    addRecognitionQuotes,
  ),
  takeLatest(
    ActionTypes.UpdateRecognitionQuote.PromiseTrigger,
    updateRecognitionQuotes,
  ),
  takeLatest(ActionTypes.CreateCourse.PromiseTrigger, createCourse),
  takeLatest(ActionTypes.UpdateCourse.PromiseTrigger, updateCourse),
  takeLatest(ActionTypes.DeleteCourse.PromiseTrigger, deleteCourse),
  takeLatest(ActionTypes.UpdateCourseOrder.PromiseTrigger, updateCourseOrder),
  takeLatest(ActionTypes.CreateAward.PromiseTrigger, createAward),
  takeLatest(ActionTypes.UpdateAward.PromiseTrigger, updateAward),
  takeLatest(ActionTypes.DeleteAward.PromiseTrigger, deleteAward),
  takeLatest(ActionTypes.UpdateAwardOrder.PromiseTrigger, updateAwardOrder),
  takeLatest(ActionTypes.CreateActivity.PromiseTrigger, createActivity),
  takeLatest(ActionTypes.UpdateActivity.PromiseTrigger, updateActivity),
  takeLatest(ActionTypes.DeleteActivity.PromiseTrigger, deleteActivity),
  takeLatest(ActionTypes.GetYourBeat.Trigger, getYourBeat),
  takeLatest(ActionTypes.UpdateYourBeat.PromiseTrigger, updateYourBeat),
  takeLatest(ActionTypes.GetActivityTypes.Trigger, getActivityTypes),
  takeLatest(ActionTypes.UploadActivityLogo.PromiseTrigger, uploadActivityLogo),
  takeLatest(ActionTypes.DeleteActivityLogo.PromiseTrigger, deleteActivityLogo),
  takeEvery(ActionTypes.GetReferences.Trigger, getReferences),
  takeLatest(ActionTypes.DeleteReference.PromiseTrigger, deleteReference),
  takeLatest(ActionTypes.SendReferenceLink.PromiseTrigger, sendReferenceLink),
  takeLatest(ActionTypes.GetReference.Trigger, getReference),
  takeLatest(ActionTypes.AddReference.PromiseTrigger, addReference),
  takeLatest(
    ActionTypes.GetUnacceptedReferences.Trigger,
    getUnacceptedReferences,
  ),
  takeLatest(ActionTypes.AcceptReference.PromiseTrigger, acceptReference),
  takeLatest(ActionTypes.RejectReference.PromiseTrigger, rejectReference),
  takeLatest(ActionTypes.UpdateCompletionStep.Trigger, updateCompletionStep),
  takeLatest(ActionTypes.UpdateNavTabsOrder.PromiseTrigger, updateNavTabsOrder),
  takeLatest(ActionTypes.GetGpa.Trigger, getGPA),
]

//Utils
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
import { call, delay, put, select, take, takeLatest } from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/auth/actionTypes"
import * as Payloads from "../../actions/payloads"
//Services
import { api } from "../../services/axios"
import * as Types from "../../types"
import { ReduxState } from "../../types"
//Utils
import { handleError } from "../../utils/errors"

export function* loadRefreshToken({
  payload: { refreshToken },
}: Actions.PayloadAction<Payloads.RefreshTokenPayload>) {
  if (!refreshToken) {
    return
  }

  yield put(actions.refreshAccessToken())
}

export function* refreshAccessToken() {
  try {
    const oldRefreshToken = yield select(
      (state: Types.ReduxState) => state.auth.refreshToken,
    )
    if (!oldRefreshToken) {
      return
    }

    const resp = yield api.request({
      method: `POST`,
      url: `/auth/refresh`,
      data: {
        refreshToken: oldRefreshToken,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    const { accessToken, tokenType, refreshToken } = resp.data

    yield put(
      actions.refreshAccessTokenSucceeded({
        accessToken,
        tokenType,
        refreshToken,
      }),
    )

    localStorage.setItem(`refreshToken`, refreshToken)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.signOut())
    } else if (err.response?.status === 410) {
      yield put(actions.toggleLogoutTokenDeprecatedModal(true))
    }
  }
}

export function* signUp(action: Actions.PromiseAction<Payloads.SignUpPayload>) {
  const {
    email,
    password,
    remember,
    captchaToken,
    termsOfUseAccepted,
  } = action.payload

  try {
    yield api.request({
      method: `POST`,
      url: `/auth/signup-unconfirmed`,
      data: {
        email,
        password,
        remember,
        hcaptchaToken: captchaToken,
        termsOfUseAccepted,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.signUpSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    yield put(actions.signUpFailed(err.response.data.message))

    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* confirmSignUp(
  action: ReturnType<typeof actions.confirmSignUp>,
) {
  try {
    const resp = yield api.request({
      method: `POST`,
      url: `/auth/signup/${action.payload.token}`,
    })

    const { accessToken, tokenType, refreshToken, remember } = resp.data

    yield put(
      actions.confirmSignUpSucceeded({ accessToken, tokenType, refreshToken }),
    )

    if (remember) {
      localStorage.setItem(`refreshToken`, refreshToken)
    } else {
      sessionStorage.setItem(`refreshToken`, refreshToken)
    }
  } catch (err) {
    yield put(actions.confirmSignUpFailed(err.response.data.message))
  }
}

export function* studentSignUpDetails(
  action: Actions.PromiseAction<Payloads.StudentSignUpDetailsPayload>,
) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    yield api.request({
      method: `POST`,
      url: `/students/signup`,
      data: {
        ...action.payload,
        school: action.payload.school?.id,
        interests: [1],
        privateAvatar: 14,
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.studentSignUpDetailsSucceeded({
        ...action.payload,
        signUpStep: `OPTIONAL_DETAILS`,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield put(actions.studentSignUpDetailsFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* studentSignUpOptionalDetails(
  action:
    | Actions.PromiseAction<Payloads.StudentSignUpOptionalDetailsPayload>
    | Actions.PromiseAction<undefined>,
) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    yield api.request({
      method: `POST`,
      url: `/students/signup/optionalDetails`,
      data: {
        gender: action.payload?.gender?.id ?? null,
        race: action.payload?.race?.id ?? null,
        ethnicity: action.payload?.ethnicity?.id ?? null,
        hardship: action.payload?.hardship ?? [],
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      action.payload
        ? actions.studentSignUpOptionalDetailsSucceeded({
            ...action.payload,
            signUpStep: `INTERESTS`,
          })
        : actions.studentSignUpSkinOptionalDetailsSucceeded(),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield put(
      action.payload
        ? actions.studentSignUpOptionalDetailsFailed()
        : actions.studentSignUpSkipOptionalDetailsFailed(),
    )
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* studentSignUpInterests(
  action: Actions.PromiseAction<Payloads.StudentSignUpInterestsPayload>,
) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    yield api.request({
      method: `POST`,
      url: `/students/signup/interests`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.studentSignUpInterestsSucceeded({
        ...action.payload,
        signUpStep: `PRIVATE_AVATAR`,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield put(actions.studentSignUpInterestsFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* studentSignUpPrivateAvatar(
  action: Actions.PromiseAction<Payloads.StudentSignUpPrivateAvatarPayload>,
) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    yield api.request({
      method: `POST`,
      url: `/students/signup/privateAvatar`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(
      actions.studentSignUpPrivateAvatarSucceeded({
        ...action.payload,
        signUpStep: `WELCOME`,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield put(actions.studentSignUpPrivateAvatarFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* studentSignUpFinish(action: Actions.PromiseAction<any>) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    yield api.request({
      method: `GET`,
      url: `/students/signup/finish`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getProfile())

    yield put(
      actions.studentSignUpFinishSucceeded({
        ...action.payload,
        signUpStep: `FINISH`,
      }),
    )
    yield call(resolvePromiseAction, action)
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(action)
      return
    }

    const errors = handleError(err)
    yield put(actions.studentSignUpFinishFailed())
    yield call(rejectPromiseAction, action, errors)
  }
}

//TODO Implement university sign up endpoint
export function* universitySignUp(
  action: Actions.PromiseAction<Payloads.UniversitySignUpPayload>,
) {
  yield delay(1000)

  yield call(resolvePromiseAction, action)
}

export function* signIn(
  action: Actions.PromiseAction<Payloads.CredentialsPayload>,
) {
  const { email, password, remember } = action.payload

  try {
    const resp = yield api.request({
      method: `POST`,
      url: `/auth/signin`,
      data: {
        email,
        password,
        remember,
      },
      headers: {
        "Content-Type": `application/json`,
      },
    })

    const { accessToken, tokenType, refreshToken } = resp.data

    yield put(actions.signInSucceeded({ accessToken, tokenType, refreshToken }))
    yield call(resolvePromiseAction, action, {
      accessToken,
      tokenType,
      refreshToken,
    })

    if (remember) {
      localStorage.setItem(`refreshToken`, refreshToken)
    } else {
      sessionStorage.setItem(`refreshToken`, refreshToken)
    }
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.signInFailed(err.response.data.message))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* getUser(
  action: Actions.PromiseAction<Payloads.CredentialsPayload>,
) {
  const { tokenType, accessToken } = yield select((state) => state.auth)

  try {
    const resp = yield api.request({
      method: `GET`,
      url: `/user`,
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getUserSucceded(resp.data))
    yield call(resolvePromiseAction, action, resp.data)
  } catch (err) {
    const errors = handleError(err)
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* requestPasswordReset(
  action: Actions.PromiseAction<Payloads.EmailPayload>,
) {
  try {
    yield api.request({
      method: `POST`,
      url: `/auth/reset-password`,
      data: {
        email: action.payload.email,
      },
    })

    yield put(actions.requestPasswordResetSucceeded())
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.requestPasswordResetFailed(err.response.data.message))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* resetPassword(
  action: Actions.PromiseAction<Payloads.ResetPasswordPayload>,
) {
  const { token, password } = action.payload
  try {
    yield api.request({
      method: `PATCH`,
      url: `/auth/reset-password/${token}`,
      data: { password },
    })
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    yield put(actions.signInFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }

  yield call(resolvePromiseAction, action)
}

export function* changePassword(
  action: Actions.PromiseAction<Payloads.ChangePasswordPayload>,
) {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)

    yield api.request({
      method: `POST`,
      url: `/auth/change`,
      data: action.payload,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.changePasswordSucceeded(action.payload))
    yield put(actions.toggleChangePasswordModal(true))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    const errors = handleError(err)
    if (
      err.response?.status === 401 &&
      err.response.data.message !== `Invalid old Password`
    ) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield put(action)
        yield put(actions.toggleChangePasswordModal(true))
      } catch (err) {
        yield put(actions.changePasswordFailed(errors))
      }
      return
    }
    yield put(actions.changePasswordFailed(errors))
    yield call(rejectPromiseAction, action, errors)
  }
}

export function* signOut() {
  try {
    const { tokenType, accessToken } = yield select((state) => state.auth)
    const token = localStorage.getItem(`refreshToken`)
    yield api.request({
      method: `GET`,
      url: `/auth/sign-out`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
        "X-Token": token,
      },
    })
  } catch (err) {}

  sessionStorage.removeItem(`refreshToken`)
  localStorage.removeItem(`refreshToken`)
}

export function* joinPilot(action: ReturnType<typeof actions.joinPilot>) {
  try {
    const { phoneNumber, highSchool, captchaToken, ...payload } = action.payload

    yield api.request({
      method: `POST`,
      url: `/auth/join-pilot`,
      data: {
        ...payload,
        phoneNumber: phoneNumber?.length === 0 ? undefined : phoneNumber,
        school: highSchool.id,
        hcaptchaToken: captchaToken,
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

export const authSaga = [
  takeLatest(ActionTypes.LoadRefreshToken.Trigger, loadRefreshToken),
  takeLatest(ActionTypes.RefreshAccessToken.Trigger, refreshAccessToken),
  takeLatest(ActionTypes.SignUp.PromiseTrigger, signUp),
  takeLatest(ActionTypes.ConfirmSignUp.Trigger, confirmSignUp),
  takeLatest(
    ActionTypes.StudentSignUpDetails.PromiseTrigger,
    studentSignUpDetails,
  ),
  takeLatest(
    ActionTypes.StudentSignUpOptionalDetails.PromiseTrigger,
    studentSignUpOptionalDetails,
  ),
  takeLatest(
    ActionTypes.StudentSignUpSkipOptionalDetails.PromiseTrigger,
    studentSignUpOptionalDetails,
  ),
  takeLatest(
    ActionTypes.StudentSignUpInterests.PromiseTrigger,
    studentSignUpInterests,
  ),
  takeLatest(
    ActionTypes.StudentSignUpPrivateAvatar.PromiseTrigger,
    studentSignUpPrivateAvatar,
  ),
  takeLatest(
    ActionTypes.StudentSignUpFinish.PromiseTrigger,
    studentSignUpFinish,
  ),
  takeLatest(ActionTypes.UniversitySignUp.PromiseTrigger, universitySignUp),
  takeLatest(ActionTypes.SignIn.PromiseTrigger, signIn),
  takeLatest(ActionTypes.GetUser.PromiseTrigger, getUser),
  takeLatest(
    ActionTypes.RequestPasswordReset.PromiseTrigger,
    requestPasswordReset,
  ),
  takeLatest(ActionTypes.ResetPassword.PromiseTrigger, resetPassword),
  takeLatest(ActionTypes.ChangePassword.PromiseTrigger, changePassword),
  takeLatest(ActionTypes.SignOut.Trigger, signOut),
  takeLatest(ActionTypes.JoinPilot.PromiseTrigger, joinPilot),
]

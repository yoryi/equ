//Redux saga
// @ts-ignore
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from "@adobe/redux-saga-promise"
//Types
import { AxiosResponse } from "axios"
import {
  call,
  put,
  putResolve,
  select,
  take,
  takeEvery,
} from "redux-saga/effects"

//Actions
import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
//Services
import { api } from "../../services/axios"
import {
  AnswerType,
  MultipleChoiceAnswer,
  MultipleChoiceQuestion,
  ReduxState,
  SingleChoiceAnswer,
  SingleChoiceQuestion,
  Survey,
  SurveyDetails,
} from "../../types"

export function* getSurveys() {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    const resp: AxiosResponse<Survey[]> = yield api.request({
      method: `GET`,
      url: `/survey`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.getSurveysSucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getSurveys())
      return
    }

    yield put(actions.getSurveysFailed())
  }
}

export function* getSurvey() {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    const resp: AxiosResponse<SurveyDetails> = yield api.request({
      method: `GET`,
      url: `/survey/college-interests`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(actions.getSurveySucceeded(resp.data))
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      yield put(actions.getSurvey())
      return
    }

    yield put(actions.getSurveyFailed())
  }
}

export function* getQuestionAnswers(action: Actions.PayloadAction<number>) {
  try {
    const { accessToken, tokenType } = yield select<
      (
        state: ReduxState,
      ) => { accessToken: string | null; tokenType: string | null }
    >((state) => ({
      accessToken: state.auth.accessToken,
      tokenType: state.auth.tokenType,
    }))

    const resp: AxiosResponse<(string | null)[]> = yield api.request<
      (string | null)[]
    >({
      method: `GET`,
      url: `/survey/college-interests/${action.payload}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    yield put(
      actions.getQuestionAnswersSucceeded({
        studentPreferenceType: action.payload,
        answer: resp.data,
      }),
    )
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
    }
  }
}

export function* answerQuestion(
  action: Actions.PayloadAction<
    | { question: SingleChoiceQuestion; answer: SingleChoiceAnswer }
    | { question: MultipleChoiceQuestion; answer: MultipleChoiceAnswer[] }
  >,
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
      url: `/survey/college-interests`,
      data: {
        studentPreferenceType: action.payload.question.studentPreferenceType,
        answers:
          action.payload.question.answerType === AnswerType.SingleChoice
            ? [(action.payload.answer as SingleChoiceAnswer).key]
            : (action.payload.answer as MultipleChoiceAnswer[])
                .filter(({ key }) => !!key)
                .map(({ key }) => key),
      },
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": `application/json`,
      },
    })

    yield put(actions.answerQuestionSucceeded(action.payload))
    yield call(resolvePromiseAction, action)
  } catch (err) {
    console.error(err)

    if (err.response?.status === 401) {
      yield put(actions.refreshAccessToken())
      yield take(ActionTypes.RefreshAccessToken.Succeeded)
      try {
        yield putResolve(actions.answerQuestion(action.payload))
        yield resolvePromiseAction(action)
      } catch (err) {
        yield rejectPromiseAction(err)
      }
      return
    }

    yield put(actions.answerQuestionFailed())
    yield call(rejectPromiseAction, action)
  }
}

export const surveysSaga = [
  takeEvery(ActionTypes.GetSurveys.Trigger, getSurveys),
  takeEvery(ActionTypes.GetSurvey.Trigger, getSurvey),
  takeEvery(ActionTypes.GetQuestionAnswers.Trigger, getQuestionAnswers),
  takeEvery(ActionTypes.AnswerQuestion.PromiseTrigger, answerQuestion),
]

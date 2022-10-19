//Action creators
// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import {
  MultipleChoiceAnswer,
  MultipleChoiceQuestion,
  SingleChoiceAnswer,
  SingleChoiceQuestion,
} from "../../types"
import * as Types from "../../types"
import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"

export const getSurveys = (): Action => ({
  type: ActionTypes.GetSurveys.Trigger,
})
export const getSurveysSucceeded = (
  payload: Types.Survey[],
): Actions.PayloadAction<Types.Survey[]> => ({
  type: ActionTypes.GetSurveys.Succeeded,
  payload,
})
export const getSurveysFailed = (): Action => ({
  type: ActionTypes.GetSurveys.Failed,
})

export const getSurvey = (): Action => ({
  type: ActionTypes.GetSurvey.Trigger,
})
export const getSurveySucceeded = (
  payload: Types.SurveyDetails,
): Actions.PayloadAction<Types.SurveyDetails> => ({
  type: ActionTypes.GetSurvey.Succeeded,
  payload,
})
export const getSurveyFailed = (): Action => ({
  type: ActionTypes.GetSurveys.Failed,
})

export const getQuestionAnswers = (
  payload: number,
): Actions.PayloadAction<number> => ({
  type: ActionTypes.GetQuestionAnswers.Trigger,
  payload,
})
export const getQuestionAnswersSucceeded = (payload: {
  studentPreferenceType: number
  answer: (string | null)[]
}) => ({
  type: ActionTypes.GetQuestionAnswers.Succeeded,
  payload,
})
export const getQuestionAnswersFailed = (): Action => ({
  type: ActionTypes.GetQuestionAnswers.Failed,
})

export const answerQuestion = (
  payload:
    | { question: SingleChoiceQuestion; answer: SingleChoiceAnswer }
    | { question: MultipleChoiceQuestion; answer: MultipleChoiceAnswer[] },
): Actions.PromiseAction<
  | { question: SingleChoiceQuestion; answer: SingleChoiceAnswer }
  | { question: MultipleChoiceQuestion; answer: MultipleChoiceAnswer[] }
> => createPromiseAction(ActionTypes.AnswerQuestion.Trigger)(payload)
export const answerQuestionSucceeded = (
  payload:
    | { question: SingleChoiceQuestion; answer: SingleChoiceAnswer }
    | { question: MultipleChoiceQuestion; answer: MultipleChoiceAnswer[] },
) => ({
  type: ActionTypes.AnswerQuestion.Succeeded,
  payload,
})
export const answerQuestionFailed = () => ({
  type: ActionTypes.AnswerQuestion.Failed,
})

export const completeSurvey = () => ({
  type: ActionTypes.CompleteSurvey.Trigger,
})

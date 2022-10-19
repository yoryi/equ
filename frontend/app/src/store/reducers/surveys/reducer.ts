//Action types
//Types
import { Action } from "redux"

import { PayloadAction } from "../../actions/actions"
import * as ActionTypes from "../../actions/surveys/actionTypes"
import {   AnswerType,
MultipleChoiceAnswer ,   MultipleChoiceQuestion,
SingleChoiceAnswer ,
  SingleChoiceQuestion,
  Survey,
  SurveyDetails,
} from "../../types"



export interface SurveysReducer {
  surveys: Survey[] | null

  isSurveyLoading: false
  survey: SurveyDetails | null
}

const initialState: SurveysReducer = {
  surveys: null,

  isSurveyLoading: false,
  survey: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetSurveys.Succeeded: {
      const surveys = (action as PayloadAction<Survey[]>).payload
      return {
        ...state,
        surveys,
      }
    }
    case ActionTypes.GetSurvey.Succeeded: {
      const survey = (action as PayloadAction<SurveyDetails>).payload
      return {
        ...state,
        survey,
      }
    }
    case ActionTypes.GetQuestionAnswers.Succeeded: {
      const { studentPreferenceType, answer } = (action as PayloadAction<{
        studentPreferenceType: number
        answer: (string | null)[]
      }>).payload
      return {
        ...state,
        survey: {
          ...state.survey,
          questions: state.survey?.questions.map((question) => {
            if (
              question.answerType === AnswerType.MultipleChoice &&
              question.studentPreferenceType === studentPreferenceType
            ) {
              question.answer = answer
            }

            return question
          }),
        },
      }
    }
    case ActionTypes.AnswerQuestion.Succeeded: {
      const {
        question: { id },
        answer,
      } = (action as PayloadAction<{
        question: SingleChoiceQuestion | MultipleChoiceQuestion
        answer: SingleChoiceAnswer | MultipleChoiceAnswer
      }>).payload
      return {
        ...state,
        survey: state.survey
          ? {
              ...state.survey,
              questions: state.survey.questions.map((question) => {
                if (question.id === id) {
                  return {
                    ...question,
                    answer: answer.key,
                  }
                }

                return question
              }),
            }
          : null,
      }
    }
    default:
      return state
  }
}

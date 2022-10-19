export enum GetSurveys {
  Trigger = `GET_SURVEYS`,
  Succeeded = `GET_SURVEYS_SUCCEEDED`,
  Failed = `GET_SURVEYS_FAILED`,
}

export enum GetSurvey {
  Trigger = `GET_SURVEY`,
  Succeeded = `GET_SURVEY_SUCCEEDED`,
  Failed = `GET_SURVEY_FAILED`,
}

export enum GetQuestionAnswers {
  Trigger = `GET_QUESTION_ANSWERS`,
  Succeeded = `GET_QUESTION_ANSWERS_SUCCEEDED`,
  Failed = `GET_QUESTION_ANSWERS_FAILED`,
}

export enum AnswerQuestion {
  Trigger = `ANSWER_QUESTION`,
  Succeeded = `ANSWER_QUESTION_SUCCEEDED`,
  Failed = `ANSWER_QUESTION_FAILED`,

  PromiseTrigger = `ANSWER_QUESTION.TRIGGER`,
}

export enum CompleteSurvey {
  Trigger = `COMPLETE_SURVEY`,
}

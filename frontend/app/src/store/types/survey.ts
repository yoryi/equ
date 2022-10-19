export interface Survey {
  id: number
  title: string
  description: string
}

export enum AnswerType {
  SingleChoice = `SINGLE_CHOICE`,
  MultipleChoice = `MULTIPLE_CHOICE`,
}

export interface Answer {
  content: string
}

export interface SingleChoiceAnswer extends Answer {
  key: number
}

export interface MultipleChoiceAnswer extends Answer {
  key: string
}

interface Question {
  id: number
  title: string
  studentPreferenceType: number
}

export interface SingleChoiceQuestion extends Question {
  answerType: AnswerType.SingleChoice
  answer: number | undefined
  body: SingleChoiceAnswer[]
}

export interface MultipleChoiceQuestion extends Question {
  answerType: AnswerType.MultipleChoice
  answer: (string | null)[] | undefined
  body: MultipleChoiceAnswer[]
}

export interface SurveyDetails extends Survey {
  questions: (SingleChoiceQuestion | MultipleChoiceQuestion)[]
}

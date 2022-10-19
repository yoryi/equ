import * as s from "@typeofweb/schema"

export const name = `answerType`

export const text = `TEXT`
export const singleChoice = `SINGLE_CHOICE`
export const multipleChoice = `MULTIPLE_CHOICE`

export const required = s.oneOf([text, singleChoice, multipleChoice])()
export const optional = s.optional(required)

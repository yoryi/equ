import * as s from "@typeofweb/schema"

const name = `percentStudents`

export const nameMale = `${name}Male` as const
export const nameFemale = `${name}Female` as const
export const nameOutState = `${name}OutState` as const
export const nameWhite = `${name}White` as const
export const nameAsian = `${name}Asian` as const
export const nameBlack = `${name}Black` as const
export const nameHispanic = `${name}Hispanic` as const
export const nameNhOrPi = `${name}NhOrPi` as const
export const nameAiOrAn = `${name}AiOrAn` as const
export const nameMultirace = `${name}Multirace` as const
export const nameUnknown = `${name}Unknown` as const
export const nameNonresidentAlien = `${name}NonresidentAlien` as const

export const required = s.number()
export const optional = s.optional(required)

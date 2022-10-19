import * as s from "@typeofweb/schema"

import { academicArt, sportsSpirit } from "./type"

export const name = `extracurricularOrder`

export const required = s.oneOf([academicArt, sportsSpirit])()
export const optional = s.optional(required)

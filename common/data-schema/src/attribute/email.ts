import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

export const name = `email`
/**
 * Can check regexes here:
 * @see https://regexr.com/4hq79
 * Inspired by https://emailregex.com/ for the JavaScript case
 */
export const regex: DataSchema.RegExDef[] = [
  ...helpers.hasLengths(5, 254),
  helpers.hasChar(`@`),
  {
    msg: `Invalid part before @`,
    exp: /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")))@.*$/,
  },
  {
    msg: `Invalid part after @`,
    exp: /.*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
]

export const required = helpers.setRegexes(
  regex,
  helpers.transformerTrimLowercase,
)
export const optional = s.optional(required)

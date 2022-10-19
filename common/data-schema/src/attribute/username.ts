import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

export const nameUsername = `username`

export const regexUsername: DataSchema.RegExDef[] = helpers.hasLengths(1, 31)

export const username = helpers.setRegexes(
  regexUsername,
  helpers.transformerTrim,
)
export const usernameOptional = s.optional(username)
/**
 * This function is for both: Frontend & Backend to consume
 *
 * We allow users as part of their usernames:
 *   - to have special characters
 *
 * To avoid issues with URLs for usernames like: "m/o"
 *   - we remove special characters like "/" from "secondary key" in our database
 *
 * @notes
 *   - no need to trim, because username is already trimmed
 *   - "g" RegExp flag to replace all
 */
export const usernameToSk = (username: string) =>
  username
    .toLowerCase()
    .replace(/\s/g, `-`)
    .replace(/[;,/?:@&=+$!~*'()#]/g, ``)

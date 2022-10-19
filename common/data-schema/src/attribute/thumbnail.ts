import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

export const nameThumbnail = `thumbnail`
/**
 * https://sharp.pixelplumbing.com/en/stable/api-resize/#extract
 * Sharp `extract` function call example:
 * @example
 * sharp(input)
 *  .extract({ left: left, top: top, width: width, height: height })
 *  .toFile(output, function(err) {
 *  // Extract a region of the input image, saving in the same format.
 * });
 * @
 * ---
 * So, we need to save a string (inside `thumbnail` attribute) that looks like: "32,24,340,420"
 */
/**
 * @todo this will become a tuple of 4 numbers, so there won't be a regex
 */
export const regexThumbnail: DataSchema.RegExDef[] = [
  {
    msg: `Need to be 'num,num,num,num'`,
    /** @see https://regexr.com/4hlqc */
    exp: /^\d+,\d+,\d+,\d+$/,
  },
]

export const thumbnail = helpers.setRegexes(regexThumbnail)
export const thumbnailOptional = s.optional(thumbnail)

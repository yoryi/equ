import * as helpers from "@equedi/data-schema/src/_helpers"
import * as s from "@typeofweb/schema"

const filteredUUIDLength = 33

export const name = `id`
export const nameCapital = `ID`
export const nameProgram = `programId`
export const nameLogo = `logoId`
export const nameActivity = `activityId`
export const nameMedia = `mediaId`
export const nameMediaPublic = `mediaPublicId`
export const nameCategory = `categoryId`
export const nameStudent = `studentId`
export const nameStudentList = `studentListId`
export const nameStudentPreference = `studentPreferenceId`
export const nameJourneys = `journeysId`
export const namePost = `postId`
export const nameUser = `userId`
export const nameJob = `jobId`
export const namePredefinedStaticQuery = `predefinedStaticQueryId`
export const nameReferenceLink = `referenceLinkId`
export const nameRelated = `relatedId`
export const nameSchool = `schoolId`
export const nameAvatar = `avatarId`
export const nameProfileAvatar = `profileAvatarId`
export const nameCover = `coverId`
export const nameUniversity = `universityId`
export const nameSender = `senderId`
export const nameRecipient = `recipientId`
export const nameSurvey = `surveyId`
export const nameInun = `inunId`
export const nameNews = `newsId`
export const nameUniversityNews = `universityNewsId`
export const nameQuestion = `questionId`

export const regex: DataSchema.RegExDef[] = [
  helpers.hasLength(filteredUUIDLength),
  {
    msg: `Only hex numbers [0-9a-fA-F], starts with 't' char`,
    /**
     * We use UUID v4
     *   - All UUID have same length = 36 chars
     *     - (36 - 4 = 32) of them are hyphens, we remove hyphens
     *   - We add "t" (32 + 1 = 33) in the beginning to avoid issues when storing ID as an object key
     * Therefore, the length is 33 chars
     * @example
     *   const { v4: uuidv4 } = require('uuid');
     *   const regexIdRaw = uuidv4(); // 36 chars -> '10ba038e-48da-487b-96e8-8d3b99b6d18a'
     *   const regexId = `t${regexIdRaw.replace("-", "")}`; // 33 chars -> 't10ba038e48da487b96e88d3b99b6d18a'
     *
     * @see https://regexr.com/4lc0h Regex rule
     */
    exp: /^(t)([0-9a-fA-F]+)$/,
  },
]

/**
 * @todo create a script to rewrite all data in the database to a single ID format
 */
export const required = s.number() as s.SomeSchema<string | number | bigint>
export const optional = s.optional(required)
export const requiredArray = s.array(required)()
export const optionalArray = s.optional(requiredArray)

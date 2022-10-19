//Action types
//Utils
import _ from "lodash"
//Types
import { Action } from "redux"

import * as Actions from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import * as Payloads from "../../actions/payloads"
import * as Responses from "../../sagas/profile/responses"
import * as Types from "../../types"
import {
  ActivityType,
  CompletionStatus,
  CompletionStep,
  Interest,
  ReferenceType,
} from "../../types"

export interface ProfileReducer {
  isProfileLoading: boolean
  isProfileLoaded: boolean
  profile: Types.Profile | null

  isTranscriptLoading: boolean
  isTranscriptLoaded: boolean
  transcript: Types.ProfileTranscript | null

  areExtracurricularsLoading: boolean
  areExtracurricularsLoaded: boolean
  extracurriculars: Types.ProfileExtracurriculars | null

  isProfessionalLoading: boolean
  isProfessionalLoaded: boolean
  professional: Types.ProfileProfessional | null

  isServiceLoading: boolean
  isServiceLoaded: boolean
  service: Types.ProfileService | null

  isRecognitionLoading: boolean
  isRecognitionLoaded: boolean
  recognition: Types.ProfileRecognition | null

  isAddActivitySecondStepOpen: number
  isExtracurricularModalOpen: boolean
  isProfessionalModalOpen: boolean
  isServiceModalOpen: boolean
  isRecognitionModalOpen: boolean

  yourBeat: any
  yourBeatQuestionId: number

  activityTypes: any
  currentActivity: any

  reference: Types.UnsubmittedReference | null
  unacceptedReferences: Types.Reference[] | null
}

export const initialState: ProfileReducer = {
  isProfileLoading: false,
  isProfileLoaded: false,
  profile: null,

  isTranscriptLoading: false,
  isTranscriptLoaded: false,
  transcript: null,

  areExtracurricularsLoading: false,
  areExtracurricularsLoaded: false,
  extracurriculars: null,

  isProfessionalLoading: false,
  isProfessionalLoaded: false,
  professional: null,

  isServiceLoading: false,
  isServiceLoaded: false,
  service: null,

  isRecognitionLoading: false,
  isRecognitionLoaded: false,
  recognition: null,

  isAddActivitySecondStepOpen: 0,
  isExtracurricularModalOpen: false,
  isProfessionalModalOpen: false,
  isServiceModalOpen: false,
  isRecognitionModalOpen: false,

  yourBeat: null,
  yourBeatQuestionId: 0,

  activityTypes: null,
  currentActivity: null,

  reference: null,
  unacceptedReferences: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetProfile.Trigger: {
      return {
        ...state,
        isProfileLoading: true,
      }
    }
    case ActionTypes.GetProfile.Succeeded: {
      const profile = (action as Actions.PayloadAction<Types.Profile>).payload
      return {
        ...state,
        isProfileLoading: false,
        isProfileLoaded: true,
        profile,
      }
    }
    case ActionTypes.GetProfile.Failed: {
      const { loaded } = (
        action as Actions.PayloadAction<Payloads.GetProfileFailedPayload>
      ).payload
      return {
        ...state,
        isProfileLoading: false,
        isProfileLoaded: loaded,
        profile: null,
      }
    }
    case ActionTypes.GetProfileTranscript.Succeeded: {
      const transcript = (
        action as Actions.PayloadAction<Types.ProfileTranscript>
      ).payload
      return {
        ...state,
        isTranscriptLoading: false,
        isTranscriptLoaded: true,
        transcript: {
          ...state.transcript,
          ...transcript,
        },
      }
    }
    case ActionTypes.GetProfileTranscript.Failed: {
      return {
        ...state,
        isTranscriptLoading: false,
        isTranscriptLoaded: false,
        transcript: null,
      }
    }
    case ActionTypes.GetProfileExtracurriculars.Trigger: {
      return {
        ...state,
        areExtracurricularsLoading: true,
      }
    }
    case ActionTypes.GetProfileExtracurriculars.Succeeded: {
      const extracurriculars = (
        action as Actions.PayloadAction<Types.ProfileExtracurriculars>
      ).payload
      return {
        ...state,
        areExtracurricularsLoading: false,
        areExtracurricularsLoaded: true,
        extracurriculars,
      }
    }
    case ActionTypes.GetProfileExtracurriculars.Failed: {
      return {
        ...state,
        areExtracurricularsLoading: false,
        areExtracurricularsLoaded: false,
        extracurriculars: null,
      }
    }
    case ActionTypes.GetProfileProfessional.Trigger: {
      return {
        ...state,
        isProfessionalLoading: true,
      }
    }
    case ActionTypes.GetProfileProfessional.Succeeded: {
      const professional = (
        action as Actions.PayloadAction<Types.ProfileProfessional>
      ).payload
      return {
        ...state,
        isProfessionalLoading: false,
        isProfessionalLoaded: true,
        professional,
      }
    }
    case ActionTypes.GetProfileProfessional.Failed: {
      return {
        ...state,
        isProfessionalLoading: false,
        isProfessionalLoaded: false,
        professional: null,
      }
    }
    case ActionTypes.GetProfileService.Trigger: {
      return {
        ...state,
        isServiceLoading: true,
      }
    }
    case ActionTypes.GetProfileService.Succeeded: {
      const service = (action as Actions.PayloadAction<Types.ProfileService>)
        .payload
      return {
        ...state,
        isServiceLoading: false,
        isServiceLoaded: true,
        service,
      }
    }
    case ActionTypes.GetProfileService.Failed: {
      return {
        ...state,
        isServiceLoading: false,
        isServiceLoaded: false,
        service: null,
      }
    }
    case ActionTypes.GetProfileRecognition.Trigger: {
      return {
        ...state,
        isRecognitionLoading: true,
      }
    }
    case ActionTypes.GetProfileRecognition.Succeeded: {
      const recognition = (
        action as Actions.PayloadAction<Types.ProfileRecognition>
      ).payload
      return {
        ...state,
        isRecognitionLoading: false,
        isRecognitionLoaded: true,
        recognition,
      }
    }
    case ActionTypes.GetProfileRecognition.Failed: {
      return {
        ...state,
        isRecognitionLoading: false,
        isRecognitionLoaded: false,
        recognition: null,
      }
    }
    case ActionTypes.SignUp.Succeeded: {
      return {
        ...state,
        profile: null,
      }
    }
    case ActionTypes.GetHighSchools.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<Types.ProfileRecognition>
      ).payload
      return {
        ...state,
        searchedHighSchools: payload,
      }
    }
    case ActionTypes.StudentSignUpDetails.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      }
    }
    case ActionTypes.StudentSignUpOptionalDetails.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      }
    }
    case ActionTypes.StudentSignUpInterests.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      }
    }
    case ActionTypes.StudentSignUpPrivateAvatar.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      }
    }
    case ActionTypes.StudentSignUpFinish.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      }
    }
    case ActionTypes.UpdateStudentAccountSettings.Succeeded: {
      const {
        firstName,
        lastName,
        email,
        school,
        graduation,
        birthday,
        gender,
        race,
        ethnicity,
        hardship,
      } = (
        action as Actions.PayloadAction<Types.UpdateStudentAccountSettingsPayload>
      ).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email,
          school,
          graduation,
          birthday,
          gender,
          race,
          ethnicity,
          hardship,
        },
      }
    }
    case ActionTypes.UpdateMission.Succeeded: {
      const { mission } = (
        action as Actions.PayloadAction<Payloads.MissionPayload>
      ).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          mission,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.MissionStatement]: CompletionStatus.Completed,
          },
        },
      }
    }
    case ActionTypes.UpdateStudentsPrivateAvatar.Succeeded: {
      const { privateAvatar } = (
        action as Actions.PayloadAction<Types.UpdateStudentPrivateAvatarPayload>
      ).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          privateAvatar,
        },
      }
    }
    case ActionTypes.CompleteSurvey.Trigger: {
      return {
        ...state,
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.CollegePreferenceSurvey]:
              CompletionStatus.Completed,
          },
        },
      }
    }
    case ActionTypes.GetPrivacyAndSecuritySettings.Succeeded:
    case ActionTypes.UpdatePrivacyAndSecuritySettings.Succeeded: {
      const privacyAndSecurity = (
        action as Actions.PayloadAction<Types.PrivacyAndSecuritySettings>
      ).payload
      return {
        ...state,
        privacyAndSecurity,
      }
    }

    case ActionTypes.UpdateGpa.Succeeded: {
      const gpas = (action as Actions.PayloadAction<Types.GPA[]>).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          gpas,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
          interests: _.uniq(
            [...state.profile!.interests!, Interest.Academic].sort(),
          ),
        },
      }
    }

    case ActionTypes.GetGpa.Succeeded: {
      const gpas = (action as Actions.PayloadAction<Types.GPA[]>).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          gpas,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
        },
      }
    }

    case ActionTypes.UpdateStandardizedTestFirstStep.Trigger: {
      const { type, date } = (
        action as Actions.PayloadAction<Payloads.UpdateStandardizedTestsFirstStep>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          standardizedTests: {
            ...(state.transcript?.standardizedTests || {}),
            type,
            date,
          },
        },
      }
    }

    case ActionTypes.UpdateStandardizedTests.Succeeded: {
      const standardizedTests = (
        action as Actions.PayloadAction<Types.StandardizedTestCategory>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          standardizedTests:
            standardizedTests.type === `ACT`
              ? {
                  act: standardizedTests,
                  sat:
                    (state.transcript &&
                      state.transcript.standardizedTests &&
                      state.transcript.standardizedTests.sat) ||
                    null,
                }
              : {
                  sat: standardizedTests,
                  act:
                    (state.transcript &&
                      state.transcript.standardizedTests &&
                      state.transcript.standardizedTests.act) ||
                    null,
                },
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
          interests: _.uniq(
            [...state.profile!.interests!, Interest.Academic].sort(),
          ),
        },
      }
    }
    case ActionTypes.DeleteStandardizedTest.Succeeded: {
      const test = (
        action as Actions.PayloadAction<Types.StandardizedTestCategory>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript ?? {}),
          standardizedTests: {
            act:
              state.transcript?.standardizedTests?.act?.id === test.id
                ? null
                : state.transcript?.standardizedTests?.act,
            sat:
              state.transcript?.standardizedTests?.sat?.id === test.id
                ? null
                : state.transcript?.standardizedTests?.sat,
          },
        },
      }
    }
    case ActionTypes.UpdateExtracurricularsQuote.Succeeded:
    case ActionTypes.AddExtracurricularsQuote.Succeeded: {
      const extracurriculars = (action as Actions.PayloadAction<Types.Quotes>)
        .payload
      return {
        ...state,
        extracurriculars: {
          ...(state.extracurriculars || {}),
          quote: extracurriculars,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.ExtracurricularsTab]: CompletionStatus.Completed,
          },
          interests: extracurriculars.content.length
            ? _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              )
            : state.profile!.interests!.filter(
                (interest) =>
                  interest !== Interest.Extracurricular ||
                  !!state.extracurriculars?.academicAndArts?.length ||
                  !!state.extracurriculars?.sportsAndSpirit?.length ||
                  !!state.extracurriculars?.hobbies?.length,
              ),
        },
      }
    }

    case ActionTypes.UpdateProfessionalQuote.Succeeded:
    case ActionTypes.AddProfessionalQuote.Succeeded: {
      const professional = (action as Actions.PayloadAction<Types.Quotes>)
        .payload
      return {
        ...state,
        professional: {
          ...(state.professional || {}),
          quote: professional,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.ExtracurricularsTab]: CompletionStatus.Completed,
          },
          interests: professional.content.length
            ? _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              )
            : state.profile!.interests!.filter(
                (interest) =>
                  interest !== Interest.Professional ||
                  !!state.professional?.employment?.length ||
                  !!state.professional?.internship?.length,
              ),
        },
      }
    }

    case ActionTypes.UpdateServiceQuote.Succeeded:
    case ActionTypes.AddServiceQuote.Succeeded: {
      const service = (action as Actions.PayloadAction<Types.Quotes>).payload
      return {
        ...state,
        service: {
          ...(state.service || {}),
          quote: service,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.ServiceTab]: CompletionStatus.Completed,
          },
          interests: service.content.length
            ? _.uniq([...state.profile!.interests!, Interest.Service].sort())
            : state.profile!.interests!.filter(
                (interest) =>
                  interest !== Interest.Service ||
                  !!state.service?.volunteerWork?.length ||
                  !!state.service?.activism?.length,
              ),
        },
      }
    }

    case ActionTypes.UpdateRecognitionQuote.Succeeded:
    case ActionTypes.AddRecognitionQuote.Succeeded: {
      const recognition = (action as Actions.PayloadAction<Types.Quotes>)
        .payload
      return {
        ...state,
        recognition: {
          ...(state.recognition || {}),
          quote: recognition,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
          },
          interests: recognition.content.length
            ? _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              )
            : state.profile!.interests!.filter(
                (interest) =>
                  interest !== Interest.Recognition ||
                  !!state.recognition?.academicAwards?.length ||
                  !!state.recognition?.extracurricularsAwards?.length ||
                  !!state.recognition?.scholarshipAwards?.length,
              ),
        },
      }
    }

    case ActionTypes.SignOut.Trigger: {
      return {
        ...state,
        isProfileLoading: false,
        isProfileLoaded: false,
        profile: null,
        yourBeat: null,
        yourBeatQuestionId: null,
      }
    }

    case ActionTypes.CreateGlance.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<Responses.GlanceResponse>
      ).payload
      const part: Types.GlancePart = {
        id: payload.id,
        name: payload.name,
        grade: payload.grade,
        date: payload.date,
        order: payload.order,
      }

      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          transcript:
            state.transcript?.transcript &&
            state.transcript.transcript.find(
              ({ name }) => name === payload.category,
            )
              ? state.transcript.transcript.map((glance) => {
                  if (glance.name === payload.category) {
                    return {
                      ...glance,
                      parts: [...(glance.parts ?? []), part],
                    }
                  }

                  return glance
                })
              : [
                  ...(state.transcript?.transcript || []),
                  {
                    name: payload.category,
                    parts: [part],
                  },
                ],
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
          interests: _.uniq(
            [...state.profile!.interests!, Interest.Academic].sort(),
          ),
        },
      }
    }
    case ActionTypes.UpdateGlance.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<Payloads.ExistingGlancePayload>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          transcript:
            state.transcript?.transcript?.map((glance) => {
              if (glance.name === payload.category) {
                return {
                  ...glance,
                  parts:
                    glance.parts?.map((part) => {
                      if (part.id === payload.id) {
                        return {
                          id: payload.id,
                          name: payload.name,
                          grade: payload.grade,
                          date: payload.date,
                          order: payload.order,
                        }
                      }

                      return part
                    }) ?? null,
                }
              }

              return glance
            }) ?? null,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
          interests: _.uniq(
            [...state.profile!.interests!, Interest.Academic].sort(),
          ),
        },
      }
    }
    case ActionTypes.DeleteGlance.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<Payloads.ExistingGlancePayload>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          transcript:
            state.transcript?.transcript?.map((glance) => {
              if (glance.name === payload.category) {
                return {
                  ...glance,
                  parts:
                    glance.parts?.filter(({ id }) => id !== payload.id) ?? null,
                }
              }

              return glance
            }) ?? null,
        },
      }
    }
    case ActionTypes.UpdateGlanceOrder.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<Payloads.UpdateGlanceOrderPayload>
      ).payload
      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          transcript:
            state.transcript?.transcript?.map((glance) => {
              if (glance.name === payload.category.toUpperCase()) {
                return {
                  ...glance,
                  parts: payload.parts,
                }
              } else if (
                payload.category === `Social Studies` &&
                glance.name === `SOCIAL_STUDIES`
              ) {
                return {
                  ...glance,
                  parts: payload.parts,
                }
              }

              return glance
            }) ?? null,
        },
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
          },
          interests: _.uniq(
            [...state.profile!.interests!, Interest.Academic].sort(),
          ),
        },
      }
    }

    case ActionTypes.GetFullTranscript.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      if (payload.id) {
        return state
      }

      return {
        ...state,
        transcript: {
          ...(state.transcript || {}),
          fullTranscript: payload.data,
        },
      }
    }

    case ActionTypes.CreateCourse.Succeeded: {
      const course = (action as Actions.PayloadAction<Types.Course>).payload

      switch (course.type) {
        case Types.CourseType.AP: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              apCourses: [...(state.transcript?.apCourses || []), course],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        case Types.CourseType.College: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              collegeCourses: [
                ...(state.transcript?.collegeCourses || []),
                course,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        default: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              satSubjectTests: [
                ...(state.transcript?.satSubjectTests || []),
                course,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
      }
    }
    case ActionTypes.UpdateCourse.Succeeded: {
      const payload = (action as Actions.PayloadAction<Types.Course>).payload

      switch (payload.type) {
        case Types.CourseType.AP: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              apCourses:
                state.transcript?.apCourses?.map((course) => {
                  if (course.id === payload.id) {
                    return payload
                  }

                  return course
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        case Types.CourseType.College: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              collegeCourses:
                state.transcript?.collegeCourses?.map((course) => {
                  if (course.id === payload.id) {
                    return payload
                  }

                  return course
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        case Types.CourseType.SAT: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              satSubjectTests:
                state.transcript?.satSubjectTests?.map((course) => {
                  if (course.id === payload.id) {
                    return payload
                  }

                  return course
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    case ActionTypes.DeleteCourse.Succeeded: {
      const course = (action as Actions.PayloadAction<Types.Course>).payload
      switch (course.type) {
        case Types.CourseType.AP: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              apCourses:
                state.transcript?.apCourses?.filter(
                  ({ id }) => id !== course.id,
                ) ?? [],
            },
          }
        }
        case Types.CourseType.College: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              collegeCourses:
                state.transcript?.collegeCourses?.filter(
                  ({ id }) => id !== course.id,
                ) ?? [],
            },
          }
        }
        case Types.CourseType.SAT: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              satSubjectTests:
                state.transcript?.satSubjectTests?.filter(
                  ({ id }) => id !== course.id,
                ) ?? [],
            },
          }
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    default:
      return state

    case ActionTypes.UpdateCourseOrder.Succeeded: {
      const { type, courses } = (
        action as Actions.PayloadAction<Payloads.UpdateCourseOrderPayload>
      ).payload

      switch (type) {
        case Types.CourseType.AP: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              apCourses: courses,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        case Types.CourseType.College: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              collegeCourses: courses,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
        case Types.CourseType.SAT: {
          return {
            ...state,
            transcript: {
              ...(state.transcript || {}),
              satSubjectTests: courses,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.TranscriptTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Academic].sort(),
              ),
            },
          }
        }
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ActionTypes.CreateAward.Succeeded: {
      const award = (action as Actions.PayloadAction<Types.Award>).payload

      switch (award.type) {
        case Types.AwardType.Academic: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              academicAwards: [
                ...(state.recognition?.academicAwards || []),
                award,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        case Types.AwardType.Extracurriculars: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              extracurricularsAwards: [
                ...(state.recognition?.extracurricularsAwards || []),
                award,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        default: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              scholarshipAwards: [
                ...(state.recognition?.scholarshipAwards || []),
                award,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
      }
    }
    case ActionTypes.UpdateAward.Succeeded: {
      const payload = (action as Actions.PayloadAction<Types.Award>).payload

      switch (payload.type) {
        case Types.AwardType.Academic: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              academicAwards:
                state.recognition?.academicAwards?.map((award) => {
                  if (award.id === payload.id) {
                    return payload
                  }

                  return award
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        case Types.AwardType.Extracurriculars: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              extracurricularsAwards:
                state.recognition?.extracurricularsAwards?.map((award) => {
                  if (award.id === payload.id) {
                    return payload
                  }

                  return award
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        case Types.AwardType.Scholarship: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              scholarshipAwards:
                state.recognition?.scholarshipAwards?.map((award) => {
                  if (award.id === payload.id) {
                    return payload
                  }

                  return award
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    case ActionTypes.DeleteAward.Succeeded: {
      const award = (action as Actions.PayloadAction<Types.Award>).payload
      switch (award.type) {
        case Types.AwardType.Academic: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              academicAwards:
                state.recognition?.academicAwards?.filter(
                  ({ id }) => id !== award.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Recognition ||
                  !!state.recognition?.quote?.content.length ||
                  !!state.recognition?.academicAwards?.filter(
                    ({ id }) => id !== award.id,
                  ).length ||
                  !!state.recognition?.extracurricularsAwards?.length ||
                  !!state.recognition?.scholarshipAwards?.length ||
                  !!state.recognition?.references?.length,
              ),
            },
          }
        }
        case Types.AwardType.Extracurriculars: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              extracurricularsAwards:
                state.recognition?.extracurricularsAwards?.filter(
                  ({ id }) => id !== award.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Recognition ||
                  !!state.recognition?.quote?.content.length ||
                  !!state.recognition?.academicAwards?.length ||
                  !!state.recognition?.extracurricularsAwards?.filter(
                    ({ id }) => id !== award.id,
                  ).length ||
                  !!state.recognition?.scholarshipAwards?.length ||
                  !!state.recognition?.references?.length,
              ),
            },
          }
        }
        case Types.AwardType.Scholarship: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              scholarshipAwards:
                state.recognition?.scholarshipAwards?.filter(
                  ({ id }) => id !== award.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Recognition ||
                  !!state.recognition?.quote?.content.length ||
                  !!state.recognition?.academicAwards?.length ||
                  !!state.recognition?.extracurricularsAwards?.length ||
                  !!state.recognition?.scholarshipAwards?.filter(
                    ({ id }) => id !== award.id,
                  ).length ||
                  !!state.recognition?.references?.length,
              ),
            },
          }
        }
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ActionTypes.UpdateAwardOrder.Succeeded: {
      const { type, awards } = (
        action as Actions.PayloadAction<Payloads.UpdateAwardOrderPayload>
      ).payload

      switch (type) {
        case Types.AwardType.Academic: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              academicAwards: awards,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        case Types.AwardType.Extracurriculars: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              extracurricularsAwards: awards,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
        case Types.AwardType.Scholarship: {
          return {
            ...state,
            recognition: {
              ...(state.recognition || {}),
              scholarshipAwards: awards,
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.RecognitionTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Recognition].sort(),
              ),
            },
          }
        }
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ActionTypes.CreateActivity.Succeeded: {
      const activity = (action as Actions.PayloadAction<Types.CreateActivity>)
        .payload

      switch (activity.type) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts: [
                ...(state.extracurriculars?.academicAndArts || []),
                activity,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit: [
                ...(state.extracurriculars?.sportsAndSpirit || []),
                activity,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies: [...(state.extracurriculars?.hobbies || []), activity],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment: [...(state.professional?.employment || []), activity],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship: [...(state.professional?.internship || []), activity],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork: [
                ...(state.service?.volunteerWork || []),
                activity,
              ],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism: [...(state.service?.activism || []), activity],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.UpdateActivity.Succeeded: {
      const payload = (action as Actions.PayloadAction<Types.CreateActivity>)
        .payload
      switch (payload.type) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.id) {
                    return {
                      ...activity,
                      ...payload,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.UpdateJourney.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      switch (payload.activity.type) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      journeys: [
                        ...payload.activity.journeys,
                        {
                          id: payload.id,
                          description: payload.description,
                          order: payload.order,
                          media: payload.media,
                        },
                      ],
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        default:
          return state
      }
    }

    // yoryi: for attachments
    case ActionTypes.UpdateAttachments.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload

      switch (payload.activity.type) {
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activity.id) {
                    return {
                      ...activity,
                      attachments: payload.attachments,
                    }
                  }

                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.DeleteAttachment.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          attachmentId: number
          activityType: ActivityType
        }>
      ).payload

      const removeAttachment = (activism) => {
        let tmpAttachments = []
        activism?.map((activity) => {
          if (activity.id === payload.activityId) {
            tmpAttachments = activity.attachments?.filter(
              (item) => item.id !== payload.attachmentId,
            )
          }
        })
        return tmpAttachments
      }

      switch (payload.activityType) {
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(state.service?.activism || []),
            },
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(state.service?.volunteerWork || []),
            },
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(
                state.extracurriculars?.academicAndArts || [],
              ),
            },
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(
                state.extracurriculars?.sportsAndSpirit || [],
              ),
            },
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(
                state.extracurriculars?.hobbies || [],
              ),
            },
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(
                state.professional?.employment || [],
              ),
            },
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            currentActivity: {
              ...(state.currentActivity || {}),
              attachments: removeAttachment(
                state.professional?.internship || [],
              ),
            },
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      attachments: activity.attachments?.filter(
                        (item) => item.id !== payload.attachmentId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.MakeFirstPhoto.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          data: any
          activityType: ActivityType
        }>
      ).payload
      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: payload.data }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.AddJourneyDescription.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          data: any
          activityType: ActivityType
        }>
      ).payload
      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ExtracurricularsTab]:
                  CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Extracurricular].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ProfessionalTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Professional].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId && activity.journeys) {
                    const updatedJourneys = activity.journeys.map((journey) => {
                      if (journey.id === payload.data.id) {
                        return payload.data
                      } else {
                        return journey
                      }
                    })
                    return { ...activity, journeys: updatedJourneys }
                  }
                  return activity
                }) ?? [],
            },
            profile: {
              ...state.profile,
              completion: {
                ...state.profile!.completion,
                [CompletionStep.ServiceTab]: CompletionStatus.Completed,
              },
              interests: _.uniq(
                [...state.profile!.interests!, Interest.Service].sort(),
              ),
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.UploadActivityLogo.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      switch (payload.type) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.id) {
                    activity.logo = payload.media
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }
    case ActionTypes.DeleteActivityLogo.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityType: ActivityType
          activityId: number
        }>
      ).payload

      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: null }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, logo: {} }
                  }
                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.DeleteActivity.Succeeded: {
      const payload = (action as Actions.PayloadAction<Types.CreateActivity>)
        .payload
      switch (payload.type) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Extracurricular ||
                  !!state.extracurriculars?.quote?.content.length ||
                  !!state.extracurriculars?.academicAndArts.filter(
                    ({ id }) => id !== payload.id,
                  ).length ||
                  !!state.extracurriculars?.sportsAndSpirit.length ||
                  !!state.extracurriculars?.hobbies.length,
              ),
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Extracurricular ||
                  !!state.extracurriculars?.quote?.content.length ||
                  !!state.extracurriculars?.academicAndArts.length ||
                  !!state.extracurriculars?.sportsAndSpirit.filter(
                    ({ id }) => id !== payload.id,
                  ).length ||
                  !!state.extracurriculars?.hobbies.length,
              ),
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Extracurricular ||
                  !!state.extracurriculars?.quote?.content.length ||
                  !!state.extracurriculars?.academicAndArts.length ||
                  !!state.extracurriculars?.sportsAndSpirit.length ||
                  !!state.extracurriculars?.hobbies.filter(
                    ({ id }) => id !== payload.id,
                  ).length,
              ),
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Professional ||
                  !!state.professional?.quote?.content.length ||
                  !!state.professional?.employment.filter(
                    ({ id }) => id !== payload.id,
                  ).length ||
                  !!state.professional?.internship.length,
              ),
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Professional ||
                  !!state.professional?.quote?.content.length ||
                  !!state.professional?.employment.length ||
                  !!state.professional?.internship.filter(
                    ({ id }) => id !== payload.id,
                  ).length,
              ),
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Service ||
                  !!state.service?.quote?.content.length ||
                  !!state.service?.volunteerWork.filter(
                    ({ id }) => id !== payload.id,
                  ).length ||
                  !!state.service?.activism.length,
              ),
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.filter(
                  ({ id }) => id !== payload.id,
                ) ?? [],
            },
            profile: {
              ...state.profile,
              interests: state.profile?.interests?.filter(
                (interest) =>
                  interest !== Interest.Service ||
                  !!state.service?.quote?.content.length ||
                  !!state.service?.volunteerWork.length ||
                  !!state.service?.activism.filter(
                    ({ id }) => id !== payload.id,
                  ).length,
              ),
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.RemovePhovoOrVideo.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          journeyId: number
          activityType: ActivityType
        }>
      ).payload
      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return {
                      ...activity,
                      journeys: activity.journeys?.filter(
                        (journey) => journey.id !== payload.journeyId,
                      ),
                    }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.DeleteJourney.Succeeded: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          journeyId: number
          activityType: ActivityType
        }>
      ).payload
      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              academicAndArts:
                state.extracurriculars?.academicAndArts?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              sportsAndSpirit:
                state.extracurriculars?.sportsAndSpirit?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            extracurriculars: {
              ...(state.extracurriculars || {}),
              hobbies:
                state.extracurriculars?.hobbies?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              employment:
                state.professional?.employment?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            professional: {
              ...(state.professional || {}),
              internship:
                state.professional?.internship?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              volunteerWork:
                state.service?.volunteerWork?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            service: {
              ...(state.service || {}),
              activism:
                state.service?.activism?.map((activity) => {
                  if (activity.id === payload.activityId) {
                    return { ...activity, journeys: [] }
                  }

                  return activity
                }) ?? [],
            },
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.GetCurrentActivity: {
      const payload = (
        action as Actions.PayloadAction<{
          activityId: number
          activityType: ActivityType
        }>
      ).payload
      switch (payload.activityType) {
        case Types.ActivityType.ACADEMIC_ART: {
          return {
            ...state,
            currentActivity: state.extracurriculars?.academicAndArts?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.SPORTS_SPIRIT: {
          return {
            ...state,
            currentActivity: state.extracurriculars?.sportsAndSpirit?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.HOBBIES: {
          return {
            ...state,
            currentActivity: state.extracurriculars?.hobbies?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.EMPLOYMENT: {
          return {
            ...state,
            currentActivity: state.professional?.employment?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.INTERNSHIP: {
          return {
            ...state,
            currentActivity: state.professional?.internship?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.VOLUNTEER: {
          return {
            ...state,
            currentActivity: state.service?.volunteerWork?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        case Types.ActivityType.ACTIVISM: {
          return {
            ...state,
            currentActivity: state.service?.activism?.find(
              (activity) => activity.id === payload.activityId,
            ),
          }
        }
        default:
          return state
      }
    }

    case ActionTypes.GetYourBeat.Succeeded: {
      const yourBeat = (
        action as Actions.PayloadAction<Payloads.YourBeatPayload[]>
      ).payload
      return {
        ...state,
        yourBeat,
      }
    }
    case ActionTypes.UpdateYourBeat.Succeeded: {
      const payload = (action as Actions.PayloadAction<Payloads.UpdateYourBeat>)
        .payload
      return {
        ...state,
        yourBeat: [
          ...(state.yourBeat?.map((beat: Payloads.YourBeatPayload) => {
            if (beat.id === payload.questionId) {
              return {
                id: payload.questionId,
                question: beat.question,
                answer: payload.answer,
              }
            }

            return beat
          }) ?? []),
        ],
        profile: {
          ...state.profile,
          completion: {
            ...state.profile!.completion,
            [CompletionStep.EquediBeat]: CompletionStatus.Completed,
          },
        },
      }
    }
    case ActionTypes.GetActivityTypes.Succeeded: {
      const activityTypes = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        activityTypes,
      }
    }
    case ActionTypes.UpdateStudentAvatar.Succeeded: {
      const avatar = (action as Actions.PayloadAction<Types.Media>).payload
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              avatar,
              completion: {
                ...state.profile.completion,
                [CompletionStep.ProfilePhoto]: CompletionStatus.Completed,
              },
            }
          : null,
      }
    }
    case ActionTypes.DeleteStudentAvatar.Succeeded: {
      if (!state.profile) {
        return state
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: null,
        },
      }
    }
    case ActionTypes.UpdateStudentCover.Succeeded: {
      const cover = (action as Actions.PayloadAction<Types.Media>).payload
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              cover,
              completion: {
                ...state.profile.completion,
                [CompletionStep.CoverPhoto]: CompletionStatus.Completed,
              },
            }
          : null,
      }
    }
    case ActionTypes.DeleteStudentCover.Succeeded: {
      if (!state.profile) {
        return state
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          cover: null,
        },
      }
    }

    case ActionTypes.FollowStudent.Succeeded: {
      if (!state.profile) {
        return state
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          isFollowed: true,
        },
      }
    }

    case ActionTypes.AddDreamUniversity.Succeeded: {
      if (!state.profile) {
        return state
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          completion: {
            ...state.profile.completion,
            [CompletionStep.DreamSchools]: CompletionStatus.Completed,
          },
        },
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ActionTypes.ToggleAddActivitySecondStep: {
      const isAddActivitySecondStepOpen = (
        action as Actions.PayloadAction<boolean>
      ).payload
      return {
        ...state,
        isAddActivitySecondStepOpen,
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ActionTypes.ToggleApCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isApCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddApCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isAddApCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditApCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isEditApCoursesModalOpen: isOpen,
        },
      }
    }

    case ActionTypes.ToggleCollegeCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isCollegeCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddCollegeCourseModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isAddCollegeCourseModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditCollegeCourseModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isEditCollegeCourseModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleSubjectCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isSubjectCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddSubjectCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isAddSubjectCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditSubjectCoursesModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isEditSubjectCoursesModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleGPAModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isGPAModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleStandardizedTestModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isStandardizedTestModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleTranscriptAtGlanceModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isTranscriptAtGlanceModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddTranscriptAtGlanceModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isAddTranscriptAtGlanceModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditTranscriptAtGlanceModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        transcript: {
          ...state.transcript,
          isEditTranscriptAtGlanceModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleExtracurricularsQuoteModal: {
      const isExtracurricularModalOpen = (
        action as Actions.PayloadAction<boolean>
      ).payload
      return {
        ...state,
        isExtracurricularModalOpen,
      }
    }
    case ActionTypes.ToggleProfessionalQuoteModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        isProfessionalModalOpen: isOpen,
      }
    }
    case ActionTypes.ToggleServiceQuoteModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        isServiceModalOpen: isOpen,
      }
    }
    case ActionTypes.ToggleRecognitionQuoteModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        isRecognitionModalOpen: isOpen,
      }
    }
    case ActionTypes.ToggleAcademicAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isAcademicAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddAcademicAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isAddAcademicAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditAcademicAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isEditAcademicAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleExtracurricularsAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isExtracirricularAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddExtracurricularsAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isAddExtracirricularAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditExtracurricularsAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isEditExtracirricularAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleSchoolarshipAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isSchoolarshipAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddSchoolarshipAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isAddSchoolarshipAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleEditSchoolarshipAwardsModal: {
      const isOpen = (action as Actions.PayloadAction<boolean>).payload
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isEditSchoolarshipAwardsModalOpen: isOpen,
        },
      }
    }
    case ActionTypes.ToggleAddActivityModal: {
      const activityModal = (
        action as Actions.PayloadAction<Types.ActivityType>
      ).payload
      return {
        ...state,
        activityModalOpen: activityModal,
        isAddActivitySecondStepOpen: 0,
      }
    }
    case ActionTypes.ToggleEditActivityModal: {
      const activityModal = (
        action as Actions.PayloadAction<Types.ActivityType>
      ).payload
      return {
        ...state,
        editActivityModalOpen: activityModal,
      }
    }
    case ActionTypes.ToggleMissionStatementModal: {
      const isMissionStatementModalOpen = (
        action as Actions.PayloadAction<boolean>
      ).payload
      return {
        ...state,
        isMissionStatementModalOpen,
      }
    }
    case ActionTypes.ToggleYourBeatModal: {
      const yourBeatQuestionId = (
        action as Actions.PayloadAction<Types.ActivityType>
      ).payload
      return {
        ...state,
        yourBeatQuestionId,
      }
    }
    case ActionTypes.ToggleJourneyModal: {
      const isJourneyModalOpen = (
        action as Actions.PayloadAction<Types.ActivityType>
      ).payload
      return {
        ...state,
        isJourneyModalOpen,
      }
    }
    case ActionTypes.ToggleEditJourneyModal: {
      const isEditJourneyModalOpen = (
        action as Actions.PayloadAction<Types.ActivityType>
      ).payload
      return {
        ...state,
        isEditJourneyModalOpen,
      }
    }
    case ActionTypes.ToggleAddJourneyDescriptionModal: {
      const isAddJourneyDescriptionModalOpen = (
        action as Actions.PayloadAction<boolean>
      ).payload
      return {
        ...state,
        isAddJourneyDescriptionModalOpen,
      }
    }
    case ActionTypes.ToggleUploadActivityLogoModal: {
      const isUploadActivityModalOpen = (
        action as Actions.PayloadAction<boolean>
      ).payload
      return {
        ...state,
        isUploadActivityModalOpen,
      }
    }
    case ActionTypes.GetReferences.Succeeded: {
      const { type, references } = (
        action as Actions.PayloadAction<{
          type: Types.ReferenceType
          references: Types.Reference[]
        }>
      ).payload

      switch (type) {
        case Types.ReferenceType.Academic: {
          return {
            ...state,
            transcript: {
              ...state.transcript,
              academicReferences: references,
            },
          }
        }
        case Types.ReferenceType.Activity: {
          return {
            ...state,
            recognition: {
              ...state.recognition,
              references,
            },
          }
        }
        default:
          return state
      }
    }
    case ActionTypes.DeleteReference.Succeeded: {
      const { id } = (action as Actions.PromiseAction<Types.Reference>).payload

      return {
        ...state,
        transcript: {
          ...state.transcript,
          academicReferences:
            state.transcript?.academicReferences?.filter(
              (reference) => reference.id !== id,
            ) ?? null,
        },
        recognition: {
          ...state.recognition,
          references:
            state.recognition?.references?.filter(
              (reference) => reference.id !== id,
            ) ?? null,
        },
      }
    }
    case ActionTypes.GetReference.Succeeded: {
      const reference = (action as Actions.PayloadAction<Types.Reference>)
        .payload
      return {
        ...state,
        reference,
      }
    }
    case ActionTypes.AddReference.Succeeded: {
      if (!state.reference) {
        return state
      }

      const reference = (action as Actions.PayloadAction<Types.Reference>)
        .payload
      return {
        ...state,
        reference: {
          ...state.reference,
          ...reference,
        },
      }
    }
    case ActionTypes.SendReferenceLink.Succeeded: {
      if (!state.extracurriculars) {
        return state
      }

      const payload = (
        action as Actions.PayloadAction<
          | Payloads.SendAcademicReferenceLinkSucceededPayload
          | Payloads.SendActivityReferenceLinkSucceededPayload
        >
      ).payload
      if (!payload.activity) {
        return state
      }

      return {
        ...state,
        extracurriculars: {
          academicAndArts: state.extracurriculars.academicAndArts.map(
            (activity) => {
              if (activity.id === payload.activity.id) {
                activity.referenceLink = payload.referenceLink
              }

              return activity
            },
          ),
          sportsAndSpirit: state.extracurriculars.sportsAndSpirit.map(
            (activity) => {
              if (activity.id === payload.activity.id) {
                activity.referenceLink = payload.referenceLink
              }

              return activity
            },
          ),
          hobbies: state.extracurriculars.hobbies.map((activity) => {
            if (activity.id === payload.activity.id) {
              activity.referenceLink = payload.referenceLink
            }

            return activity
          }),
        },
      }
    }
    case ActionTypes.GetUnacceptedReferences.Succeeded: {
      const unacceptedReferences = (
        action as Actions.PayloadAction<Types.Reference[]>
      ).payload
      return {
        ...state,
        unacceptedReferences,
      }
    }
    case ActionTypes.AcceptReference.Succeeded: {
      const reference = (action as Actions.PayloadAction<Types.Reference>)
        .payload
      return {
        ...state,
        transcript:
          state.transcript && reference.type === ReferenceType.Academic
            ? {
                ...state.transcript,
                academicReferences: state.transcript.academicReferences
                  ? [...state.transcript.academicReferences, reference]
                  : null,
              }
            : state.transcript,
        recognition:
          state.recognition && reference.type === ReferenceType.Activity
            ? {
                ...state.recognition,
                references: state.recognition.references
                  ? [...state.recognition.references, reference]
                  : null,
              }
            : state.recognition,
        unacceptedReferences:
          state.unacceptedReferences?.filter(({ id }) => id !== reference.id) ??
          null,
      }
    }
    case ActionTypes.RejectReference.Succeeded: {
      const { id } = (action as Actions.PayloadAction<Types.Reference>).payload
      return {
        ...state,
        unacceptedReferences:
          state.unacceptedReferences?.filter(
            (reference) => reference.id !== id,
          ) ?? null,
      }
    }
    case ActionTypes.UpdateCompletionStep.Trigger: {
      if (!state.profile) {
        return state
      }

      const { step, status } = (
        action as Actions.PayloadAction<Payloads.UpdateCompletionStepPayload>
      ).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          completion: {
            ...state.profile.completion,
            [step]: status,
          },
        },
      }
    }
    case ActionTypes.UpdateNavTabsOrder.Succeeded: {
      const payload = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          uiSettings: {
            tabOrder: payload.tabOrder,
          },
        },
      }
    }
  }
}

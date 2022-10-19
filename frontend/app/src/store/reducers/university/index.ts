//Action types
import { Action } from "redux"

import * as actions from "../../actions"
import { PayloadAction } from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import { University } from "../../types"
import * as Types from "../../types"

export interface UniversityReducer {
  university: University | null
  profile: University | null

  isMatchingScoreLoaded: boolean
  matchingScore: number | null

  isSpiritLoaded: boolean
  spirit: any
}

const initialState: UniversityReducer = {
  university: null,
  profile: null,

  isMatchingScoreLoaded: false,
  matchingScore: null,

  isSpiritLoaded: false,
  spirit: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetUniversity.Succeeded: {
      const { profile, id } = (action as PayloadAction<{
        profile: University
        id?: number
      }>).payload
      return {
        ...state,
        [id ? `university` : `profile`]: profile,
      }
    }
    case ActionTypes.GetUniversityMatchingScore.Succeeded: {
      const matchingScore = (action as ReturnType<
        typeof actions.getUniversityMatchingScoreSucceeded
      >).payload.score
      return {
        ...state,
        isMatchingScoreLoaded: true,
        matchingScore,
      }
    }
    case ActionTypes.GetUniversitySpirit.Succeeded: {
      const spirit = (action as PayloadAction<University>).payload
      return {
        ...state,
        isSpiritLoaded: true,
        spirit,
      }
    }
    case ActionTypes.CreateSpirit.Succeeded: {
      const spirit = (action as PayloadAction<Types.CreateActivity>).payload
      return {
        ...state,
        spirit: [...(state.spirit || {}), spirit],
      }
    }
    case ActionTypes.UpdateSpirit.Succeeded: {
      const payload = (action as PayloadAction<Types.CreateActivity>).payload
      return {
        ...state,
        spirit:
          state.spirit?.map((activity: any) => {
            if (activity.id === payload.id) {
              return payload
            }
            return activity
          }) ?? [],
      }
    }
    case ActionTypes.DeleteSpirit.Succeeded: {
      const payload = (action as PayloadAction<Types.CreateActivity>).payload
      return {
        ...state,
        spirit: state.spirit?.filter(({ id }: any) => id !== payload.id) ?? [],
      }
    }
    case ActionTypes.UpdateSpiritJourney.Succeeded: {
      const payload = (action as PayloadAction<any>).payload
      return {
        ...state,
        spirit:
          state.spirit &&
          state.spirit.length > 0 &&
          state.spirit.map((activity: any) => {
            if (activity.id === payload.news.id) {
              return {
                ...activity,
                journeys: activity.journeys
                  ? [
                      ...activity.journeys,
                      {
                        id: payload.id,
                        description: payload.description,
                        order: payload.order,
                        media: payload.media,
                      },
                    ]
                  : [
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
          }),
      }
    }
    case ActionTypes.GetDebugResponse: {
      const debugResponse = (action as any).payload
      return {
        ...state,
        universityDebugResponse: debugResponse,
      }
    }
    case ActionTypes.DeleteSpiritJourney.Succeeded: {
      const payload = (action as PayloadAction<any>).payload
      return {
        ...state,
        spirit:
          state.spirit?.map((activity: any) => {
            if (activity.id === payload.activityId) {
              return { ...activity, journeys: [] }
            }

            return activity
          }) ?? [],
      }
    }

    case ActionTypes.MakeFirstPhotoSpiritJourney.Succeeded: {
      const payload = (action as PayloadAction<any>).payload
      return {
        ...state,
        spirit:
          state.spirit?.map((activity: any) => {
            if (activity.id === payload.activityId) {
              return { ...activity, journeys: payload.data }
            }

            return activity
          }) ?? [],
      }
    }
    case ActionTypes.AddDescriptionSpiritJourney.Succeeded: {
      const payload = (action as PayloadAction<any>).payload
      return {
        ...state,
        spirit:
          state.spirit?.map((activity: any) => {
            if (activity.id === payload.activityId && activity.journeys) {
              const updatedJourneys = activity.journeys.map((journey: any) => {
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
      }
    }
    case ActionTypes.RemovePhotoOrVideoSpiritJourney.Succeeded: {
      const payload = (action as PayloadAction<any>).payload
      return {
        ...state,
        spirit:
          state.spirit?.map((activity: any) => {
            if (activity.id === payload.activityId) {
              return {
                ...activity,
                journeys: activity.journeys?.filter(
                  (journey: any) => journey.id !== payload.journeyId,
                ),
              }
            }

            return activity
          }) ?? [],
      }
    }
    case ActionTypes.UpdateUniversityMission.Succeeded: {
      const { mission } = (action as PayloadAction<{ mission: string }>).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          mission,
        },
      }
    }
    case ActionTypes.GetCurrentSpirit: {
      const payload = (action as PayloadAction<{ activityId: number }>).payload
      return {
        ...state,
        currentSpirit: state.spirit?.find(
          (activity: any) => activity.id === payload.activityId,
        ),
      }
    }
    case ActionTypes.UpdateUniversityAvatar.Succeeded: {
      const media = (action as ReturnType<
        typeof actions.updateUniversityAvatarSucceeded
      >).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: media.path,
        },
      }
    }
    case ActionTypes.DeleteUniversityAvatar.Succeeded: {
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: null,
        },
      }
    }
    case ActionTypes.UpdateUniversityCover.Succeeded: {
      const media = (action as ReturnType<
        typeof actions.updateUniversityCoverSucceeded
      >).payload
      return {
        ...state,
        profile: {
          ...state.profile,
          cover: media.path,
        },
      }
    }
    case ActionTypes.DeleteUniversityCover.Succeeded: {
      return {
        ...state,
        profile: {
          ...state.profile,
          cover: null,
        },
      }
    }
    case ActionTypes.FollowUniversity.Succeeded: {
      const payload = (action as ReturnType<
        typeof actions.followUniversitySucceeded
      >).payload

      if (payload.id !== state.university?.id) {
        return state
      }

      return {
        ...state,
        university: {
          ...state.university,
          isFollowed: true,
        },
      }
    }
    case ActionTypes.ToggleAddSpiritSecondStep: {
      const isAddSpiritSecondStepOpen = (action as PayloadAction<Types.ActivityType>)
        .payload
      return {
        ...state,
        isAddSpiritSecondStepOpen,
      }
    }
    case ActionTypes.ToggleAddSpiritModal: {
      const spiritModalOpen = (action as PayloadAction<Types.ActivityType>)
        .payload
      return {
        ...state,
        spiritModalOpen,
        isAddSpiritSecondStepOpen: 0,
        currentSpirit: null,
      }
    }
    case ActionTypes.ToggleEditSpiritModal: {
      const editSpiritModalOpen = (action as PayloadAction<Types.ActivityType>)
        .payload
      return {
        ...state,
        editSpiritModalOpen,
      }
    }
    default:
      return state
  }
}

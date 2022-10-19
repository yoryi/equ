//Action types
//Types
import { Action } from "redux"

//Actions
import * as actions from "../../actions"
import { PayloadAction } from "../../actions/actions"
import * as ActionTypes from "../../actions/actionTypes"
import { StudentProfile, UniversityProfile, YourSchools } from "../../types"

export interface FollowReducer {
  dreamUniversities: UniversityProfile[] | null
  followedUniversities: UniversityProfile[] | null
  recommendedUniversities: UniversityProfile[] | null
  isSurveyCompleted: boolean

  followedStudents: StudentProfile[] | null
}

const initialState: FollowReducer = {
  dreamUniversities: null,
  followedUniversities: null,
  recommendedUniversities: null,
  isSurveyCompleted: true,

  followedStudents: null,
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GetYourSchools.Succeeded: {
      const {
        dreamUniversity: dreamUniversities,
        followedUniversity: followedUniversities,
      } = (action as PayloadAction<YourSchools>).payload
      return {
        ...state,
        dreamUniversities: dreamUniversities ?? state.dreamUniversities,
        followedUniversities,
      }
    }
    case ActionTypes.GetRecommendedUniversities.Succeeded: {
      const recommendedUniversities = (action as PayloadAction<
        UniversityProfile[]
      >).payload
      return {
        ...state,
        recommendedUniversities,
      }
    }
    case ActionTypes.GetRecommendedUniversities.Failed: {
      const isSurveyCompleted = (action as PayloadAction<boolean>).payload
      return {
        ...state,
        isSurveyCompleted,
      }
    }
    case ActionTypes.UnfollowStudent.Succeeded: {
      if (!state.followedStudents) {
        return state
      }

      const student = (action as ReturnType<
        typeof actions.unfollowStudentSucceeded
      >).payload

      return {
        ...state,
        followedStudents: state.followedStudents.filter(
          ({ id }) => id !== student.id,
        ),
      }
    }
    case ActionTypes.FollowUniversity.Succeeded: {
      if (!state.followedUniversities) {
        return state
      }

      const university = (action as PayloadAction<UniversityProfile>).payload

      return {
        ...state,
        followedUniversities: [...state.followedUniversities, university],
        recommendedUniversities:
          state.recommendedUniversities?.filter(
            ({ id }) => id !== university.id,
          ) ?? null,
      }
    }
    case ActionTypes.UnfollowUniversity.Succeeded: {
      const university = (action as PayloadAction<UniversityProfile>).payload

      return {
        ...state,
        dreamUniversities:
          state.dreamUniversities?.filter(({ id }) => id !== university.id) ??
          null,
        followedUniversities:
          state.followedUniversities?.filter(
            ({ id }) => id !== university.id,
          ) ?? null,
      }
    }
    case ActionTypes.AddDreamUniversity.Succeeded: {
      const university = (action as PayloadAction<UniversityProfile>).payload

      if (
        !state.dreamUniversities ||
        !!state.dreamUniversities.find(({ id }) => id === university.id)
      ) {
        return state
      }

      return {
        ...state,
        dreamUniversities: [...state.dreamUniversities, university],
      }
    }
    case ActionTypes.RemoveDreamUniversity.Succeeded: {
      if (!state.dreamUniversities) {
        return state
      }

      const university = (action as PayloadAction<UniversityProfile>).payload

      return {
        ...state,
        dreamUniversities: state.dreamUniversities.filter(
          ({ id }) => id !== university.id,
        ),
      }
    }
    case ActionTypes.GetFollowedStudents.Succeeded: {
      const followedStudents = (action as ReturnType<
        typeof actions.getFollowedStudentsSucceeded
      >).payload
      return {
        ...state,
        followedStudents,
      }
    }
    case ActionTypes.CompleteSurvey.Trigger: {
      return {
        ...state,
        isSurveyCompleted: true,
      }
    }
    case ActionTypes.SignOut.Trigger: {
      return initialState
    }
    default:
      return state
  }
}

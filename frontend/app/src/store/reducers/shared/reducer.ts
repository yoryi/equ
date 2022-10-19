//Action types
import * as ActionTypes from "../../actions/shared/actionTypes"
//Types
import { Gender, Hardship,Race } from "../../types"

export interface SharedReducer {
  genders: Gender[] | null
  races: Race[] | null
  ethnicities: any[] | null
  hardships: Hardship[] | null
  searchParams: any
  postReviewDeletionReasons: any
}

const initialState: SharedReducer = {
  genders: null,
  races: null,
  ethnicities: null,
  hardships: null,
  searchParams: null,
  postReviewDeletionReasons: null,
}

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ActionTypes.GetSharedOptions.Succeeded: {
      const { genders, races, ethnicities, hardships } = payload
      return {
        ...state,
        genders,
        races,
        ethnicities,
        hardships,
      }
    }
    case ActionTypes.GetStudentSearchParams.Succeeded:
    case ActionTypes.GetUniversitySearchParams.Succeeded: {
      const searchParams = payload
      return {
        ...state,
        searchParams,
      }
    }
    case ActionTypes.GetPostReviewDeletionReasons.Succeeded: {
      const postReviewDeletionReasons = payload
      return {
        ...state,
        postReviewDeletionReasons,
      }
    }

    default:
      return state
  }
}

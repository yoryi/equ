//Actions
import { Action } from "redux"

import * as actions from "../../actions"
import * as Actions from "../../actions/actions"
//Types
import * as ActionTypes from "../../actions/actionTypes"
import { FollowRequestStatus,Search, SearchResultType } from "../../types"

export interface SearchAndFiltersReducer {
  isAllFiltersModalOpen: boolean
  searchText: string
  autocompleteSearchText: string
  recommendedSearch: string
  savedSearch: any
  autocompleteResults: []
  searchResultsCount: number | null
  searchResults: Search.Result[]
  loadingAutocompleteResults: boolean
  loadingSearchResults: boolean

  equediLists: Search.SavedSearch[] | null
  savedSearches: Search.SavedSearch[] | null
  debugResponse?: any
  currentSearchParams: any
}

export const initialState: SearchAndFiltersReducer = {
  isAllFiltersModalOpen: false,
  searchText: ``,
  autocompleteSearchText: ``,
  recommendedSearch: ``,
  savedSearch: ``,
  autocompleteResults: [],

  searchResultsCount: null,
  searchResults: [],

  loadingAutocompleteResults: false,
  loadingSearchResults: false,

  equediLists: null,
  savedSearches: null,
  debugResponse: null,
  currentSearchParams: null,
}

const MAX_AUTOCOMPLETE_SEARCH_RESULTS_LENGTH = 5

export default (
  state = initialState,
  { type, ...action }: Actions.PayloadAction<any> | Action,
) => {
  switch (type) {
    case ActionTypes.ToggleAllFiltersModal: {
      const isOpen = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        isAllFiltersModalOpen: isOpen,
      }
    }
    case ActionTypes.SetSearchText: {
      const searchText = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        searchText,
      }
    }
    case ActionTypes.SearchStudents.PromiseTrigger:
    case ActionTypes.SearchUniversities.PromiseTrigger: {
      return {
        ...state,
        loadingSearchResults: true,
      }
    }
    case ActionTypes.SearchStudents.Succeeded:
    case ActionTypes.SearchUniversities.Succeeded: {
      const {
        searchResults,
        searchResultsCount,
        debugResponse,
      } = (action as Actions.PayloadAction<{
        searchResultsCount: number
        searchResults: Search.Result[]
        debugResponse?: any
      }>).payload
      return {
        ...state,
        loadingSearchResults: false,
        searchResultsCount,
        searchResults,
        debugResponse,
      }
    }
    case ActionTypes.SearchUniversitiesByName.Succeeded:
    case ActionTypes.SearchStudentsByName.Succeeded: {
      const autocompleteResults = (action as Actions.PayloadAction<any>).payload
      const slicedAutocompleteResults =
        autocompleteResults && autocompleteResults.length > 0
          ? autocompleteResults.slice(0, MAX_AUTOCOMPLETE_SEARCH_RESULTS_LENGTH)
          : autocompleteResults
      return {
        ...state,
        loadingAutocompleteResults: false,
        autocompleteResults: slicedAutocompleteResults,
      }
    }
    case ActionTypes.SearchUniversitiesByName.Failed:
    case ActionTypes.SearchStudentsByName.Failed: {
      return {
        ...state,
        loadingAutocompleteResults: false,
        autocompleteResults: [],
      }
    }
    case ActionTypes.SetRecommendedSearch: {
      const recommendedSearch = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        recommendedSearch,
        savedSearch: {},
      }
    }
    case ActionTypes.SetSavedSearch: {
      const savedSearch = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        savedSearch,
        recommendedSearch: ``,
      }
    }
    case ActionTypes.SetAutocompleteSearchText: {
      const autocompleteSearchText = (action as Actions.PayloadAction<any>)
        .payload
      return {
        ...state,
        autocompleteSearchText,
        loadingAutocompleteResults: true,
        autocompleteResults: [],
      }
    }
    case ActionTypes.GetEquediLists.Succeeded: {
      const equediLists = (action as Actions.PayloadAction<
        Search.SavedSearch[]
      >).payload
      return {
        ...state,
        equediLists,
      }
    }
    case ActionTypes.GetSavedSearches.Succeeded: {
      const savedSearches = (action as Actions.PayloadAction<
        Search.SavedSearch[]
      >).payload
      return {
        ...state,
        savedSearches,
      }
    }
    case ActionTypes.DeleteSavedSearch.Succeeded: {
      const savedSearch = (action as ReturnType<
        typeof actions.deleteSavedSearchSucceeded
      >).payload
      return {
        ...state,
        savedSearches:
          state.savedSearches?.filter(({ id }) => id !== savedSearch.id) ??
          state.savedSearches,
      }
    }
    case ActionTypes.FollowStudent.Succeeded: {
      const student = (action as ReturnType<
        typeof actions.followStudentSucceeded
      >).payload
      return {
        ...state,
        searchResults: state.searchResults.map((result) => {
          if (
            result.type === SearchResultType.Student &&
            student.id === result.id
          ) {
            result.followRequestStatus = FollowRequestStatus.Pending
          }

          return result
        }),
      }
    }
    case ActionTypes.FollowUniversity.Succeeded: {
      const university = (action as ReturnType<
        typeof actions.followUniversitySucceeded
      >).payload
      return {
        ...state,
        searchResults: state.searchResults.map((result) => {
          if (
            result.type === SearchResultType.University &&
            university.id === result.id
          ) {
            result.isFollowed = true
          }

          return result
        }),
      }
    }
    case ActionTypes.UnfollowUniversity.Succeeded: {
      const university = (action as ReturnType<
        typeof actions.unfollowUniversitySucceeded
      >).payload
      return {
        ...state,
        searchResults: state.searchResults.map((result) => {
          if (
            result.type === SearchResultType.University &&
            university.id === result.id
          ) {
            result.isFollowed = false
          }

          return result
        }),
      }
    }
    case ActionTypes.SetCurrentSearchParams: {
      const currentSearchParams = (action as Actions.PayloadAction<any>).payload
      return {
        ...state,
        currentSearchParams,
      }
    }
    case ActionTypes.SignOut.Trigger: {
      return initialState
    }
    default:
      return state
  }
}

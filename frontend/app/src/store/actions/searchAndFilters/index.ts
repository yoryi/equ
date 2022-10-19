// @ts-ignore
import { createPromiseAction } from "@adobe/redux-saga-promise"
//Types
import { Action } from "redux"

import { Search } from "../../types"
import * as Actions from "../actions"
//Action types
import * as ActionTypes from "./actionTypes"

export const toggleAllFiltersModal = (payload: boolean) => ({
  type: ActionTypes.ToggleAllFiltersModal,
  payload,
})

export const searchUniversities = (payload: any): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.SearchUniversities.Trigger)(payload)
export const searchUniversitiesSucceeded = (payload: {
  searchResultsCount: number
  searchResults: Search.Result[]
  debugResponse?: any
}): Actions.PayloadAction<{
  searchResultsCount: number
  searchResults: Search.Result[]
}> => ({
  type: ActionTypes.SearchUniversities.Succeeded,
  payload,
})
export const searchUniversitiesFailed = () => ({
  type: ActionTypes.SearchUniversities.Failed,
})

export const searchStudents = (payload: any): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.SearchStudents.Trigger)(payload)
export const searchStudentsSucceeded = (payload: {
  searchResultsCount: number
  searchResults: Search.Result[]
  debugResponse?: any
}): Actions.PayloadAction<{
  searchResultsCount: number
  searchResults: Search.Result[]
}> => ({
  type: ActionTypes.SearchStudents.Succeeded,
  payload,
})
export const searchStudentsFailed = () => ({
  type: ActionTypes.SearchStudents.Failed,
})

export const searchStudentsByName = (
  payload: any,
): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.SearchStudentsByName.Trigger)(payload)
export const searchStudentsByNameSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.SearchStudentsByName.Succeeded,
  payload,
})
export const searchStudentsByNameFailed = () => ({
  type: ActionTypes.SearchStudentsByName.Failed,
})

export const searchUniversitiesByName = (
  payload: any,
): Actions.PromiseAction<null> =>
  createPromiseAction(ActionTypes.SearchUniversitiesByName.Trigger)(payload)
export const searchUniversitiesByNameSucceeded = (
  payload: any,
): Actions.PayloadAction<any> => ({
  type: ActionTypes.SearchUniversitiesByName.Succeeded,
  payload,
})
export const searchUniversitiesByNameFailed = () => ({
  type: ActionTypes.SearchUniversitiesByName.Failed,
})

export const getEquediLists = (): Action => ({
  type: ActionTypes.GetEquediLists.Trigger,
})
export const getEquediListsSucceeded = (
  payload: Search.SavedSearch[],
): Actions.PayloadAction<Search.SavedSearch[]> => ({
  type: ActionTypes.GetEquediLists.Succeeded,
  payload,
})
export const getEquediListsFailed = (): Action => ({
  type: ActionTypes.GetEquediLists.Failed,
})

export const getSavedSearches = (): Action => ({
  type: ActionTypes.GetSavedSearches.Trigger,
})
export const getSavedSearchesSucceeded = (
  payload: Search.SavedSearch[],
): Actions.PayloadAction<Search.SavedSearch[]> => ({
  type: ActionTypes.GetSavedSearches.Succeeded,
  payload,
})

export const deleteSavedSearch = (
  payload: Search.SavedSearch,
): Actions.PromiseAction<Search.SavedSearch> =>
  createPromiseAction(ActionTypes.DeleteSavedSearch.Trigger)(payload)
export const deleteSavedSearchSucceeded = (
  payload: Search.SavedSearch,
): Actions.PayloadAction<Search.SavedSearch> => ({
  type: ActionTypes.DeleteSavedSearch.Succeeded,
  payload,
})

export const setAutocompleteSearchText = (payload: string) => ({
  type: ActionTypes.SetAutocompleteSearchText,
  payload,
})

export const setSearchText = (payload: string) => ({
  type: ActionTypes.SetSearchText,
  payload,
})

export const setRecommendedSearch = (payload: string) => ({
  type: ActionTypes.SetRecommendedSearch,
  payload,
})

export const setSavedSearch = (payload: any) => ({
  type: ActionTypes.SetSavedSearch,
  payload,
})

export const setCurrentSearchParams = (payload: any) => ({
  type: ActionTypes.SetCurrentSearchParams,
  payload,
})

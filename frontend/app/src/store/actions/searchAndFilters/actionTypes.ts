export enum SearchUniversities {
  Trigger = `SEARCH_UNIVERSITIES`,
  Succeeded = `SEARCH_UNIVERSITIES_SUCCEEDED`,
  Failed = `SEARCH_UNIVERSITIES_FAILED`,

  PromiseTrigger = `SEARCH_UNIVERSITIES.TRIGGER`,
}

export enum SearchStudents {
  Trigger = `SEARCH_STUDENTS`,
  Succeeded = `SEARCH_STUDENTS_SUCCEEDED`,
  Failed = `SEARCH_STUDENTS_FAILED`,

  PromiseTrigger = `SEARCH_STUDENTS.TRIGGER`,
}

export enum SearchStudentsByName {
  Trigger = `SEARCH_STUDENTS_BY_NAME`,
  Succeeded = `SEARCH_STUDENTS_BY_NAME_SUCCEEDED`,
  Failed = `SEARCH_STUDENTS_BY_NAME_FAILED`,

  PromiseTrigger = `SEARCH_STUDENTS_BY_NAME.TRIGGER`,
}

export enum SearchUniversitiesByName {
  Trigger = `SEARCH_UNIVERSITIES_BY_NAME`,
  Succeeded = `SEARCH_UNIVERSITIES_BY_NAME_SUCCEEDED`,
  Failed = `SEARCH_UNIVERSITIES_BY_NAME_FAILED`,

  PromiseTrigger = `SEARCH_UNIVERSITIES_BY_NAME.TRIGGER`,
}

export enum GetEquediLists {
  Trigger = `GET_EQUEDI_LISTS`,
  Succeeded = `GET_EQUEDI_LISTS_SUCCEEDED`,
  Failed = `GET_EQUEDI_LISTS_FAILED`,
}

export enum GetSavedSearches {
  Trigger = `GET_SAVED_SEARCHES`,
  Succeeded = `GET_SAVED_SEARCHES_SUCCEEDED`,
  Failed = `GET_SAVED_SEARCHES_FAILED`,
}

export enum DeleteSavedSearch {
  Trigger = `DELETE_SAVED_SEARCH`,
  Succeeded = `DELETE_SAVED_SEARCH_SUCCEEDED`,
  Failed = `DELETE_SAVED_SEARCH_FAILED`,

  PromiseTrigger = `DELETE_SAVED_SEARCH.TRIGGER`,
}

export const SetSearchText = `SET_SEARCH_TEXT`
export const SetAutocompleteSearchText = `SET_AUTOCOMPLETE_SEARCH_TEXT`
export const SetRecommendedSearch = `SET_RECOMMENDED_SEARCH`
export const SetSavedSearch = `SET_SAVED_SEARCH`
export const ToggleAllFiltersModal = `TOGGLE_ALL_FILTERS_MODAL`
export const SetCurrentSearchParams = `SET_CURRENT_SEARCH_PARAMS`

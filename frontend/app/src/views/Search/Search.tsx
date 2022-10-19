//Utils
import _ from "lodash"
//Components
import { MDBAlert } from "mdbreact"
import React, { useEffect } from "react"
//Hooks
import { useState } from "react"
import { Trans,useTranslation  } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

//Images
import { ReactComponent as Pencil } from "../../assets/edit.svg"
import Pagination from "../../components/Pagination"
import ProfileListItem from "../../components/ProfileListItem"
import useLoader from "../../hooks/useLoader"
import { actions } from "../../store"
//Types
import {
  CompletionStatus,
  CompletionStep,
  Filters,
  ReduxState,
  Role,
  Search,
} from "../../store/types"
import { FilterType } from "./Filters/filterTypes"
import StudentsFilters from "./Filters/StudentsFilters"
import UniversitiesFilters from "./Filters/UniversitiesFilter"
import Styles from "./index.module.scss"

const SearchResults: React.VFC = () => {
  const isSurveyCompleted = useSelector<ReduxState, boolean>(
    (state) =>
      state.profile.profile?.completion[
        CompletionStep.CollegePreferenceSurvey
      ] === CompletionStatus.Completed,
  )
  const { searchParams } = useSelector((state: ReduxState) => state.shared)
  const { user } = useSelector((state: any) => state.auth)
  const { loadingSearchResults, searchText, currentSearchParams } = useSelector(
    (state: ReduxState) => state.searchAndFilters,
  )
  const searchResults = useSelector<ReduxState, Search.Result[]>(
    (state) => state.searchAndFilters.searchResults,
  )
  const debugResponse = useSelector<ReduxState, any>(
    (state) => state.searchAndFilters.debugResponse,
  )
  const resultsCount = useSelector<ReduxState, number | null>(
    (state) => state.searchAndFilters.searchResultsCount,
  )
  const dispatch = useDispatch()

  const initialsFilters =
    user?.role === Role.University
      ? {
          name: ``,
          matchLevel: [],
          location: [],
          sortBy: `score`,
          satComposite: null,
          satMath: null,
          satReading: null,
          apTestsTaken: null,
          subjectTestsTaken: null,
          collegeCoursesTaken: null,
          gpaOverall: null,
          gpaMath: null,
          gpaEnglish: null,
          gpaScience: null,
          gpaSocialStudies: null,
          gpaElectives: null,
          activities: [],
          extracurricularActivityType: [],
          followingUni: null,
          dreamUni: null,
          collegeFreshman: false,
          seniors: false,
        }
      : {
          name: ``,
          matchLevel: [],
          location: [],
          sortBy: `score`,
          locale: [],
          region: [],
          schoolSize: [],
          admissionGender: null,
          schoolType: [],
          degree: [],
          athleticDivision: [],
        }
  const [filters, setFilters] = useState<Filters.All>(initialsFilters)
  const [page, setPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(25)

  const { t } = useTranslation()

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (!searchParams && user && user.role === Role.University) {
      dispatch(actions.getStudentSearchParams())
      dispatch(actions.getActivityTypes())
    }
  }, [dispatch, searchParams, user])

  useEffect(() => {
    if (!searchParams && user && user.role === Role.Student) {
      dispatch(actions.getUniversitySearchParams())
    }
  }, [dispatch, searchParams, user])

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (currentSearchParams) {
      dispatch(
        (user?.role === Role.Student
          ? actions.searchUniversities
          : actions.searchStudents)({
          ...currentSearchParams,
          skip: (page - 1) * resultsPerPage,
          limit: resultsPerPage,
        }),
      )
    } else {
      dispatch(
        (user?.role === Role.Student
          ? actions.searchUniversities
          : actions.searchStudents)({
          ...filters,
          skip: (page - 1) * resultsPerPage,
          limit: resultsPerPage,
        }),
      )
    }
  }, [dispatch, searchParams, user, filters, page, resultsPerPage])

  const pageCount = Math.ceil((resultsCount ?? 0) / resultsPerPage)

  useEffect(() => {
    setPage(1)
  }, [pageCount, resultsPerPage])

  useEffect(() => {
    if (!searchParams || !searchResults) {
      return
    }

    onLoadComplete()
  }, [onLoadComplete, searchParams, searchResults])

  return (
    <div className={Styles.container}>
      {!isSurveyCompleted && user && user.role === Role.Student && (
        <MDBAlert className={`d-flex`} color={`warning`}>
          <div className={`position-relative mr-3`} style={{ top: -2 }}>
            <Pencil />
          </div>

          <div className={`flex-grow-1 d-flex align-items-center`}>
            <p className={`mb-0`}>
              <Trans
                i18nKey={`common:pleaseCompleteCollegeInterestsSurvey`}
                components={[<Link to={`/surveys`} />]}
              />
            </p>
          </div>
        </MDBAlert>
      )}
      {process.env.REACT_APP_API_URL ===
        `https://equity-backend-dev.us-east-1.elasticbeanstalk.com` &&
        debugResponse &&
        console.log(
          debugResponse && debugResponse.requester,
          debugResponse &&
            debugResponse.matchesInfo &&
            debugResponse.matchesInfo.length > 0
            ? debugResponse.matchesInfo.join()
            : null,
        )}

      {user?.role !== Role.University && (
        <StudentsFilters
          filters={(currentSearchParams as Filters.University) || filters}
          onChange={(filters) => {
            dispatch(actions.setCurrentSearchParams(filters))
            setFilters(filters)
          }}
          type={FilterType.SEARCH}
        />
      )}

      {user?.role === Role.University && (
        <UniversitiesFilters
          filters={(currentSearchParams as Filters.Student) || filters}
          onChange={(filters) => {
            dispatch(actions.setCurrentSearchParams(filters))
            setFilters(filters)
          }}
          type={FilterType.SEARCH}
        />
      )}

      <div>
        {!loadingSearchResults &&
          searchResults.map((result, i) => (
            <ProfileListItem key={`searchResult-${i}`} searchResult={result} />
          ))}

        {!loadingSearchResults && searchText && !searchResults.length && (
          <span>{t(`common:noResults`)}</span>
        )}

        {loadingSearchResults &&
          _.times(resultsPerPage, (i) => (
            <ProfileListItem key={`searchResultPlaceholder-${i}`} loading />
          ))}
      </div>

      {pageCount > 1 && (
        <Pagination
          className={`align-self-center`}
          currentPage={page}
          pagesCount={pageCount}
          resultsPerPage={resultsPerPage}
          onPageChange={(page) => setPage(page)}
          onResultsCountChange={(resultsPerPage) =>
            setResultsPerPage(resultsPerPage)
          }
        />
      )}
    </div>
  )
}

export default SearchResults

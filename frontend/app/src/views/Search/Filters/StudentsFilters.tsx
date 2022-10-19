import { useFormik } from "formik"
import _ from "lodash"
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle } from "mdbreact"
import React, { useEffect, useMemo, useState } from "react"
//Hooks
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { ReactComponent as SortIcon } from "../../../assets/sort-icon.svg"
import Button from "../../../components/Button/Button"
import { actions } from "../../../store"
import { ReduxState } from "../../../store/types"
//Types
import { Filters } from "../../../store/types"
import AllFiltersStudentModal from "./AllFiltersStudentModal"
import { FilterType , MatchLevel } from "./filterTypes"
//Styles
import Styles from "./index.module.scss"

interface StudentsFiltersProps {
  type: FilterType
  filters: Filters.University
  onChange: (filters: Filters.University) => void
}

const StudentsFilters: React.VFC<StudentsFiltersProps> = ({
  type,
  filters,
  onChange,
}) => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => state.auth.isTokenLoaded,
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const resultsCount = useSelector<ReduxState, number | null>(
    (state) => state.searchAndFilters.searchResultsCount,
  )
  const {
    isAllFiltersModalOpen,
    recommendedSearch,
    searchText,
    currentSearchParams,
  } = useSelector((state: any) => state.searchAndFilters)
  const { searchParams } = useSelector((state: ReduxState) => state.shared)
  const followedUniversitiesCount = useSelector<ReduxState, number>(
    (state) => state.follow.followedUniversities?.length ?? 0,
  )
  const [lastSubmittedValues, setLastSubmittedValues] = useState<any>({
    matchLevel: [],
    location: [],
    locale: [],
    region: [],
    schoolSize: [],
    admissionGender: null,
    schoolType: [],
    degree: [],
    athleticDivision: [],
  })

  const [sortBy, setSortBy] = useState(currentSearchParams?.sortBy || `score`)

  const initialValues = useMemo<any>(
    () => ({
      matchLevel:
        recommendedSearch === `excellentMatches`
          ? [MatchLevel.GOOD_EXCELLENT]
          : [],
      location: recommendedSearch === `localCollegesAndUniversities` ? [1] : [],
      locale: [],
      region: [],
      schoolSize: [],
      admissionGender: null,
      schoolType: [],
      degree: [],
      athleticDivision: [],
    }),
    [isAllFiltersModalOpen, recommendedSearch],
  )

  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik<any>({
    initialValues,
    onSubmit: async ({ ...filters }, { setErrors }) => {
      if (recommendedSearch) {
        setLastSubmittedValues(values)
      }
      try {
        await onChange({
          ...filters,
          name: searchText,
          sortBy,
        })
      } catch (err) {
        setErrors(err.errors)
      }
    },
    enableReinitialize: true,
  })

  const filtersLength =
    values.matchLevel.length +
    values.location.length +
    values.locale.length +
    values.region.length +
    values.schoolSize.length +
    Number(!!values.admissionGender) +
    values.schoolType.length +
    values.degree.length +
    values.athleticDivision.length

  useEffect(() => {
    if (!isTokenLoaded) {
      return
    }
    handleSubmit()
  }, [isTokenLoaded, sortBy])

  // useEffect(() => {
  //     resetForm();
  //     if (
  //         recommendedSearch &&
  //         recommendedSearch === 'excellentMatches' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('matchLevel', [MatchLevel.GOOD_EXCELLENT]);
  //     } else if (
  //         recommendedSearch &&
  //         recommendedSearch === 'localCollegesAndUniversities' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('location', [1]);
  //     } else return;
  // }, [recommendedSearch]);

  useEffect(() => {
    if (recommendedSearch) {
      handleSubmit()
    }
  }, [recommendedSearch])

  useEffect(() => {
    if (filtersLength > 0 || searchText) {
      handleSubmit()
    }
  }, [searchText])

  useEffect(() => {
    const newFiltersLength = filters
      ? filters.matchLevel.length +
        filters.location.length +
        filters.locale.length +
        filters.region.length +
        filters.schoolSize.length +
        Number(!!filters.admissionGender) +
        filters.schoolType.length +
        filters.degree.length +
        filters.athleticDivision.length
      : 0

    if (newFiltersLength > 0) {
      setValues(filters)
      setLastSubmittedValues(filters)
    }
  }, [filters])

  const handleClear = useCallback(() => {
    resetForm()
    handleSubmit()
    dispatch(actions.toggleAllFiltersModal(false))
    dispatch(
      actions.setCurrentSearchParams({
        matchLevel: [],
        location: [],
        locale: [],
        region: [],
        schoolSize: [],
        admissionGender: null,
        schoolType: [],
        degree: [],
        athleticDivision: [],
      }),
    )
    dispatch(actions.setAutocompleteSearchText(``))
    dispatch(actions.setSearchText(``))
    dispatch(actions.setRecommendedSearch(``))
  }, [resetForm, handleSubmit, dispatch])

  return (
    <div>
      <div className={Styles.filtersWrapper}>
        <div className={Styles.filtersContainer}>
          <div className={Styles.filters}>
            {/*  POST PILOT
                    <MDBDropdown className="filter-dropdown">
                        <MDBDropdownToggle nav onClick={(e: any) => e.stopPropagation()}>
                        <div className={Styles.filterItem}>Match level</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                            <CheckboxFilter
                                setFieldValue={() => values.matchLevel.find((it: any) => it === MatchLevel.GOOD_EXCELLENT)
                                    ? setFieldValue('matchLevel', values.matchLevel.filter((it: any) => it !== MatchLevel.GOOD_EXCELLENT))
                                    : setFieldValue('matchLevel', [...values.matchLevel, MatchLevel.GOOD_EXCELLENT])
                                }
                                value={values.matchLevel.find((it: any) => it === MatchLevel.GOOD_EXCELLENT)}
                                label="Good & Excellent Matches"
                            />
                            <CheckboxFilter
                                setFieldValue={() => values.matchLevel.find((it: any) => it === MatchLevel.AVERAGE_POOR)
                                    ? setFieldValue('matchLevel', values.matchLevel.filter((it: any) => it !== MatchLevel.AVERAGE_POOR))
                                    : setFieldValue('matchLevel', [...values.matchLevel, MatchLevel.AVERAGE_POOR])}
                                value={values.matchLevel.find((it: any) => it === MatchLevel.AVERAGE_POOR)}
                                label="Average & Below Matches"
                            />
                            <div className="filter-dropdown-buttons">
                                <Button onClick={() => {
                                    setFieldValue('matchLevel', [])
                                    handleSubmit()
                                }} size="sm" className={`clear-button`}>
                                    {t("searchScreen.clear")}
                                </Button>
                                <Button onClick={() => handleSubmit()} size="sm">
                                     {t("searchScreen.apply")}
                                </Button>
                            </div>
                        </MDBDropdownMenu>
                    </MDBDropdown> */}
            {filtersLength > 0 ? (
              <div
                onClick={() => dispatch(actions.toggleAllFiltersModal(true))}
                className={Styles.filterAppliedItem}
              >
                {filtersLength}
                {t(`searchScreen.filtersApplied`)}
              </div>
            ) : (
              <div
                onClick={() => dispatch(actions.toggleAllFiltersModal(true))}
                className={Styles.filterItem}
              >
                {t(`searchScreen.allFilters`)}
              </div>
            )}
          </div>
          <Button onClick={handleClear} size="xs" variant={`clear`} light>
            {filtersLength > 0
              ? t(`searchScreen.clearAll`)
              : t(`searchScreen.clear`)}
          </Button>
        </div>
        <div className={Styles.sortContainer}>
          <MDBDropdown className="filter-dropdown sort-filter-dropdown">
            <MDBDropdownToggle nav onClick={(e: any) => e.stopPropagation()}>
              <div className={Styles.sortByButton}>
                <SortIcon /> {t(`searchScreen.sortBy`)}
              </div>
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
              <div
                className={
                  sortBy === `score`
                    ? Styles.sortByActiveItem
                    : Styles.sortByItem
                }
                onClick={() => {
                  setSortBy(`score`)
                  onChange({
                    ...filters,
                    sortBy,
                  })
                }}
              >
                {t(`searchScreen.matchHighestToLowest`)}
              </div>
              <div
                className={
                  sortBy === `name`
                    ? Styles.sortByActiveItem
                    : Styles.sortByItem
                }
                onClick={() => {
                  setSortBy(`name`)
                  onChange({
                    ...filters,
                    sortBy,
                  })
                }}
              >
                {t(`searchScreen.alphabetical`)}
              </div>
            </MDBDropdownMenu>
          </MDBDropdown>
          <div className={Styles.filtersResult}>
            {type === FilterType.SEARCH
              ? resultsCount
              : followedUniversitiesCount}{` `}
            {t(`searchScreen.results`)}
          </div>
        </div>
      </div>

      <AllFiltersStudentModal
        isOpen={isAllFiltersModalOpen}
        toggle={() => {
          dispatch(actions.toggleAllFiltersModal(false))
          setValues(lastSubmittedValues)
        }}
        searchParams={searchParams}
        values={values}
        resetForm={resetForm}
        setFieldValue={setFieldValue}
        handleSubmit={() => {
          handleSubmit()
          dispatch(actions.toggleAllFiltersModal(false))
        }}
        setLastSubmittedValues={setLastSubmittedValues}
      />
    </div>
  )
}

export default StudentsFilters

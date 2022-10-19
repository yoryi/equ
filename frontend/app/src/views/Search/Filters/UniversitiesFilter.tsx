import { useFormik } from "formik"
import _ from "lodash"
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle } from "mdbreact"
import React, { useEffect, useMemo, useState } from "react"
//Hooks
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import { ReactComponent as SortIcon } from "../../../assets/sort-icon.svg"
import Button from "../../../components/Button/Button"
import { actions } from "../../../store"
import { ReduxState } from "../../../store/types"
//Types
import { Filters } from "../../../store/types"
import AllFiltersUniversityModal from "./AllFiltersUniversityModal"
import { FilterType , MatchLevel } from "./filterTypes"
//Styles
import Styles from "./index.module.scss"
import { SaveSearchModal } from "./SaveSearchModal"

interface UniversitiesFiltersProps {
  type: FilterType
  filters: Filters.Student
  onChange: (filters: Filters.Student) => void
}

const UniversitiesFilters: React.VFC<UniversitiesFiltersProps> = ({
  type,
  filters,
  onChange,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )
  const {
    isAllFiltersModalOpen,
    recommendedSearch,
    savedSearch,
    searchText,
    currentSearchParams,
  } = useSelector((state: any) => state.searchAndFilters)
  const [isSaveSearchModalVisible, toggleSaveSearchModalVisibility] = useState(
    false,
  )
  const resultsCount = useSelector<ReduxState, number | null>(
    (state) => state.searchAndFilters.searchResultsCount,
  )
  const { searchParams } = useSelector((state: ReduxState) => state.shared)
  const { activityTypes } = useSelector((state: any) => state.profile)
  const followedStudentsCount = useSelector<ReduxState, number>(
    (state) => state.follow.followedStudents?.length ?? 0,
  )
  const [sortBy, setSortBy] = useState(currentSearchParams?.sortBy || `score`)
  const [lastSubmittedValues, setLastSubmittedValues] = useState<any>({
    matchLevel: [],
    location: [],
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
  })

  const initialValues = useMemo<any>(
    () => ({
      matchLevel:
        recommendedSearch === `goodAndExcellentMatches`
          ? [MatchLevel.GOOD_EXCELLENT]
          : [],
      location: [],
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
      followingUni:
        recommendedSearch === `addedToFollowedSchoolsList` ? true : null,
      dreamUni: recommendedSearch === `addedToDreamSchoolList` ? true : null,
      collegeFreshman:
        recommendedSearch === `incomingCollegeFreshmen` ? true : false,
      seniors: false,
    }),
    [isAllFiltersModalOpen, recommendedSearch],
  )

  const validationSchema = yup.object({
    satComposite: yup
      .number()
      .nullable()
      .optional()
      .min(400, `Min value is 400`)
      .max(1600, `Max value is 1600`),
    satMath: yup
      .number()
      .nullable()
      .optional()
      .min(200, `Min value is 200`)
      .max(800, `Max value is 800`),
    satReading: yup
      .number()
      .nullable()
      .optional()
      .min(200, `Min value is 200`)
      .max(800, `Max value is 800`),
    gpaEnglish: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(4, t(`errors:maxValueIs`, { count: 4 })),
    gpaMath: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(4, t(`errors:maxValueIs`, { count: 4 })),
    gpaSocialStudies: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(4, t(`errors:maxValueIs`, { count: 4 })),
    gpaScience: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(4, t(`errors:maxValueIs`, { count: 4 })),
    gpaElectives: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(4, t(`errors:maxValueIs`, { count: 4 })),
  })

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    resetForm,
    touched,
    errors,
    submitCount,
  } = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: async ({ ...filters }, { setErrors }) => {
      if (recommendedSearch || savedSearch) {
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
    Number(!!values.satComposite) +
    Number(!!values.satMath) +
    Number(!!values.satReading) +
    Number(!!values.apTestsTaken) +
    Number(!!values.subjectTestsTaken) +
    Number(!!values.collegeCoursesTaken) +
    Number(!!values.gpaOverall) +
    Number(!!values.gpaMath) +
    Number(!!values.gpaEnglish) +
    Number(!!values.gpaScience) +
    Number(!!values.gpaSocialStudies) +
    Number(!!values.gpaElectives) +
    values.activities.length +
    values.extracurricularActivityType.length +
    _.isBoolean(values.followingUni) +
    _.isBoolean(values.dreamUni) +
    Number(!!values.collegeFreshman) +
    Number(!!values.seniors)

  useEffect(() => {
    if (!isTokenLoaded) {
      return
    }
    submitCount && handleSubmit()
  }, [isTokenLoaded, sortBy])

  // useEffect(() => {
  //     resetForm();
  //     if (
  //         recommendedSearch &&
  //         recommendedSearch === 'goodAndExcellentMatches' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('matchLevel', [MatchLevel.GOOD_EXCELLENT]);
  //     }
  //     // POST PILOT
  //     // else if (recommendedSearch && recommendedSearch === 'hometownHeroes' && history.location.pathname === "/search") {
  //     //     setFieldValue('location', [1])
  //     // }
  //     else if (
  //         recommendedSearch &&
  //         recommendedSearch === 'addedToDreamSchoolList' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('dreamUni', true);
  //     } else if (
  //         recommendedSearch &&
  //         recommendedSearch === 'incomingCollegeFreshmen' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('collegeFreshman', true);
  //     } else if (
  //         recommendedSearch &&
  //         recommendedSearch === 'addedToFollowedSchoolsList' &&
  //         history.location.pathname === '/search'
  //     ) {
  //         setFieldValue('followingUni', true);
  //     } else return;
  // }, [recommendedSearch]);

  useEffect(() => {
    if (recommendedSearch || savedSearch) {
      handleSubmit()
    }
  }, [recommendedSearch, savedSearch])

  useEffect(() => {
    if (!isTokenLoaded) {
      return
    }
    if (filtersLength > 0 || searchText) {
      handleSubmit()
    }
  }, [isTokenLoaded, searchText])

  useEffect(() => {
    const newFiltersLength = filters
      ? filters.matchLevel?.length +
        filters.location?.length +
        Number(!!filters.satComposite) +
        Number(!!filters.satMath) +
        Number(!!filters.satReading) +
        Number(!!filters.apTestsTaken) +
        Number(!!filters.subjectTestsTaken) +
        Number(!!filters.collegeCoursesTaken) +
        Number(!!filters.gpaOverall) +
        Number(!!filters.gpaMath) +
        Number(!!filters.gpaEnglish) +
        Number(!!filters.gpaScience) +
        Number(!!filters.gpaSocialStudies) +
        Number(!!filters.gpaElectives) +
        filters.activities?.length +
        filters.extracurricularActivityType?.length +
        Number(_.isBoolean(filters.followingUni)) +
        Number(_.isBoolean(filters.dreamUni)) +
        Number(!!filters.collegeFreshman) +
        Number(!!filters.seniors)
      : 0

    if (newFiltersLength > 0) {
      setValues(filters)
      const newFilters = filters

      setLastSubmittedValues(newFilters)
    }
  }, [filters])

  useEffect(() => {
    if (
      _.isObject(savedSearch) &&
      !_.isEmpty(savedSearch) &&
      !recommendedSearch
    ) {
      resetForm()
      Object.keys(savedSearch).map((item, index) => {
        if (item === `matchLevel`) {
          setFieldValue(
            `${item}`,
            _.isArray(Object.values(savedSearch)[index])
              ? Object.values(savedSearch)[index]
              : [Object.values(savedSearch)[index]],
          )
        } else {
          setFieldValue(`${item}`, Object.values(savedSearch)[index])
        }
      })
    }
  }, [savedSearch])

  const handleClear = useCallback(() => {
    resetForm()
    handleSubmit()
    dispatch(actions.toggleAllFiltersModal(false))
    dispatch(actions.setAutocompleteSearchText(``))
    dispatch(
      actions.setCurrentSearchParams({
        matchLevel: [],
        location: [],
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
      }),
    )
    dispatch(actions.setSearchText(``))
    dispatch(actions.setRecommendedSearch(``))
  }, [resetForm, handleSubmit, dispatch])

  return (
    <div>
      <div className={Styles.filtersWrapper}>
        <div className={Styles.filtersContainer}>
          <div className={Styles.filters}>
            {/* POST PILOT
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
                                <Button onClick={() => resetForm()} size="sm" className={`clear-button`}>
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
                    sortBy: `score`,
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
                    sortBy: `name`,
                  })
                }}
              >
                {t(`searchScreen.alphabetical`)}
              </div>
            </MDBDropdownMenu>
          </MDBDropdown>
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            {type === FilterType.SEARCH && !searchText.length && (
              <button
                className={Styles.saveSearchButton}
                onClick={() => toggleSaveSearchModalVisibility(true)}
              >
                {t(`searchScreen.saveSearch`)}
              </button>
            )}

            <div className={Styles.filtersResult}>
              {type === FilterType.SEARCH
                ? resultsCount
                : followedStudentsCount}{` `}
              {t(`searchScreen.results`)}
            </div>
          </div>
        </div>
      </div>

      <AllFiltersUniversityModal
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
        extracurricularActivityTypes={activityTypes}
        fieldsTouched={touched}
        fieldsErrors={errors}
        setLastSubmittedValues={setLastSubmittedValues}
      />
      <SaveSearchModal
        isOpen={isSaveSearchModalVisible}
        toogle={() => toggleSaveSearchModalVisibility(false)}
        query={values}
        numberOfResults={resultsCount}
      />
    </div>
  )
}

export default UniversitiesFilters

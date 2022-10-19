import _ from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import Select from "react-select"

import Button from "../../../components/Button/Button"
import CheckboxFilter from "../../../components/Filters/CheckboxFilter"
import Modal from "../../../components/Modal/Modal"
import TextField from "../../../components/TextField/TextField"
import { actions } from "../../../store"
import {
  MatchLevel,
  mockedActivities,
  mockedGpaOverall,
  mockedLocationBased,
  mockedTestsTaken,
} from "./filterTypes"
import Styles from "./index.module.scss"

export interface AllFiltersUniversityModalProps {
  isOpen: boolean
  toggle: () => void
  searchParams: any
  resetForm: any
  setFieldValue: any
  values: any
  handleSubmit: any
  extracurricularActivityTypes: any
  fieldsTouched: any
  fieldsErrors: any
  setLastSubmittedValues: any
}
const AllFiltersUniversityModal: React.FC<AllFiltersUniversityModalProps> = ({
  isOpen,
  toggle,
  resetForm,
  setFieldValue,
  values,
  handleSubmit,
  extracurricularActivityTypes,
  fieldsErrors,
  setLastSubmittedValues,
}) => {
  const mappedExtracurricularActivityTypes =
    extracurricularActivityTypes && extracurricularActivityTypes.length > 0
      ? extracurricularActivityTypes.map((item: any) => {
          return { value: item.id, label: item.name }
        })
      : []
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-all-filters"
      bodyClassName="modal-all-filters-body"
      body={
        <div className={Styles.allFilters}>
          <div className={Styles.stickyHeader}>
            <div onClick={() => toggle()} className={Styles.closeButton}>
              {t(`common:close`)}
            </div>
            <div className={Styles.header}>
              <div className={Styles.headerText}>
                {t(`searchScreen.seeYourFiltersBelow`)}
              </div>
              <div className={Styles.headerButtons}>
                <Button
                  onClick={() => {
                    resetForm()
                    dispatch(actions.setRecommendedSearch(``))
                  }}
                  size="sm"
                  className={Styles.clearButton}
                  variant={`clear`}
                >
                  {t(`searchScreen.clear`)}
                </Button>
                <Button
                  onClick={() => {
                    dispatch(actions.setSearchText(``))
                    dispatch(actions.setAutocompleteSearchText(``))
                    handleSubmit()
                    setLastSubmittedValues(values)
                  }}
                  size="sm"
                  disabled={
                    fieldsErrors && Object.keys(fieldsErrors).length !== 0
                  }
                >
                  {t(`searchScreen.apply`)}
                </Button>
              </div>
            </div>
          </div>
          <div className="all-filters-body">
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.matchLevel`)}
              </div>
              <CheckboxFilter
                setFieldValue={() =>
                  values.matchLevel.find(
                    (it: any) => it === MatchLevel.GOOD_EXCELLENT,
                  )
                    ? setFieldValue(
                        `matchLevel`,
                        values.matchLevel.filter(
                          (it: any) => it !== MatchLevel.GOOD_EXCELLENT,
                        ),
                      )
                    : setFieldValue(`matchLevel`, [
                        ...values.matchLevel,
                        MatchLevel.GOOD_EXCELLENT,
                      ])
                }
                value={
                  values.matchLevel.length > 0
                    ? values.matchLevel.find(
                        (it: any) => it === MatchLevel.GOOD_EXCELLENT,
                      )
                      ? true
                      : false
                    : false
                }
                label={t(`common:goodAndExcellentMatches`)}
              />
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.locationBased`)}
              </div>
              {mockedLocationBased.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.location.find((it: number) => it === item.id)
                        ? setFieldValue(
                            `location`,
                            values.location.filter(
                              (it: number) => it !== item.id,
                            ),
                          )
                        : setFieldValue(`location`, [
                            ...values.location,
                            item.id,
                          ])
                    }
                    value={
                      values.location.length > 0
                        ? values.location.find((it: number) => it === item.id)
                          ? true
                          : false
                        : false
                    }
                    label={item.name}
                  />
                )
              })}
            </div>

            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.averageSatAbove`)}
              </div>
              <TextField
                placeholder={t(`searchScreen.composite`)}
                value={!!values.satComposite ? values.satComposite : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `satComposite`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.satComposite as string)}
              />
              <TextField
                placeholder={t(`searchScreen.math`)}
                value={!!values.satMath ? values.satMath : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `satMath`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.satMath as string)}
              />
              <TextField
                placeholder={t(`searchScreen.ebrw`)}
                value={!!values.satReading ? values.satReading : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `satReading`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.satReading as string)}
              />
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.apTestsTaken`)}
              </div>
              {mockedTestsTaken.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.apTestsTaken === item.id
                        ? setFieldValue(`apTestsTaken`, null)
                        : setFieldValue(`apTestsTaken`, item.id)
                    }
                    value={
                      values.apTestsTaken
                        ? values.apTestsTaken === item.id
                        : false
                    }
                    label={item.name}
                    type="radio"
                  />
                )
              })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.subjectTestsTaken`)}
              </div>
              {mockedTestsTaken.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.subjectTestsTaken === item.id
                        ? setFieldValue(`subjectTestsTaken`, null)
                        : setFieldValue(`subjectTestsTaken`, item.id)
                    }
                    value={
                      values.subjectTestsTaken
                        ? values.subjectTestsTaken === item.id
                        : false
                    }
                    label={item.name}
                    type="radio"
                  />
                )
              })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.collegeCoursesTaken`)}
              </div>
              {mockedTestsTaken.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.collegeCoursesTaken === item.id
                        ? setFieldValue(`collegeCoursesTaken`, null)
                        : setFieldValue(`collegeCoursesTaken`, item.id)
                    }
                    value={
                      values.collegeCoursesTaken
                        ? values.collegeCoursesTaken === item.id
                        : false
                    }
                    label={item.name}
                    type="radio"
                  />
                )
              })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.gpaOverall`)}
              </div>
              {mockedGpaOverall.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.gpaOverall === item.id
                        ? setFieldValue(`gpaOverall`, null)
                        : setFieldValue(`gpaOverall`, item.id)
                    }
                    value={
                      values.gpaOverall ? values.gpaOverall === item.id : false
                    }
                    label={item.name}
                    type="radio"
                  />
                )
              })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.gpaContentGpa`)}
              </div>
              <TextField
                placeholder={t(`searchScreen.math`)}
                value={!!values.gpaMath ? values.gpaMath : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `gpaMath`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.gpaMath as string)}
              />
              <TextField
                placeholder={t(`searchScreen.english`)}
                value={!!values.gpaEnglish ? values.gpaEnglish : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `gpaEnglish`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.gpaEnglish as string)}
              />
              <TextField
                placeholder={t(`searchScreen.science`)}
                value={!!values.gpaScience ? values.gpaScience : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `gpaScience`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.gpaScience as string)}
              />
              <TextField
                placeholder={t(`searchScreen.social`)}
                value={!!values.gpaSocialStudies ? values.gpaSocialStudies : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `gpaSocialStudies`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={
                  fieldsErrors && (fieldsErrors.gpaSocialStudies as string)
                }
              />
              <TextField
                placeholder={t(`searchScreen.electives`)}
                value={!!values.gpaElectives ? values.gpaElectives : ``}
                onChange={(e: any) =>
                  setFieldValue(
                    `gpaElectives`,
                    e.target.value === `` ? null : Number(e.target.value),
                  )
                }
                type="number"
                error={fieldsErrors && (fieldsErrors.gpaElectives as string)}
              />
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.activities`)}
              </div>
              {mockedActivities.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.activities.find((it: number) => it === item.id)
                        ? setFieldValue(
                            `activities`,
                            values.activities.filter(
                              (it: number) => it !== item.id,
                            ),
                          )
                        : setFieldValue(`activities`, [
                            ...values.activities,
                            item.id,
                          ])
                    }
                    value={
                      values.activities.length > 0
                        ? values.activities.find((it: number) => it === item.id)
                          ? true
                          : false
                        : false
                    }
                    label={item.name}
                  />
                )
              })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.followingYou`)}
              </div>
              <CheckboxFilter
                setFieldValue={() =>
                  _.isBoolean(values.followingUni) && values.followingUni
                    ? setFieldValue(`followingUni`, null)
                    : setFieldValue(`followingUni`, true)
                }
                value={_.isBoolean(values.followingUni) && values.followingUni}
                label={t(`common:yes`)}
                type="radio"
              />
              <CheckboxFilter
                setFieldValue={() =>
                  _.isBoolean(values.followingUni) && !values.followingUni
                    ? setFieldValue(`followingUni`, null)
                    : setFieldValue(`followingUni`, false)
                }
                value={_.isBoolean(values.followingUni) && !values.followingUni}
                label={t(`common:no`)}
                type="radio"
              />
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.studentsThatHaveYouAsADreamSchool`)}
              </div>
              <CheckboxFilter
                setFieldValue={() =>
                  _.isBoolean(values.dreamUni) && values.dreamUni
                    ? setFieldValue(`dreamUni`, null)
                    : setFieldValue(`dreamUni`, true)
                }
                value={_.isBoolean(values.dreamUni) && values.dreamUni}
                label={t(`common:yes`)}
                type="radio"
              />
              <CheckboxFilter
                setFieldValue={() =>
                  _.isBoolean(values.dreamUni) && !values.dreamUni
                    ? setFieldValue(`dreamUni`, null)
                    : setFieldValue(`dreamUni`, false)
                }
                value={_.isBoolean(values.dreamUni) && !values.dreamUni}
                label={t(`common:no`)}
                type="radio"
              />
            </div>
            <div className="all-filters-body-item all-filters-body-item-two-columns">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.activityType`)}
              </div>
              <Select
                options={mappedExtracurricularActivityTypes}
                isMulti={true}
                defaultValue={
                  values.extracurricularActivityType &&
                  values.extracurricularActivityType.length > 0
                    ? values.extracurricularActivityType.map((item: any) => {
                        return {
                          value:
                            mappedExtracurricularActivityTypes[item - 1].value,
                          label:
                            mappedExtracurricularActivityTypes[item - 1].label,
                        }
                      })
                    : []
                }
                value={
                  values.extracurricularActivityType &&
                  values.extracurricularActivityType.length > 0
                    ? values.extracurricularActivityType.map((item: any) => {
                        return {
                          value:
                            mappedExtracurricularActivityTypes[item - 1].value,
                          label:
                            mappedExtracurricularActivityTypes[item - 1].label,
                        }
                      })
                    : []
                }
                styles={{
                  control: (props: any, state) => {
                    return {
                      ...props,
                      borderRadius: `6px`,
                      border: state.isFocused
                        ? `1px solid #005dcc`
                        : `1px solid #eaebeb`,
                      minHeight: `46px`,
                      boxShadow: state.isFocused ? 0 : 0,
                      padding: `0px 4px`,
                      "&:hover": {},
                    }
                  },
                  placeholder: (props) => ({
                    ...props,
                    fontSize: `16px`,
                    fontFamily: `Ilisarniq, sans-serif`,
                    color: `#707378`,
                  }),
                  menu: (props) => {
                    return {
                      ...props,
                      border: `1px solid #eaebeb`,
                      borderRadius: `6px`,
                      boxShadow: `none`,
                    }
                  },
                  menuList: (props) => {
                    return {
                      ...props,
                      height: 120,
                    }
                  },
                  option: (props, state) => {
                    return {
                      ...props,
                      fontSize: `16px`,
                      fontFamily: `Ilisarniq, sans-serif`,
                      color: `#474b51`,
                      backgroundColor: state.isFocused
                        ? `#e5effa`
                        : `transparent`,
                      cursor: `pointer`,
                      "&:active": {
                        backgroundColor: `#e5effa`,
                      },
                    }
                  },
                  multiValue: (props) => {
                    return {
                      ...props,
                      backgroundColor: `#e5effa`,
                      border: `none`,
                      color: `#474b51`,
                      fontSize: `16px`,
                    }
                  },
                }}
                onChange={(e) => {
                  e && _.isArray(e) && e.length > 0
                    ? setFieldValue(
                        `extracurricularActivityType`,
                        e.map((item: any) => {
                          return item.value
                        }),
                      )
                    : setFieldValue(`extracurricularActivityType`, [])
                }}
              />
            </div>
            <div className="all-filters-body-item d-flex flex-column justify-content-between">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.incomingCollegeFreshmen`)}
              </div>
              <CheckboxFilter
                setFieldValue={() =>
                  values.collegeFreshman
                    ? setFieldValue(`collegeFreshman`, false)
                    : setFieldValue(`collegeFreshman`, true)
                }
                value={
                  _.isBoolean(values.collegeFreshman) && values.collegeFreshman
                }
                label={t(`searchScreen.basedOnSchoolClassYear`)}
                type="radio"
              />
            </div>
            <div className="all-filters-body-item d-flex flex-column justify-content-between">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.risingSeniors`)}
              </div>
              <CheckboxFilter
                setFieldValue={() =>
                  values.seniors
                    ? setFieldValue(`seniors`, false)
                    : setFieldValue(`seniors`, true)
                }
                value={_.isBoolean(values.seniors) && values.seniors}
                label={t(`searchScreen.basedOnSchoolClassYearNext`)}
                type="radio"
              />
            </div>
          </div>
        </div>
      }
    />
  )
}

export default AllFiltersUniversityModal

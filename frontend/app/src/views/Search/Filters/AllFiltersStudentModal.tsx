import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import Button from "../../../components/Button/Button"
import CheckboxFilter from "../../../components/Filters/CheckboxFilter"
import Modal from "../../../components/Modal/Modal"
import { actions } from "../../../store"
import {
  MatchLevel,
  mockedAdmissionsGender,
  mockedAthleticDivision,
  mockedLocation,
  mockedSchoolType,
} from "./filterTypes"
import Styles from "./index.module.scss"

export interface AllFiltersStudentModalProps {
  isOpen: boolean
  toggle: () => void
  searchParams: any
  resetForm: any
  setFieldValue: any
  values: any
  handleSubmit: any
  setLastSubmittedValues: any
}
const AllFiltersStudentModal: React.FC<AllFiltersStudentModalProps> = ({
  isOpen,
  toggle,
  searchParams,
  resetForm,
  setFieldValue,
  values,
  handleSubmit,
  setLastSubmittedValues,
}) => {
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
                {t(`searchScreen.location`)}
              </div>
              {mockedLocation.map((item: any) => {
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
                      values.location && values.location.length > 0
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
                {t(`searchScreen.localeType`)}
              </div>
              {searchParams &&
                searchParams.locale &&
                searchParams.locale.length > 0 &&
                searchParams.locale.map((item: any) => {
                  return (
                    <CheckboxFilter
                      setFieldValue={() =>
                        values.locale.find((it: string) => it === item.key)
                          ? setFieldValue(
                              `locale`,
                              values.locale.filter(
                                (it: string) => it !== item.key,
                              ),
                            )
                          : setFieldValue(`locale`, [
                              ...values.locale,
                              item.key,
                            ])
                      }
                      value={
                        values.locale.length > 0
                          ? values.locale.find((it: string) => it === item.key)
                            ? true
                            : false
                          : false
                      }
                      label={item.content}
                    />
                  )
                })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.regions`)}
              </div>
              {searchParams &&
                searchParams.region &&
                searchParams.region.length > 0 &&
                searchParams.region.map((item: any) => {
                  return (
                    <CheckboxFilter
                      setFieldValue={() =>
                        values.region.find((it: string) => it === item.key)
                          ? setFieldValue(
                              `region`,
                              values.region.filter(
                                (it: string) => it !== item.key,
                              ),
                            )
                          : setFieldValue(`region`, [
                              ...values.region,
                              item.key,
                            ])
                      }
                      value={
                        values.region.length > 0
                          ? values.region.find((it: string) => it === item.key)
                            ? true
                            : false
                          : false
                      }
                      label={item.content}
                    />
                  )
                })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.studentBodySize`)}
              </div>
              {searchParams &&
                searchParams.schoolSize &&
                searchParams.schoolSize.length > 0 &&
                searchParams.schoolSize.map((item: any) => {
                  return (
                    <CheckboxFilter
                      setFieldValue={() =>
                        values.schoolSize.find((it: string) => it === item.key)
                          ? setFieldValue(
                              `schoolSize`,
                              values.schoolSize.filter(
                                (it: string) => it !== item.key,
                              ),
                            )
                          : setFieldValue(`schoolSize`, [
                              ...values.schoolSize,
                              item.key,
                            ])
                      }
                      value={
                        values.schoolSize.length > 0
                          ? values.schoolSize.find(
                              (it: string) => it === item.key,
                            )
                            ? true
                            : false
                          : false
                      }
                      label={item.content}
                    />
                  )
                })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.studentBodyType`)}
              </div>
              {mockedAdmissionsGender.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.admissionGender === item.id
                        ? setFieldValue(`admissionGender`, null)
                        : setFieldValue(`admissionGender`, item.id)
                    }
                    value={
                      values.admissionGender &&
                      Number(values.admissionGender) === values.admissionGender
                        ? values.admissionGender === item.id
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
                {t(`searchScreen.schoolType`)}
              </div>
              {mockedSchoolType.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.schoolType.length > 0 &&
                      values.schoolType[0] === item.id
                        ? setFieldValue(`schoolType`, [])
                        : setFieldValue(`schoolType`, [item.id])
                    }
                    value={
                      values.schoolType && values.schoolType.length > 0
                        ? values.schoolType[0] === item.id
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
                {t(`searchScreen.degree`)}
              </div>
              {searchParams &&
                searchParams.degree &&
                searchParams.degree.length > 0 &&
                searchParams.degree.map((item: any) => {
                  return (
                    <CheckboxFilter
                      setFieldValue={() =>
                        values.degree.find((it: string) => it === item.key)
                          ? setFieldValue(
                              `degree`,
                              values.degree.filter(
                                (it: string) => it !== item.key,
                              ),
                            )
                          : setFieldValue(`degree`, [
                              ...values.degree,
                              item.key,
                            ])
                      }
                      value={
                        values.degree.length > 0
                          ? values.degree.find((it: string) => it === item.key)
                            ? true
                            : false
                          : false
                      }
                      label={item.content}
                    />
                  )
                })}
            </div>
            <div className="all-filters-body-item">
              <div className="all-filters-body-item-title">
                {t(`searchScreen.athleticDivision`)}
              </div>
              {mockedAthleticDivision.map((item: any) => {
                return (
                  <CheckboxFilter
                    setFieldValue={() =>
                      values.athleticDivision.find(
                        (it: number) => it === item.id,
                      )
                        ? setFieldValue(
                            `athleticDivision`,
                            values.athleticDivision.filter(
                              (it: number) => it !== item.id,
                            ),
                          )
                        : setFieldValue(`athleticDivision`, [
                            ...values.athleticDivision,
                            item.id,
                          ])
                    }
                    value={
                      values.athleticDivision.length > 0
                        ? values.athleticDivision.find(
                            (it: number) => it === item.id,
                          )
                          ? true
                          : false
                        : false
                    }
                    label={item.name}
                  />
                )
              })}
            </div>
          </div>
        </div>
      }
    />
  )
}

export default AllFiltersStudentModal

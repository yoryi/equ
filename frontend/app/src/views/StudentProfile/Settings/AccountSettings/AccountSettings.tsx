import { FormikValues,useFormik } from "formik"
import _ from "lodash"
import moment from "moment"
import React, { useCallback,useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import AutosuggestField from "../../../../components/Autosuggest/Autosuggest"
import Button from "../../../../components/Button/Button"
import DatepickerWithDay from "../../../../components/DatePicker/DatepickerWithDay"
//Components
import MessageModal from "../../../../components/MessageModal"
import Multiselect from "../../../../components/SelectField/MultiSelectField"
import SelectField, {
  Option,
} from "../../../../components/SelectField/SelectField"
import TextField from "../../../../components/TextField/TextField"
//Hooks
import useLoader from "../../../../hooks/useLoader"
import i18n from "../../../../services/i18n"
import { actions } from "../../../../store"
import {
  Ethnicity,
  Gender,
  Hardship,
  HighSchool,
  Race,
  ReduxState,
} from "../../../../store/types"
import getAvatar from "../../../../utils/getAvatar"
import { ChangeAvatar } from "./ChangeAvatar"
import { CloseAccountModal } from "./CloseAccountModal"

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:firstName`) }),
    ),
  lastName: yup
    .string()
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:lastName`) }),
    ),
  school: yup
    .object({
      name: yup.string().nullable().required(),
      id: yup
        .number()
        .nullable()
        .required(i18n.t(`errors:pleaseProvideAtLeastThreeCharacters`)),
    })
    .nullable()
    .required(i18n.t(`errors:thisFieldIsRequired`)),
  graduation: yup
    .number()
    .required(
      i18n.t(`errors:pleasePick`, {
        name: i18n.t(`common:grade`).toLowerCase(),
      }),
    ),
  day: yup
    .number()
    .min(1, i18n.t(`errors:thisFieldIsRequired`))
    .nullable()
    .required(i18n.t(`errors:thisFieldIsRequired`)),
  month: yup
    .number()
    .min(1, i18n.t(`errors:thisFieldIsRequired`))
    .nullable()
    .required(i18n.t(`errors:thisFieldIsRequired`)),
  year: yup
    .number()
    .min(1, i18n.t(`errors:thisFieldIsRequired`))
    .nullable()
    .required(i18n.t(`errors:thisFieldIsRequired`)),
})

const NUMBER_TAKE_HIGHSCHOOLS = 20

export const AccountSettings = () => {
  const profile = useSelector((state: ReduxState) => state.profile.profile)
  const genders = useSelector((state: ReduxState) => state.shared.genders)
  const races = useSelector((state: ReduxState) => state.shared.races)
  const ethnicities = useSelector(
    (state: ReduxState) => state.shared.ethnicities,
  )
  const hardships = useSelector((state: ReduxState) => state.shared.hardships)
  const { isChangeAvatarModalOpen, isCloseAccountModalOpen } = useSelector(
    (state: any) => state.settings,
  )
  const { searchedHighSchools } = useSelector((state: any) => state.profile)
  const [birthdayError, setBirthdayError] = useState(``)
  const dispatch = useDispatch()

  const [highSchools, setHighSchools] = useState<HighSchool[]>([])
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { onLoadComplete } = useLoader()

  const searchHighSchool = (name: string) => {
    if (name.length >= 3) {
      dispatch(
        actions.getHighSchools({
          name,
          skip: 0,
          take: NUMBER_TAKE_HIGHSCHOOLS,
        }),
      )
    }
  }

  const debouncedSearchHighSchool = useCallback(
    _.debounce((nextValue: string) => {
      searchHighSchool(nextValue)
    }, 1000),
    [],
  )

  useEffect(() => {
    setHighSchools(searchedHighSchools)
  }, [searchedHighSchools])

  const initialValues: FormikValues = useMemo(
    () => ({
      firstName: profile?.firstName ?? ``,
      lastName: profile?.lastName ?? ``,
      email: profile?.email ?? ``,
      privateAvatar: profile?.privateAvatar ?? ``,
      school: profile && profile.school ? profile.school : ``,
      graduation: profile?.graduation ?? moment().year(),
      day: profile?.birthday
        ? Number(moment(profile?.birthday).format(`D`))
        : 0,
      month: profile?.birthday
        ? Number(moment(profile?.birthday).format(`M`))
        : 0,
      year: profile?.birthday
        ? Number(moment(profile?.birthday).format(`YYYY`))
        : 0,
      gender: profile?.gender,
      race: profile?.race,
      ethnicity: profile?.ethnicity,
      hardship: profile && profile.hardship ? profile.hardship : [],
    }),
    [profile],
  )

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    submitCount,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (
      {
        firstName,
        lastName,
        email,
        school,
        graduation,
        day,
        year,
        month,
        gender,
        race,
        ethnicity,
        hardship,
      },
      { setErrors, setSubmitting },
    ) => {
      const birthday = new Date(year, month - 1, day)
      const isThirteenYearsOld = moment()
        .subtract(13, `years`)
        .isAfter(moment(birthday))
      const hardshipIds =
        hardship.length > 0
          ? hardship.map((item: any) => item?.id).filter((id?: number) => !!id)
          : []

      if (isThirteenYearsOld) {
        dispatch(
          actions.updateStudentAccountSettings({
            firstName,
            lastName,
            email,
            school,
            graduation,
            birthday,
            gender,
            race,
            ethnicity,
            hardship: hardshipIds,
          }),
        )
          .then(() => setSuccessModalVisible(true))
          .catch(({ errors }: { errors: { [field: string]: string } }) =>
            setErrors(errors),
          )
          .finally(() => setSubmitting(false))
      } else {
        setBirthdayError(t(`common:birthdayError`))
        setSubmitting(false)
      }
    },
  })
  const { t } = useTranslation()

  const graduationOptions: Option[] = _.times(
    5,
    (i): Option => ({
      id: moment().add(i, `year`).year(),
      name: t(`common:classOf`, { year: moment().add(i, `year`).year() }),
    }),
  )

  useEffect(() => {
    if (errors && submitCount) {
      const birthday = new Date(values.year, values.month - 1, values.day)
      const isThirteenYearsOld = moment()
        .subtract(13, `years`)
        .isAfter(moment(birthday))
      if (!isThirteenYearsOld) {
        setBirthdayError(t(`common:birthdayError`))
      } else {
        setBirthdayError(``)
      }
    }
  }, [errors, values, submitCount])

  const autoSuggestionStyles = {
    input:
      touched.school && errors.school
        ? {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #c91c0d`,
            fontFamily: `Ilisarniq, sans-serif`,
            fontSize: 16,
            padding: `8px 16px`,
            color: `#c91c0d`,
            background: `#fae8e7`,
          }
        : {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #eaebeb`,
            fontFamily: `Ilisarniq, sans-serif`,
            fontSize: 16,
            padding: `8px 16px`,
          },
    suggestionsContainer: {
      marginTop: `0px`,
      maxHeight: `300px`,
    },
    suggestion: {
      listStyleType: `none`,
      textAlign: `left`,
      borderBottom: `1px solid #eaebeb`,
      padding: `8px 8px`,
      fontFamily: `Ilisarniq, sans-serif`,
      color: `#1f242b`,
      width: highSchools?.length >= 6 ? `264px` : `280px`,
    },
    suggestionHighlighted: {
      background: `#eee`,
      cursor: `pointer`,
    },
    container: {
      position: `relative`,
      zIndex: 2,
      background: `#fff`,
    },
    suggestionsList: {
      margin: `0px`,
      maxHeight: `300px`,
      overflowY: `auto`,
      boxSizing: `border-box`,
      padding: `0px 16px`,
      position: `absolute`,
      background: `#fff`,
      borderRadius: `4px`,
      boxShadow:
        `0px 0px 24px rgba(31, 36, 43, 0.06), 0px 4px 8px rgba(31, 36, 43, 0.08)`,
    },
  }

  useEffect(() => {
    if (!profile) {
      return
    }

    onLoadComplete()
  }, [profile])

  if (!profile) {
    return null
  }
  const hardshipValues =
    values.hardship?.length && hardships
      ? values.hardship
          .map((item: any) =>
            item && _.isObject(item) ? item : hardships[item - 1],
          )
          .filter((item: any) => !!item)
      : []

  return (
    <>
      <div className="account-settings-container">
        <div className="account-settings-title">
          {t(`settings.studentProfileSettingsScreen.accountSettings`)}
        </div>
        <div
          className="account-settings-row first-row"
          style={{ marginBottom: 20 }}
        >
          <div>
            <img src={getAvatar(values.privateAvatar)} alt="user-img" />
          </div>
          <div className="account-settings-row-text">
            <div className="account-settings-row-text-title">
              {profile.name}
            </div>
            <div
              className="account-settings-row-text-subtitle"
              onClick={() =>
                dispatch(actions.toggleChangePrivateAvatarModal(true))
              }
            >
              {t(`settings.studentProfileSettingsScreen.changeAvatar`)}
            </div>
          </div>
        </div>
        <div className="account-settings-row mx-n2">
          <TextField
            className={`mx-2`}
            onChange={handleChange(`firstName`)}
            value={values.firstName}
            placeholder={t(`common:firstName`)}
            title={t(`common:firstName`)}
            error={touched.firstName && (errors.firstName as string)}
          />
          <TextField
            className={`mx-2`}
            onChange={handleChange(`lastName`)}
            value={values.lastName}
            placeholder={t(`common:lastName`)}
            title={t(`common:lastName`)}
            error={touched.lastName && (errors.lastName as string)}
          />
        </div>
        <div className="account-settings-row account-settings-row-single-row">
          <div className="account-settings-row-single-row">
            <TextField
              onChange={handleChange(`email`)}
              value={values.email}
              placeholder={t(`common:email`)}
              title={t(`common:email`)}
              error={touched.email && (errors.email as string)}
              disabled
            />
            <div className="account-settings-row-single-row-email-text">
              {t(`settings.studentProfileSettingsScreen.pleaseEmailEquedi`)}
            </div>
          </div>
        </div>
        <div>
          <DatepickerWithDay
            day={values.day}
            month={values.month}
            year={values.year}
            setFieldValue={setFieldValue}
            dayError={(touched.day && errors.day) || birthdayError}
            monthError={(touched.month && errors.month) || birthdayError}
            yearError={(touched.year && errors.year) || birthdayError}
          />
        </div>
        <div className="account-settings-title">{t(`common:highSchool`)}</div>
        <div className="account-settings-row d-flex mx-n2">
          <div className={`mx-2`} style={{ marginBottom: 18 }}>
            <div
              className={`register-title-first-step-row-highschool ${
                touched && touched.school && errors && errors.school
                  ? `highschool-error`
                  : ``
              }`}
            >
              <div
                className={`highschool-label ${
                  values.school ? `` : `pristine`
                }`}
              >
                {t(`common:highSchool`)}
              </div>
              <>
                <AutosuggestField
                  values={highSchools}
                  value={values.school?.name ?? ``}
                  setValue={(school: HighSchool) => {
                    debouncedSearchHighSchool(school.name)
                    setFieldValue(`school`, school)
                  }}
                  placeholder={t(`common:searchHighSchools`)}
                  styles={autoSuggestionStyles}
                />
                {touched.school && !!errors.school && (
                  <span className={`autosuggest-error`}>
                    {((errors.school as { id: string } | null)?.id as string) ??
                      errors.school}
                  </span>
                )}
              </>
            </div>
          </div>
          <SelectField
            className={`mx-2`}
            onChange={(option: Option) => {
              setFieldValue(
                `graduation`,
                graduationOptions.find((grade) => grade.name === option.value)
                  ?.id,
              )
            }}
            value={values.graduation ? `Class of ${values.graduation}` : ``}
            items={graduationOptions}
            title={t(`common:grade`)}
            placeholder={t(`common:selectGrade`)}
            error={touched.graduation && (errors.graduation as string)}
            size={`auto`}
          />
        </div>
        <div className="account-settings-title">
          {t(`settings.studentProfileSettingsScreen.diversity`)}
        </div>
        <div className="account-settings-row mx-n2">
          <SelectField
            className={`mx-2`}
            onChange={async (option: Option) =>
              setFieldValue(
                `gender`,
                genders?.find((gender) => gender.name === option.value)?.id,
              )
            }
            value={
              values.gender && genders ? genders[values.gender - 1].name : ``
            }
            items={genders as Gender[]}
            placeholder={t(`common:selectGender`)}
            title={t(`common:gender`)}
            error={touched.gender && (errors.gender as string)}
            size={`auto`}
          />
          <SelectField
            className={`mx-2`}
            onChange={async (option: Option) =>
              setFieldValue(
                `race`,
                races?.find((race) => race.name === option.value)?.id,
              )
            }
            value={values.race && races ? races[values.race - 1].name : ``}
            items={races as Race[]}
            placeholder={t(`common:selectRace`)}
            title={t(`common:race`)}
            error={touched.race && (errors.race as string)}
            size={`auto`}
          />
        </div>
        <div className="account-settings-row mx-n2">
          <SelectField
            className={`mx-2`}
            onChange={async (option: Option) =>
              setFieldValue(
                `ethnicity`,
                ethnicities?.find(
                  (ethnicity) => ethnicity.name === option.value,
                )?.id,
              )
            }
            value={
              values.ethnicity && ethnicities
                ? ethnicities[values.ethnicity - 1].name
                : ``
            }
            items={ethnicities as Ethnicity[]}
            placeholder={t(`common:selectEthnicity`)}
            title={t(`common:ethnicity`)}
            error={touched.ethnicity && (errors.ethnicity as string)}
            size={`auto`}
          />
          <Multiselect
            className={`mx-2`}
            onSelect={async (selected: any) => setFieldValue(`hardship`, selected)}
            onRemove={async (selected: any) => setFieldValue(`hardship`, selected)}
            selectedValues={hardshipValues}
            items={hardships as Hardship[]}
            placeholder={t(`common:selectHardship`)}
            title={t(`common:hardships`)}
            displayValue="name"
            error={touched.hardship && (errors.hardship as string)}
            size={`auto`}
          />
        </div>
        <div className="account-settings-title" style={{ marginBottom: 20 }}>
          {t(`settings.studentProfileSettingsScreen.accountChanges`)}
        </div>
        <div
          className="account-settings-row"
          style={{ justifyContent: `space-between` }}
        >
          <div
            style={{ cursor: `pointer` }}
            onClick={() => dispatch(actions.toggleCloseAccountModal())}
          >
            <div className="account-settings-second-title">
              {t(`settings.studentProfileSettingsScreen.closeAccount`)}
            </div>
            <div className="account-settings-subtitle font-italic">
              {t(`settings.studentProfileSettingsScreen.deleteYourAccount`)}
            </div>
          </div>
        </div>
        <div className="account-settings-submit">
          <Button onClick={() => handleSubmit()}>
            {t(`common:saveChanges`)}
          </Button>
        </div>
        <ChangeAvatar
          isOpen={isChangeAvatarModalOpen}
          toggle={() => dispatch(actions.toggleChangePrivateAvatarModal(false))}
          values={values}
          setFieldValue={setFieldValue}
        />
        <CloseAccountModal
          isOpen={isCloseAccountModalOpen}
          toggle={() => dispatch(actions.toggleCloseAccountModal())}
          firstName={profile.firstName ?? ``}
        />
      </div>

      <MessageModal
        title={t(`common:success`)}
        message={t(`settings.accountSettings.accountSettingsSaved`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
  )
}

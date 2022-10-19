import "react-datepicker/dist/react-datepicker.css"

//Components
// import ZipCodePicker from '../../components/ZipCodePicker';
import { TextField as BrandTextField } from "@equedi/brand-ui/src/components/Current/TextField"
import * as schema from "@equedi/data-schema"
import { useFormik } from "formik"
import _ from "lodash"
import moment from "moment"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import AutosuggestField from "../../components/Autosuggest/Autosuggest"
import Button from "../../components/Button/Button"
import DatepickerWithDay from "../../components/DatePicker/DatepickerWithDay"
import Progress from "../../components/Progress/Progress"
import SelectField, { Option } from "../../components/SelectField/SelectField"
import TextField from "../../components/TextField/TextField"
import history from "../../history"
import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
import { HighSchool, ReduxState } from "../../store/types"

const validationSchema = yup.object({
  firstName: yup
    .string()
    .nullable()
    .min(2, i18n.t(`errors:firstNameShouldHave`))
    .max(60, i18n.t(`errors:pleaseEnterValidName`))
    .required(i18n.t(`errors:thisFieldIsRequired`)),
  lastName: yup
    .string()
    .nullable()
    .min(2, i18n.t(`errors:lastNameShouldHave`))
    .max(60, i18n.t(`errors:pleaseEnterValidName`))
    .required(i18n.t(`errors:thisFieldIsRequired`)),
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
    .nullable()
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
  location: yup
    .object({
      zipCode: yup.string().required().matches(schema.zipCode.regex[0].exp),
      stateCode: yup.string(),
      formattedAddress: yup.string(),
      lat: yup.number(),
      lng: yup.number(),
    })
    .nullable()
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:zipCode`) }),
    ),
})

const NUMBER_TAKE_HIGHSCHOOLS = 20

const StudentRegisterFirstStep = () => {
  const dispatch = useDispatch()
  const [highSchools, setHighSchools] = useState<HighSchool[]>([])
  const { profile } = useSelector((state: ReduxState) => state.profile)
  const { searchedHighSchools } = useSelector((state: any) => state.profile)
  const [birthdayError, setBirthdayError] = useState(``)

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

  const onSelectLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value
    setFieldValue(`location`, { zipCode })
    if (schema.zipCode.regex[0].exp.test(e.target.value)) {
      const results = (await dispatch(actions.searchZipCode(zipCode))) as any
      if (results.length) setFieldValue(`location`, { ...results[0] })
    }
  }

  const debouncedSearchHighSchool = useCallback(
    _.debounce((nextValue: string) => {
      searchHighSchool(nextValue)
    }, 1000),
    [],
  )

  useEffect(() => {
    if (searchedHighSchools !== highSchools) {
      setHighSchools(searchedHighSchools)
    }
  }, [searchedHighSchools, highSchools])

  const { t } = useTranslation()

  const initialValues: any = useMemo(() => {
    return {
      firstName: profile ? profile.firstName : ``,
      lastName: profile ? profile.lastName : ``,
      school: profile && profile.school ? profile.school : null,
      graduation: profile ? profile.graduation : 0,
      day: profile?.birthday
        ? Number(moment(profile?.birthday).format(`D`))
        : 0,
      month: profile?.birthday
        ? Number(moment(profile?.birthday).format(`M`))
        : 0,
      year: profile?.birthday
        ? Number(moment(profile?.birthday).format(`YYYY`))
        : 0,
      location: profile?.zipCode
        ? {
            zipCode: profile.zipCode,
            stateCode: profile.stateCode,
            lat: profile.latitude,
            lng: profile.longitude,
          }
        : null,
    }
  }, [profile])

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    submitCount,
  } = useFormik<any>({
    validationSchema,
    initialValues,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const birthday = new Date(values.year, values.month - 1, values.day)
      const isThirteenYearsOld = moment()
        .subtract(13, `years`)
        .isAfter(moment(birthday))

      if (isThirteenYearsOld) {
        dispatch(
          actions.studentSignUpDetails({
            ...values,
            school: values.school as HighSchool,
            birthday,
            stateCode: values.location.stateCode,
            latitude: values.location.lat,
            longitude: values.location.lng,
            zipCode: values.location.zipCode,
          }),
        )
          .then(() => history.push(`/register/student/step-two`))
          .catch((err: { errors: any; message: string }) => {
            err && setErrors(err.errors)
            err && setSubmitting(false)
          })
        setSubmitting(false)
      } else {
        setBirthdayError(t(`common:birthdayError`))
        setSubmitting(false)
      }
    },
    enableReinitialize: true,
  })
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

  const graduationOptions: Option[] = _.times(
    5,
    (i): Option => ({
      id: moment().add(i, `year`).year(),
      name: t(`common:classOf`, { year: moment().add(i, `year`).year() }),
    }),
  )

  const autoSuggestionStyles = {
    input:
      touched && errors && touched.school && errors.school
        ? {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #c91c0d`,
            fontFamily: `Ilisarniq, sans-serif`,
            fontSize: `16px`,
            padding: `8px 16px`,
            background: `#fae8e7`,
            color: `#c91c0d`,
          }
        : {
            borderRadius: `6px`,
            outline: `none`,
            width: `100%`,
            border: `1px solid #eaebeb`,
            fontFamily: `Ilisarniq, sans-serif`,
            fontSize: `16px`,
            padding: `8px 16px`,
          },
    suggestionsContainer: {
      width: `310px`,
      marginTop: `0px`,
      maxHeight: `300px`,
    },
    suggestion: {
      listStyleType: `none`,
      padding: `8px 8px`,
      fontFamily: `Ilisarniq, sans-serif`,
      fontSize: `16px`,
      color: `#1f242b`,
      width: highSchools && highSchools.length >= 6 ? `264px` : `280px`,
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
      fontSize: `16px`,
      padding: `0px 16px`,
      position: `absolute`,
      background: `#fff`,
      borderRadius: `4px`,
      boxShadow: `0px 0px 24px rgba(31, 36, 43, 0.06), 0px 4px 8px rgba(31, 36, 43, 0.08)`,
    },
  }

  return (
    <>
      <Progress value={1} />
      <div className="register">
        <div className="register-title-first-step">
          {t(`signUp.student.detailsScreen.tellUsAboutYourself`)}
        </div>
        <div className="register-title-first-step-row w-100">
          <TextField
            className={`flex-grow-1`}
            onChange={handleChange(`firstName`)}
            value={values.firstName || ``}
            placeholder={t(`common:firstName`)}
            title={t(`common:firstName`)}
            error={
              touched &&
              touched.firstName &&
              errors &&
              (errors.firstName as string)
            }
          />
          <TextField
            className={`flex-grow-1`}
            onChange={handleChange(`lastName`)}
            value={values.lastName || ``}
            placeholder={t(`common:lastName`)}
            title={t(`common:lastName`)}
            error={
              touched &&
              touched.lastName &&
              errors &&
              (errors.lastName as string)
            }
          />
        </div>
        <div className="register-title-first-step-row w-100">
          <div style={{ marginBottom: 18 }} className={`flex-grow-1`}>
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
                {touched && touched.school && errors && errors.school && (
                  <div className="error">
                    {(touched &&
                      errors &&
                      ((errors.school as { id: string } | null)
                        ?.id as string)) ||
                      errors.school}
                  </div>
                )}
              </>
            </div>
          </div>
          <SelectField
            className={`flex-grow-1 w-100`}
            onChange={(option: Option) => {
              setFieldValue(
                `graduation`,
                graduationOptions.find((grade) => grade.name === option.value)
                  ?.id,
              )
            }}
            value={(values.graduation
              ? t(`common:classOf`, { year: values.graduation })
              : ``
            ).toString()}
            items={graduationOptions}
            title={t(`common:grade`)}
            placeholder={t(`common:selectGrade`)}
            isInvalid={touched.graduation && !!errors.graduation}
            error={
              touched &&
              touched.graduation &&
              errors &&
              (errors.graduation as string)
            }
          />
        </div>
        <div className="register-title-first-step-row register-title-first-step-row-single-item-wrapper">
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

        <div className={`register-title-first-step-row`}>
          <BrandTextField
            variant="outlined"
            fullWidth
            label={t(`common:zipCode`)}
            className={`w-100 mt-3`}
            value={values.location?.zipCode}
            regExDefs={schema.zipCode.regex}
            onChange={onSelectLocation}
          />
          {/* <ZipCodePicker
                        className={'w-100 mt-3'}
                        label={t('common:zipCode')}
                        value={values.location}
                        onChange={value => setFieldValue('location', value)}
                        isInvalid={touched.location && !!errors.location}
                        error={!!touched.location && (errors.location as string)}
                    /> */}
        </div>

        <div className="register-submit" style={{ marginTop: 40 }}>
          <Button
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            type={`submit`}
          >
            {t(`common:continue`)}
          </Button>
        </div>
      </div>
    </>
  )
}

export default StudentRegisterFirstStep

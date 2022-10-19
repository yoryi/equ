import { FormikErrors,useFormik } from "formik"
import _ from "lodash"
import React, { useEffect,useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import ArrowIcon from "../../assets/arrow-top.svg"
import Button from "../../components/Button/Button"
import Progress from "../../components/Progress/Progress"
import Multiselect from "../../components/SelectField/MultiSelectField"
import SelectField, { Option } from "../../components/SelectField/SelectField"
import history from "../../history"
import * as actions from "../../store/actions"
import { StudentSignUpOptionalDetailsPayload } from "../../store/actions/auth/payloads"
import { Hardship, ReduxState } from "../../store/types"

const StudentRegisterSecondStep = () => {
  const genders = useSelector((state: ReduxState) => state.shared.genders)
  const races = useSelector((state: ReduxState) => state.shared.races)
  const ethnicities = useSelector(
    (state: ReduxState) => state.shared.ethnicities,
  )
  const hardships = useSelector((state: ReduxState) => state.shared.hardships)
  const { profile } = useSelector((state: ReduxState) => state.profile)
  const { isTokenLoaded, refreshToken, signUpSucceded } = useSelector(
    (state: ReduxState) => state.auth,
  )
  const dispatch = useDispatch()

  const [isSkipping, setSkipping] = useState(false)

  const initialValues = useMemo(() => {
    return {
      gender:
        profile && profile.gender && genders
          ? profile.gender.id
            ? genders.find((it) => it.id === profile.gender.id)
            : genders.find((it) => it.id === profile.gender)
          : null,
      race:
        profile && profile.race && races
          ? profile.race.id
            ? races.find((it) => it.id === profile.race.id)
            : races.find((it) => it.id === profile.race)
          : null,
      ethnicity:
        profile && profile.ethnicity && ethnicities
          ? profile.ethnicity.id
            ? ethnicities.find((it) => it.id === profile.ethnicity.id)
            : ethnicities.find((it) => it.id === profile.ethnicity)
          : null,
      hardship:
        profile && profile.hardship
          ? profile.hardship.filter((hardship: any) => !!hardship)
          : [],
    }
  }, [profile])

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<StudentSignUpOptionalDetailsPayload>({
    initialValues,
    onSubmit: (
      { hardship, ethnicity, gender, race },
      { setSubmitting, setErrors },
    ) => {
      const hardshipIds =
        hardship.length > 0 ? hardship.map((item: any) => item.id) : []
      dispatch(
        actions.studentSignUpOptionalDetails({
          gender,
          race,
          ethnicity,
          hardship: hardshipIds,
        }),
      )
        .then(() => history.push(`/register/student/step-three`))
        .catch(
          (err: {
            errors: FormikErrors<StudentSignUpOptionalDetailsPayload>
            message: string
          }) => {
            setErrors(err.errors)
            setSubmitting(false)
          },
        )
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (
      isTokenLoaded &&
      ((refreshToken &&
        profile &&
        profile.signUpStep === null &&
        profile.gender !== null) ||
        !refreshToken) &&
      isTokenLoaded &&
      !signUpSucceded
    ) {
      history.push(`/`)
    }
  }, [isTokenLoaded, refreshToken, profile, signUpSucceded])

  const handleSkip = () => {
    setSkipping(true)

    dispatch(actions.studentSignUpSkipOptionalDetails())
      .then(() => history.push(`/register/student/step-three`))
      .catch(() => setSkipping(false))
  }

  const { t } = useTranslation()

  const hardshipValues =
    values.hardship && values.hardship.length > 0 && hardships
      ? values.hardship.map((item: any) =>
          item && _.isObject(item) ? item : hardships[item - 1],
        )
      : []

  return (
    <>
      <Progress value={2} />
      <div
        className="register-back-button"
        onClick={() => history.push(`/register/student/step-one`)}
      >
        <img
          src={ArrowIcon}
          alt="arrow-icon"
          style={{ transform: `rotate(-90deg)` }}
        />
        <div>{t(`common:back`)}</div>
      </div>
      <div className="register">
        <div className="register-title-second-step mb-0">
          {t(`signUp.student.optionalDetailsScreen.title`)}
        </div>
        <div className="register-subtitle-second-step">
          {t(`signUp.student.optionalDetailsScreen.description`)}
        </div>
        <div className="register-title-second-step-row w-100">
          <SelectField
            className={`flex-grow-1 w-100`}
            onChange={async (option: Option) =>
              setFieldValue(
                `gender`,
                genders?.find((gender) => gender.name === option.value),
              )
            }
            value={values.gender?.name ?? ``}
            items={genders ?? []}
            placeholder={t(`common:selectGender`)}
            title={t(`common:gender`)}
            error={
              touched && touched.gender && errors && (errors.gender as string)
            }
          />
          <SelectField
            className={`flex-grow-1 w-100`}
            onChange={async (option: Option) =>
              setFieldValue(
                `race`,
                races?.find((race) => race.name === option.value),
              )
            }
            value={values.race?.name ?? ``}
            items={races ?? []}
            placeholder={t(`common:selectRace`)}
            title={t(`common:race`)}
            error={touched && touched.race && errors && (errors.race as string)}
          />
        </div>
        <div className="register-title-second-step-row register-title-second-step-second-row mt-4">
          <SelectField
            className={`flex-grow-1 w-100`}
            onChange={async (option: Option) =>
              setFieldValue(
                `ethnicity`,
                ethnicities?.find(
                  (ethnicity) => ethnicity.name === option.value,
                ),
              )
            }
            value={values.ethnicity?.name ?? ``}
            items={ethnicities ?? []}
            placeholder={t(`common:selectEthnicity`)}
            title={t(`common:ethnicity`)}
            error={
              touched &&
              touched.ethnicity &&
              errors &&
              (errors.ethnicity as string)
            }
          />
          <Multiselect
            className={`flex-grow-1 w-100`}
            onSelect={async (selected: any) => setFieldValue(`hardship`, selected)}
            onRemove={async (selected: any) => setFieldValue(`hardship`, selected)}
            selectedValues={hardshipValues}
            items={hardships as Hardship[]}
            placeholder={t(`common:selectHardship`)}
            title={t(`common:hardships`)}
            displayValue="name"
            error={touched.hardship && (errors.hardship as string)}
          />
        </div>
        <div className="register-submit-container">
          <div className="register-submit">
            <Button
              onClick={() => handleSubmit()}
              disabled={isSubmitting || isSkipping}
            >
              {t(`common:continue`)}
            </Button>
          </div>
          <div className="register-submit">
            <Button
              secondary
              onClick={handleSkip}
              disabled={isSubmitting || isSkipping}
            >
              {t(`common:skip`)}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentRegisterSecondStep

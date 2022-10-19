import { FormikErrors,useFormik } from "formik"
import React, { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import academicImg from "../../assets/academic-white.svg"
import activismImg from "../../assets/activism-white.svg"
import ArrowIcon from "../../assets/arrow-top.svg"
import checkedIcon from "../../assets/checked.svg"
import extracurricularImg from "../../assets/extracurricular-white.svg"
import professionalImg from "../../assets/professional-white.svg"
import recognitionImg from "../../assets/recognition-white.svg"
import Button from "../../components/Button/Button"
import Progress from "../../components/Progress/Progress"
import history from "../../history"
import * as actions from "../../store/actions"
import { StudentSignUpInterestsPayload } from "../../store/actions/auth/payloads"
import { ReduxState } from "../../store/types"

const StudentRegisterThirdStep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { profile } = useSelector((state: ReduxState) => state.profile)
  const { isTokenLoaded, refreshToken, signUpSucceded } = useSelector(
    (state: ReduxState) => state.auth,
  )

  const initialValues: any = useMemo(() => {
    return {
      interests: profile && profile.interests ? profile.interests : [1],
    }
  }, [profile])

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<StudentSignUpInterestsPayload>({
    initialValues,
    onSubmit: (payload, { setSubmitting, setErrors }) => {
      dispatch(actions.studentSignUpInterests(payload))
        .then(() => history.push(`/register/student/step-four`))
        .catch(
          (err: {
            errors: FormikErrors<StudentSignUpInterestsPayload>
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
      ((refreshToken && profile && profile.signUpStep === null) ||
        !refreshToken) &&
      isTokenLoaded &&
      !signUpSucceded
    ) {
      history.push(`/`)
    }
  }, [isTokenLoaded, refreshToken, profile, signUpSucceded])

  const renderInterest = (
    index: number,
    type: string,
    icon: string,
    disabled?: boolean,
  ) => {
    const { interests } = values
    return (
      <div
        onClick={
          disabled
            ? () => null
            : () => {
                interests.find((interest: number) => interest === index)
                  ? setFieldValue(`interests`, [
                      ...interests.filter(
                        (interest: number) => interest !== index,
                      ),
                    ])
                  : setFieldValue(`interests`, [...interests, index])
              }
        }
      >
        <img
          src={icon}
          alt={`${type}-icon`}
          className={`register-title-third-step-row-interest-img${
            interests.find((interest: number) => interest === index)
              ? `-active`
              : ``
          }`}
        />
        <div className="register-title-third-step-row-interest-text">
          {interests.find((interest: number) => interest === index) && (
            <img src={checkedIcon} alt="checked-icon" />
          )}
          {t(`common:involvements.${type}`)}
        </div>
      </div>
    )
  }

  return (
    <>
      <Progress value={3} />
      <div
        className="register-back-button"
        onClick={() => history.push(`/register/student/step-two`)}
      >
        <img
          src={ArrowIcon}
          alt="arrow-icon"
          style={{ transform: `rotate(-90deg)` }}
        />
        <div>{t(`common:back`)}</div>
      </div>
      <div className="register">
        <div className="register-title-third-step">
          {t(`signUp.student.interestsScreen.whatAreYouInterestedIn`)}
          <div className="register-subtitle-third-step">
            {t(`signUp.student.interestsScreen.descriptionDesktop`)}
          </div>
        </div>
        <div className="register-title-third-step-row">
          {renderInterest(1, `academic`, academicImg, true)}
          {renderInterest(2, `extracurricular`, extracurricularImg)}
          {renderInterest(3, `professional`, professionalImg)}
          {renderInterest(4, `activism`, activismImg)}
          {renderInterest(5, `recognition`, recognitionImg)}
        </div>
        <div className="register-submit-container">
          <div className="register-submit">
            <Button
              onClick={() => handleSubmit()}
              disabled={isSubmitting || values.interests.length === 0}
            >
              {t(`common:continue`)}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentRegisterThirdStep

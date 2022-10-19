//POST PILOT?
import { FormikValues,useFormik } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import checkedIcon from "../../assets/checked.svg"
import defaultAvatar from "../../assets/Yellow.svg"
import Button from "../../components/Button/Button"
import Progress from "../../components/Progress/Progress"
import history from "../../history"
import * as actions from "../../store/actions"

interface ConnectionObjectProps {
  id: number
  name: string
  school: string
  year: number
  icon: string
}

const StudentRegisterFifthStep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const initialValues: FormikValues = {
    profiles: [],
  }
  const { values, setFieldValue, handleSubmit, isSubmitting } = useFormik({
    initialValues,
    onSubmit: ({ profiles }, { setSubmitting }) => {
      dispatch(actions.getProfile())
      dispatch(actions.getProfileTranscript())
      dispatch(actions.getProfileExtracurriculars())
      dispatch(actions.getProfileProfessional())
      dispatch(actions.getProfileService())
      dispatch(actions.getProfileRecognition())
      if (profiles.length === 0) {
        dispatch(actions.finishSignUp())
        setSubmitting(false)
        return
      }
    },
  })
  const renderConnection = (connectionObj: ConnectionObjectProps) => (
    <div key={connectionObj.id}>
      <img
        src={connectionObj.icon}
        alt={`${connectionObj.id}-icon`}
        onClick={() => {
          const { profiles } = values
          profiles.find((profile: number) => profile === connectionObj.id)
            ? setFieldValue(`profiles`, [
                ...profiles.filter(
                  (profile: number) => profile !== connectionObj.id,
                ),
              ])
            : setFieldValue(`profiles`, [...profiles, connectionObj.id])
        }}
        className={`register-title-fifth-step-row-avatar${
          values.profiles.find(
            (profile: number) => profile === connectionObj.id,
          )
            ? `-active`
            : ``
        }`}
      />
      <div>
        {values.profiles.find(
          (profile: number) => profile === connectionObj.id,
        ) && (
          <img
            src={checkedIcon}
            alt="checked-icon"
            className="register-title-fifth-step-row-avatar-checked"
          />
        )}
      </div>
      <div className="register-title-fifth-step-row-title">
        {connectionObj.name}
      </div>
      <div className="register-title-fifth-step-row-details">
        {connectionObj.school}
      </div>
      <div className="register-title-fifth-step-row-details">
        Class of {connectionObj.year}
      </div>
    </div>
  )
  return (
    <>
      <Progress value={5} />
      <div className="register">
        <div className="register-title-fifth-step">
          {t(`signUp.student.connectionsScreen.connectWithScholars`)}
        </div>
        <div
          className={`register-title-fifth-step-row ${
            mockedConnections.length <= 6 && mockedConnections.length >= 4
              ? `row-3`
              : ``
          } ${mockedConnections.length > 6 ? `row-4` : ``}`}
        >
          {mockedConnections.map((it) => renderConnection(it))}
        </div>
        <div className="register-submit-container">
          <div className="register-submit">
            <Button
              onClick={() => {
                handleSubmit()
                history.push(`/`)
              }}
              disabled={values.profiles.length === 0 || isSubmitting}
            >
              {values.profiles.length <= 1
                ? t(`common:addConnection`, { count: values.profiles.length })
                : t(`common:addConnectionPlural`, {
                    count: values.profiles.length,
                  })}
            </Button>
          </div>
          <div className="register-submit">
            <Button
              secondary
              onClick={() => {
                handleSubmit()
                history.push(`/`)
              }}
              id="skip-button"
            >
              {t(`common:skip`)}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentRegisterFifthStep

const mockedConnections = [
  {
    id: 1,
    name: `Ryan`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
  {
    id: 2,
    name: `Emily`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
  {
    id: 3,
    name: `John`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
  {
    id: 4,
    name: `Philip`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
  {
    id: 5,
    name: `Peter`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
  {
    id: 6,
    name: `Kylie`,
    school: `Towsend Harris`,
    year: 2019,
    icon: defaultAvatar,
  },
  {
    id: 7,
    name: `Ashly`,
    school: `Towsend Harris`,
    year: 2020,
    icon: defaultAvatar,
  },
]

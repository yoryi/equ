import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import ArrowIcon from "../../assets/arrow-top.svg"
import eyeBlueImg from "../../assets/eye-closed-blue.svg"
import publishingImg from "../../assets/publishing.svg"
import universityProfileImg from "../../assets/university-profile.svg"
import Button from "../../components/Button/Button"
import Progress from "../../components/Progress/Progress"
import history from "../../history"
import { actions } from "../../store"

const StudentWelcome = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <>
      <Progress value={5} />
      <div
        className="register-back-button"
        onClick={() => history.push(`/register/student/step-three`)}
      >
        <img
          src={ArrowIcon}
          alt="arrow-icon"
          style={{ transform: `rotate(-90deg)` }}
        />
        <div>{t(`common:back`)}</div>
      </div>
      <div className="register">
        <div className="register-title student-register-welcome-title">
          {t(`signUp.student.welcomeScreen.welcomeToEquedi`)}
        </div>
        <div className="student-register-welcome-subtitle">
          {t(`signUp.student.welcomeScreen.weAreExcited`)}
        </div>
        <div className="student-register-welcome-container">
          {renderItem(
            eyeBlueImg,
            t(`signUp.student.welcomeScreen.privacyAndSecurity`),
            t(`signUp.student.welcomeScreen.privacyAndSecurityText`),
          )}
          {renderItem(
            publishingImg,
            t(`signUp.student.welcomeScreen.personalizedPortfolios`),
            t(`signUp.student.welcomeScreen.personalizedPortfoliosText`),
          )}
          {renderItem(
            universityProfileImg,
            t(`signUp.student.welcomeScreen.discoverAndFollowUniversities`),
            t(`signUp.student.welcomeScreen.discoverAndFollowUniversitiesText`),
          )}
        </div>
        <div className="register-submit">
          <Button
            onClick={() => {
              dispatch(actions.studentSignUpFinish()).then(() => {
                dispatch(actions.finishSignUp())
                dispatch(actions.getProfile())
                dispatch(actions.getProfileTranscript())
                dispatch(actions.getProfileExtracurriculars())
                dispatch(actions.getProfileProfessional())
                dispatch(actions.getProfileService())
                dispatch(actions.getProfileRecognition())
                history.push(`/`)
              })
            }}
          >
            {t(`signUp.student.welcomeScreen.letsBegin`)}
          </Button>
        </div>
      </div>
    </>
  )
}

const renderItem = (img: string, title: string, description: string) => (
  <div className="student-register-welcome-item">
    <img src={img} alt="student-profile-icon" />
    <div className="student-register-welcome-item-container">
      <div className="student-register-welcome-item-title">{title}</div>
      <div className="student-register-welcome-item-description">
        {description}
      </div>
    </div>
  </div>
)

export default StudentWelcome

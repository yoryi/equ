import React from "react"
import { useTranslation } from "react-i18next"

import publishingImg from "../../assets/publishing.svg"
import universityProfileImg from "../../assets/university-profile.svg"
import verificationImg from "../../assets/verification.svg"
import Button from "../../components/Button/Button"
import history from "../../history"

const UniversityRegisterIntro = () => {
  const { t } = useTranslation()
  return (
    <div className="register">
      <div className="register-title">
        {t(`signUp.university.introScreen.quickIntro`)}
      </div>
      <div className="university-register-intro-container">
        {renderIntroItem(
          universityProfileImg,
          t(`signUp.university.introScreen.universityProfile`),
          t(`signUp.university.introScreen.universityProfileText`),
        )}
        {renderIntroItem(
          verificationImg,
          t(`signUp.university.introScreen.verification`),
          t(`signUp.university.introScreen.verificationText`),
        )}
        {renderIntroItem(
          publishingImg,
          t(`signUp.university.introScreen.publishing`),
          t(`signUp.university.introScreen.publishingText`),
        )}
      </div>
      <div className="register-submit">
        <Button onClick={() => history.push(`/register-university-basic-info`)}>
          {t(`common:continue`)}
        </Button>
      </div>
    </div>
  )
}

const renderIntroItem = (img: string, title: string, description: string) => (
  <div className="university-register-intro-item">
    <img src={img} alt="university-profile-icon" />
    <div className="university-register-intro-item-container">
      <div className="university-register-intro-item-title">{title}</div>
      <div className="university-register-intro-item-description">
        {description}
      </div>
    </div>
  </div>
)

export default UniversityRegisterIntro

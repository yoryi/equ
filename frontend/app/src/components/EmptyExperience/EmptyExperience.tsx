import React from "react"
//Hooks
import { useTranslation } from "react-i18next"

import { ReactComponent as Plus } from "../../assets/plus.svg"
//Components
import IconBox from "../IconBox"

interface EmptyExperienceProps {
  toggleModal?: () => void
  title?: string
  wholeTitle?: string
  wholeDescription?: string
}

const EmptyExperience: React.FC<EmptyExperienceProps> = ({
  title,
  toggleModal,
  wholeTitle,
  wholeDescription,
}) => {
  const { t } = useTranslation()

  return (
    <div className="empty-experience">
      <button className={`border-0 bg-transparent p-0`} onClick={toggleModal}>
        <IconBox icon={Plus} variant={`dark`} shadow />
      </button>

      <div className="empty-experience-title">
        {wholeTitle
          ? wholeTitle
          : t(`profile.student.transcriptScreen.addExperience`, { title })}
      </div>
      <div className="empty-experience-subtitle">
        {wholeDescription
          ? wholeDescription
          : t(`profile.student.transcriptScreen.addExperienceDescription`, {
              title,
            })}
      </div>
    </div>
  )
}

export default EmptyExperience

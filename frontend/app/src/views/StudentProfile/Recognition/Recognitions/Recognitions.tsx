//Utils
import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useParams } from "react-router"

import Card from "../../../../components/Card/Card"
import { ProfileRecognition } from "../../../../store/types/profile"

interface RecognitionProps {
  recognition: ProfileRecognition | null
  toggleModal?: () => void
}

export const Recognitions: React.FC<RecognitionProps> = ({
  recognition,
  toggleModal,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()

  if (!recognition?.quote && !isViewingOwnProfile) {
    return null
  }

  return (
    recognition && (
      <div className="student-profile-tab-item">
        <div className="student-profile-tab-item-title">
          {t(`profile.student.recognitionScreen.recognition`)}
        </div>

        <Card
          title={t(`profile.student.recognitionScreen.hardWorkPaysOff`)}
          toggleModal={toggleModal}
          className="student-profile-card"
          hideEditIcon={!isViewingOwnProfile}
        >
          <p
            className={classNames({
              [`font-italic`]: !recognition.quote?.content?.length,
            })}
          >
            {recognition.quote?.content?.length
              ? recognition.quote.content
              : t(`common:enterYourResponseHere`)}
          </p>
        </Card>
      </div>
    )
  )
}

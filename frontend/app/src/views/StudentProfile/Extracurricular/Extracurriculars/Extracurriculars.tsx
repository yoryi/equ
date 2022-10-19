//Utils
import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useParams } from "react-router"

import Card from "../../../../components/Card/Card"
import { ProfileExtracurriculars } from "../../../../store/types/profile"

interface ExtracurricularsProps {
  extracurriculars: ProfileExtracurriculars | null
  toggleModal?: () => void
}

export const Extracurriculars: React.FC<ExtracurricularsProps> = ({
  extracurriculars,
  toggleModal,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()

  if (!extracurriculars?.quote && !isViewingOwnProfile) {
    return null
  }

  return (
    extracurriculars && (
      <div className="student-profile-tab-item">
        <div className="student-profile-tab-item-title">
          {t(`profile.student.extracurricularsScreen.extracurriculars`)}
        </div>

        <Card
          title={t(`profile.student.extracurricularsScreen.whereDoYouShine`)}
          toggleModal={toggleModal}
          className="student-profile-card"
          hideEditIcon={!isViewingOwnProfile}
        >
          <p
            className={classNames({
              [`font-italic`]: !extracurriculars.quote?.content?.length,
            })}
          >
            {extracurriculars.quote?.content?.length
              ? extracurriculars.quote.content
              : t(`common:enterYourResponseHere`)}
          </p>
        </Card>
      </div>
    )
  )
}

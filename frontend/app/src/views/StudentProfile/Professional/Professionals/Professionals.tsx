//Utils
import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useParams } from "react-router"

import Card from "../../../../components/Card/Card"
import { ProfileProfessional } from "../../../../store/types/profile"

interface ProfessionalsProps {
  professional: ProfileProfessional | null
  toggleModal?: () => void
}

export const Professionals: React.FC<ProfessionalsProps> = ({
  professional,
  toggleModal,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()

  if (!professional?.quote && !isViewingOwnProfile) {
    return null
  }

  return (
    professional && (
      <div className="student-profile-tab-item">
        <div className="student-profile-tab-item-title">
          {t(`profile.student.professionalScreen.professional`)}
        </div>

        <Card
          title={t(`profile.student.professionalScreen.whatIndustry`)}
          toggleModal={toggleModal}
          className="student-profile-card"
          hideEditIcon={!isViewingOwnProfile}
        >
          <p
            className={classNames({
              [`font-italic`]: !professional.quote?.content?.length,
            })}
          >
            {professional.quote?.content?.length
              ? professional.quote.content
              : t(`common:enterYourResponseHere`)}
          </p>
        </Card>
      </div>
    )
  )
}

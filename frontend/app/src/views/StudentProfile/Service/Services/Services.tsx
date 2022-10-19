//Utils
import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useParams } from "react-router"

import Card from "../../../../components/Card/Card"
import { ProfileService } from "../../../../store/types/profile"

interface ServicesProps {
  service: ProfileService | null
  toggleModal?: () => void
}

export const Services: React.FC<ServicesProps> = ({ service, toggleModal }) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()

  if (!service?.quote && !isViewingOwnProfile) {
    return null
  }

  return (
    service && (
      <div className="student-profile-tab-item">
        <div className="student-profile-tab-item-title">
          {t(`profile.student.serviceScreen.service`)}
        </div>

        <Card
          title={t(`profile.student.serviceScreen.whatInspiresYou`)}
          toggleModal={toggleModal}
          className="student-profile-card"
          hideEditIcon={!isViewingOwnProfile}
        >
          <p
            className={classNames({
              [`font-italic`]: !service.quote?.content?.length,
            })}
          >
            {service.quote?.content?.length
              ? service.quote.content
              : t(`common:enterYourResponseHere`)}
          </p>
        </Card>
      </div>
    )
  )
}

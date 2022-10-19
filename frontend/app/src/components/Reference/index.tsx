//Utils
import classNames from "classnames"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"
import { useParams } from "react-router"
//Components
import { HashLink } from "react-router-hash-link"

//Types
import {
  ActivityType,
  ReduxState,
  Reference as TReference,
} from "../../store/types"
import { nameAbbreviation } from "../../utils/nameAbbreviation"
import Button from "../Button/Button"
//Styles
import Styles from "./index.module.scss"

interface ReferenceProps {
  reference: TReference
  className?: string
  onClick?: () => void
}

const Reference: React.FC<ReferenceProps> = ({
  reference,
  className,
  onClick,
}) => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const mediaToken = useSelector<ReduxState, string | null>(
    (state) => state.media.mediaToken,
  )

  const { t } = useTranslation()

  let activityRoute: string
  switch (reference.referenceLink.activity?.type) {
    case ActivityType.SPORTS_SPIRIT:
    case ActivityType.ACADEMIC_ART:
    case ActivityType.HOBBIES: {
      activityRoute = `extracurriculars`
      break
    }
    case ActivityType.INTERNSHIP:
    case ActivityType.EMPLOYMENT: {
      activityRoute = `professional`
      break
    }
    default: {
      activityRoute = `service`
      break
    }
  }

  return (
    <div className={classNames(Styles.container, className)}>
      <div className={Styles.profileContainer}>
        {reference.media && (
          <img
            className={Styles.avatar}
            src={`${process.env.REACT_APP_API_URL}/media/${reference.media.path}?eqmt=${mediaToken}`}
            alt=""
          />
        )}

        {!reference.media && (
          <div className={classNames([Styles.avatar, Styles.empty])}>
            <span className={Styles.initials}>
              {nameAbbreviation(`${reference.firstName} ${reference.lastName}`)}
            </span>
          </div>
        )}

        <div className={Styles.detailsContainer}>
          <span className={Styles.name}>
            {`${reference.firstName} ${reference.lastName}`}
          </span>

          <span className={Styles.position}>{reference.position}</span>

          <span className={Styles.classes}>{reference.organization}</span>
        </div>
      </div>

      <Button className={Styles.button} size={`sm`} onClick={onClick}>
        {t(`common:readReference`)}
      </Button>

      {reference.referenceLink.activity && (
        <HashLink
          className={Styles.seeRelevantExperience}
          to={`${id ? `/student/${id}` : ``}/${activityRoute}#activity-${
            reference.referenceLink.activity.id
          }`}
          role={`activityLink`}
        >
          {t(`common:seeRelevantExperience`)}
        </HashLink>
      )}
    </div>
  )
}

export default Reference

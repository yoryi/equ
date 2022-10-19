import * as mui from "@material-ui/core"
import classNames from "classnames"
import { MDBCard, MDBCardBody } from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { MATCH_LEVELS } from "../../const/matchLevels"
import { UniversityProfile } from "../../store/types"
import { formatMatchingScoreLabel } from "../../utils/matchingScore"
import { nameAbbreviation } from "../../utils/nameAbbreviation"
import Badge from "../Badge"
import Button from "../Button/Button"
import Styles from "./index.module.scss"

interface RecommendedUniversityBaseProps {
  className?: string
}

interface RecommendedUniversityProps {
  university: UniversityProfile
  onClick?: () => void
  loading?: undefined
}

interface LoadingRecommendedUniversityProps {
  university?: undefined
  onClick?: undefined
  loading: true
}

const RecommendedUniversity: React.FC<
  RecommendedUniversityBaseProps &
    (RecommendedUniversityProps | LoadingRecommendedUniversityProps)
> = ({ className, university, onClick, loading }) => {
  const { t } = useTranslation(`common`)

  const matchLevel =
    university &&
    MATCH_LEVELS.find(
      ({ min, max }) => university.score >= min && university.score < max,
    )

  return (
    <MDBCard className={classNames(Styles.card, className)}>
      <MDBCardBody className={Styles.container}>
        {!!matchLevel && !!university && (
          <div className={Styles.badgeContainer}>
            <Badge variant={matchLevel.color}>
              {formatMatchingScoreLabel(university.score, t)}
            </Badge>
          </div>
        )}

        {!loading && (
          <div className={Styles.profilePhoto}>
            <span>{nameAbbreviation(university?.name ?? ``, true)}</span>
          </div>
        )}
        {loading && <mui.Skeleton width={64} height={64} variant="circular" />}

        <div className={Styles.details}>
          {!loading && (
            <>
              <Link
                className={Styles.name}
                to={`/university/${university?.id}`}
              >
                {university?.name}
              </Link>
              <span
                className={`text-3`}
              >{`${university?.city}, ${university?.state}`}</span>
            </>
          )}
          {loading && (
            <>
              <h3 className={`mb-2 mb-md-0`}>
                <mui.Skeleton width={150} />
              </h3>
              <span>
                <mui.Skeleton width={200} />
              </span>
            </>
          )}
        </div>

        {!loading && (
          <Button className={Styles.button} size={`xs`} onClick={onClick}>
            {t(`follow`)}
          </Button>
        )}
        {loading && (
          <mui.Skeleton className={Styles.button} width={125} height={40} />
        )}
      </MDBCardBody>
    </MDBCard>
  )
}

export default RecommendedUniversity

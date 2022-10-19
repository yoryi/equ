import * as mui from "@material-ui/core"
import classNames from "classnames"
import * as React from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as Eye } from "../../assets/eye.svg"
import { Reference } from "../../store/types"
import Button from "../Button/Button"
import ProfilePhoto from "../ProfilePhoto"
import RoundButton from "../RoundButton"
import Styles from "./index.module.scss"

interface UnacceptedReferenceBaseProps {
  className?: string
}

interface UnacceptedReferenceProps {
  reference: Reference
  onClick?: () => void
  loading?: undefined
}

interface LoadingUnacceptedReferenceProps {
  reference?: undefined
  onClick?: undefined
  loading?: true
}

const UnacceptedReference: React.FC<
  UnacceptedReferenceBaseProps &
    (UnacceptedReferenceProps | LoadingUnacceptedReferenceProps)
> = ({ className, reference, onClick, loading }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(Styles.container, className)}>
      <div className={Styles.profileContainer}>
        {reference && <ProfilePhoto reference={reference} />}
        {loading && <ProfilePhoto loading />}

        <div
          className={classNames(
            Styles.detailsContainer,
            `d-flex flex-column mx-3`,
          )}
        >
          <h3 className={Styles.name}>
            {!loading && `${reference?.firstName} ${reference?.lastName}`}
            {loading && <mui.Skeleton width={200} />}
          </h3>

          <span className={Styles.position}>
            {!loading && reference?.position}
            {loading && <mui.Skeleton width={100} />}
          </span>

          <span className={Styles.classes}>
            {!loading && reference?.organization}
            {loading && <mui.Skeleton width={125} />}
          </span>
        </div>
      </div>

      <div className={Styles.buttonContainer}>
        {!loading && (
          <>
            <Button
              className={`d-none d-md-block`}
              size={`xs`}
              onClick={onClick}
            >
              {t(`notificationsScreen.review`)}
            </Button>

            <RoundButton
              variant={`blue`}
              className={`d-block d-md-none`}
              onClick={onClick}
            >
              <Eye />
            </RoundButton>
          </>
        )}

        {loading && <mui.Skeleton width={40} height={40} variant="circular" />}
      </div>
    </div>
  )
}

export default UnacceptedReference

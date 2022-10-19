//Components
import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
//Types
import {
  ReduxState,
  Role,
  UniversityAdmissionStats,
} from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface AdmissionStatsProps {
  stats: UniversityAdmissionStats | null | undefined
  onEdit?: () => void
}

const AdmissionStats: React.VFC<AdmissionStatsProps> = ({ stats, onEdit }) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  const { t } = useTranslation()

  if (
    !stats?.applications &&
    !stats?.accepted &&
    !stats?.enrolled &&
    !stats?.freshmanClassSize
  ) {
    return null
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.admissionStats`)}

          {isViewingOwnProfile && (
            <button
              className={
                `d-flex align-items-center bg-transparent border-0 outline-none p-0 px-1`
              }
              onClick={onEdit}
            >
              <Edit />
            </button>
          )}
        </MDBCardTitle>

        <MDBCardText className={Styles.cardText}>
          {stats.applications && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.applications`)}
              </span>
              <h5>{stats.applications.toLocaleString(`en-US`)}</h5>
            </div>
          )}

          {stats.accepted && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.accepted`)}
              </span>
              <h5>{stats.accepted.toLocaleString(`en-US`)}</h5>
            </div>
          )}

          {stats.enrolled && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.enrolled`)}
              </span>
              <h5>{`${stats.enrolled}%`}</h5>
            </div>
          )}

          {stats.freshmanClassSize && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.freshmanClassSize`)}
              </span>
              <h5>{stats.freshmanClassSize.toLocaleString(`en-US`)}</h5>
            </div>
          )}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default AdmissionStats

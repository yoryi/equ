//Components
import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
//Types
import {
  DemographicsStudentBody,
  ReduxState,
  Role,
} from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface StudentBodyProps {
  studentBody: DemographicsStudentBody | null | undefined
  onEdit?: () => void
}

const StudentBody: React.VFC<StudentBodyProps> = ({ studentBody, onEdit }) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  const { t } = useTranslation()

  if (!studentBody?.male && !studentBody?.female && !studentBody?.outUSA) {
    return null
  }

  return (
    <MDBCard className={`h-100`}>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.studentBody`)}

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
          {!!studentBody?.male && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.male`)}
              </span>
              <h5>{`${studentBody?.male}%`}</h5>
            </div>
          )}

          {!!studentBody?.female && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.female`)}
              </span>
              <h5>{`${studentBody?.female}%`}</h5>
            </div>
          )}

          {!!studentBody?.outUSA && (
            <>
              <div className={Styles.row}>
                <span className={`text-2`}>
                  {t(`profile.university.overviewScreen.fromStates`)}
                </span>
                <h5>{`${Math.round(100 - studentBody?.outUSA)}%`}</h5>
              </div>

              <div className={Styles.row}>
                <span className={`text-2`}>
                  {t(`profile.university.overviewScreen.outOfStates`)}
                </span>
                <h5>{`${Math.round(studentBody?.outUSA)}%`}</h5>
              </div>
            </>
          )}

          {!!studentBody.nonresAlien && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.nonResidents`)}
              </span>
              <h5>{`${Math.round(studentBody.nonresAlien)}%`}</h5>
            </div>
          )}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default StudentBody

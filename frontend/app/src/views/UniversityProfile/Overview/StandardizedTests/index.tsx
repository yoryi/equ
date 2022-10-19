//Components
import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
import ProgressBar from "../../../../components/ProgressBar"
//Types
import {
  ReduxState,
  Role,
  UniversityStandardizedTests,
} from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface StandardizedTestsProps {
  standardizedTests: UniversityStandardizedTests | null | undefined
  onEdit?: () => void
}

const StandardizedTests: React.VFC<StandardizedTestsProps> = ({
  standardizedTests,
  onEdit,
}) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  const { t } = useTranslation()

  if (
    !standardizedTests?.averageSAT &&
    !standardizedTests?.averageACT &&
    !standardizedTests?.averageGPA
  ) {
    return null
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.testScoresAndGpa`)}

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

        <MDBCardText>
          {(!!standardizedTests.scoreSAT.length ||
            standardizedTests.averageSAT) && (
            <ProgressBar
              className={Styles.progressBar}
              title={t(`common:sat`)}
              value={
                !!standardizedTests.scoreSAT[0] &&
                !!standardizedTests.scoreSAT[2]
                  ? (standardizedTests.scoreSAT as [number, number, number])
                  : (standardizedTests.averageSAT as number)
              }
              max={1600}
            />
          )}

          {((!!standardizedTests.scoreACT[0] &&
            !!standardizedTests.scoreACT[2]) ||
            standardizedTests.averageACT) && (
            <ProgressBar
              className={Styles.progressBar}
              title={t(`common:act`)}
              value={
                !!standardizedTests.scoreACT[0] &&
                !!standardizedTests.scoreACT[2]
                  ? (standardizedTests.scoreACT as [
                      number,
                      number | null,
                      number,
                    ])
                  : (standardizedTests.averageACT as number)
              }
              max={36}
            />
          )}

          {standardizedTests.averageGPA && (
            <ProgressBar
              className={Styles.progressBar}
              title={t(
                `profile.university.overviewScreen.averageGPAUnweighted`,
              )}
              value={standardizedTests?.averageGPA}
              max={4}
            />
          )}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default StandardizedTests

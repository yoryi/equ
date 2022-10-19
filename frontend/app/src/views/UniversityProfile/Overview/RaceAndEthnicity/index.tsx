//Utils
import _ from "lodash"
//Components
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
import ProgressBar from "../../../../components/ProgressBar"
//Types
import {
  DemographicsRaceAndEthnicity,
  ReduxState,
  Role,
} from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface RaceAndEthnicityProps {
  raceAndEthnicity: DemographicsRaceAndEthnicity | null | undefined
  onEdit?: () => void
}

const RaceAndEthnicity: React.VFC<RaceAndEthnicityProps> = ({
  raceAndEthnicity,
  onEdit,
}) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  const { t } = useTranslation()

  const stats = [
    {
      title: t(`profile.university.overviewScreen.white`),
      value: raceAndEthnicity?.white ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.nonResidentAlien`),
      value: raceAndEthnicity?.nonResident ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.hispanic`),
      value: raceAndEthnicity?.hispanic ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.asian`),
      value: raceAndEthnicity?.asian ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.black`),
      value: raceAndEthnicity?.black ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.twoOrMoreRaces`),
      value: raceAndEthnicity?.multiRace ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.unknown`),
      value: raceAndEthnicity?.unknown ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.nativeHawaiian`),
      value: raceAndEthnicity?.hawaiian ?? 0,
    },
    {
      title: t(`profile.university.overviewScreen.americanIndian`),
      value: raceAndEthnicity?.native ?? 0,
    },
  ].filter(({ value }) => value > 0)

  if (!stats.length) {
    return null
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.raceAndEthnicity`)}

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
          <MDBRow>
            {_.chunk<{ title: string; value: number }>(
              stats.sort((a, b) => b.value - a.value),
              Math.ceil(stats.length / 2),
            ).map((chunk) => (
              <MDBCol md={`12`} lg={`6`} className={`mt-4 mt-lg-0`}>
                {chunk.map(({ title, value }) => (
                  <ProgressBar
                    className={Styles.progressBar}
                    title={title}
                    value={value / 100}
                    max={1}
                    percentage
                  />
                ))}
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default RaceAndEthnicity

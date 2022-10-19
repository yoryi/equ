import * as mui from "@material-ui/core"
import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
import { useLayoutEffect,useState } from "react"
import { Trans,useTranslation  } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

import UniversityEditModal from "../../../components/UniversityEditModal"
import { ReduxState, Role,University } from "../../../store/types"
import { areStatsPresent } from "../../../utils/stats"
import About from "./About"
import AcceptanceRate from "./AcceptanceRate"
import AdmissionStats from "./AdmissionStats"
import GraduationRate from "./GraduationRate"
import Styles from "./index.module.scss"
import Map from "./Map"
import RaceAndEthnicity from "./RaceAndEthnicity"
import SocioEconomicDiversity from "./SocioEconomicDiversity"
import StandardizedTests from "./StandardizedTests"
import StudentBody from "./StudentBody"

interface OverviewProps {
  onClaimSchool?: () => void
}

const Overview: React.VFC<OverviewProps> = ({ onClaimSchool }) => {
  const params = useParams<{ id: string | undefined }>()
  const id = params.id ? parseInt(params.id) : undefined

  const university = useSelector<ReduxState, University | null>(
    (state) => state.university[id ? `university` : `profile`],
  )
  const role = useSelector<ReduxState, Role | null>(
    (state) => state.auth.user?.role ?? null,
  )

  const [isEditModalVisible, setEditModalVisible] = useState(false)

  useLayoutEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: `auto`,
    })
  }, [])

  const { t } = useTranslation()

  return (
    <>
      <div className={Styles.backgroundContainer}>
        <div className={Styles.container}>
          <section>
            <h2>{t(`profile.university.overviewScreen.overview`)}</h2>

            <MDBRow className={Styles.row}>
              <MDBCol md={`12`} lg={`6`}>
                {university && (
                  <About
                    about={university.about}
                    onEdit={() => setEditModalVisible(true)}
                  />
                )}

                {!university && <mui.Skeleton width={`100%`} height={325} />}
              </MDBCol>

              <MDBCol md={`12`} lg={`6`} className={Styles.map}>
                {university && (
                  <Map
                    name={university.name}
                    location={university.about.location}
                  />
                )}

                {!university && <mui.Skeleton width={`100%`} height={325} />}
              </MDBCol>
            </MDBRow>
          </section>

          {(!university || areStatsPresent(university?.admissions)) && (
            <section>
              <h2>{t(`profile.university.overviewScreen.admissions`)}</h2>

              <MDBRow className={Styles.row}>
                {(!university ||
                  !!university.admissions.stats.applications ||
                  !!university.admissions.stats.accepted ||
                  !!university.admissions.stats.enrolled ||
                  !!university.admissions.stats.freshmanClassSize) && (
                  <MDBCol md={`12`} lg={`6`}>
                    {university && (
                      <AdmissionStats
                        stats={university.admissions.stats}
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={250} />
                    )}
                  </MDBCol>
                )}
              </MDBRow>

              <MDBRow className={Styles.row}>
                {(!university || !!university.admissions.acceptanceRate) && (
                  <MDBCol md={`12`} lg={`6`}>
                    {university && (
                      <AcceptanceRate
                        acceptanceRate={university.admissions.acceptanceRate}
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={300} />
                    )}
                  </MDBCol>
                )}

                {(!university || !!university.admissions.graduationRate) && (
                  <MDBCol md={`12`} lg={`6`}>
                    {university && (
                      <GraduationRate
                        graduationRate={university?.admissions.graduationRate}
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={300} />
                    )}
                  </MDBCol>
                )}
              </MDBRow>

              <MDBRow className={Styles.row}>
                {(!university ||
                  !!university.admissions.standardizedTests.averageSAT ||
                  !!university.admissions.standardizedTests.averageACT ||
                  !!university.admissions.standardizedTests.averageGPA) && (
                  <MDBCol md={`12`} lg={`12`}>
                    {university && (
                      <StandardizedTests
                        standardizedTests={
                          university?.admissions.standardizedTests
                        }
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={300} />
                    )}
                  </MDBCol>
                )}
              </MDBRow>
            </section>
          )}

          {(!university || areStatsPresent(university?.demographics)) && (
            <section>
              <h2>{t(`profile.university.overviewScreen.demographics`)}</h2>

              <MDBRow className={Styles.row}>
                {(!university ||
                  !!university.demographics.studentBody.male ||
                  !!university.demographics.studentBody.female ||
                  !!university.demographics.studentBody.outUSA) && (
                  <MDBCol md={`12`} lg={`6`}>
                    {university && (
                      <StudentBody
                        studentBody={university.demographics.studentBody}
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={300} />
                    )}
                  </MDBCol>
                )}

                {(!university ||
                  !!university.demographics.socioEconomicDiversity) && (
                  <MDBCol md={`12`} lg={`6`}>
                    {university && (
                      <SocioEconomicDiversity
                        socioEconomicDiversity={
                          university.demographics.socioEconomicDiversity
                        }
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={300} />
                    )}
                  </MDBCol>
                )}
              </MDBRow>

              <MDBRow className={Styles.row}>
                {(!university ||
                  !!university.demographics.raceAndEthnicity) && (
                  <MDBCol md={`12`} lg={`12`}>
                    {university && (
                      <RaceAndEthnicity
                        raceAndEthnicity={
                          university.demographics.raceAndEthnicity
                        }
                        onEdit={() => setEditModalVisible(true)}
                      />
                    )}

                    {!university && (
                      <mui.Skeleton width={`100%`} height={400} />
                    )}
                  </MDBCol>
                )}
              </MDBRow>
            </section>
          )}

          {role !== Role.Student && (
            <span className={`mt-4 text-4`}>
              <Trans
                i18nKey={
                  `screens:profile.university.overviewScreen.reportProblem`
                }
                components={[
                  <a
                    href={`#`}
                    role={`button`}
                    onClick={() => onClaimSchool?.()}
                  />,
                ]}
              />
            </span>
          )}
        </div>
      </div>

      <UniversityEditModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </>
  )
}

export default Overview

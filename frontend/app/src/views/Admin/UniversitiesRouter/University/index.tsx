//Utils
import classNames from "classnames"
import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,useParams } from "react-router"
//Components
import { Link } from "react-router-dom"

import { ReactComponent as ChevronLeft } from "../../../../assets/chevron-left.svg"
import AssignUniversityModal from "../../../../components/AssingUniversityModal"
import Button from "../../../../components/Button/Button"
import MessageModal from "../../../../components/MessageModal"
import DeleteModal from "../../../../components/Modal/DeleteModal"
import UniversityAdministratorForm from "../../../../components/UniversityAdministratorForm"
import UniversityContactForm from "../../../../components/UniversityContactForm"
import useLoader from "../../../../hooks/useLoader"
//Actions
import * as actions from "../../../../store/actions"
//Types
import { ReduxState, UniversityAdminData } from "../../../../store/types"
import About from "../../../UniversityProfile/Overview/About"
import AcceptanceRate from "../../../UniversityProfile/Overview/AcceptanceRate"
import AdmissionStats from "../../../UniversityProfile/Overview/AdmissionStats"
import GraduationRate from "../../../UniversityProfile/Overview/GraduationRate"
import Map from "../../../UniversityProfile/Overview/Map"
import RaceAndEthnicity from "../../../UniversityProfile/Overview/RaceAndEthnicity"
import SocioEconomicDiversity from "../../../UniversityProfile/Overview/SocioEconomicDiversity"
import StandardizedTests from "../../../UniversityProfile/Overview/StandardizedTests"
import StudentBody from "../../../UniversityProfile/Overview/StudentBody"
//Styles
import Styles from "./index.module.scss"

const UniversityView: React.VFC = () => {
  const id = parseInt(useParams<{ id: string }>().id)
  const history = useHistory()

  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )
  const university = useSelector<ReduxState, UniversityAdminData | null>(
    (state) => state.admin.university,
  )
  const dispatch = useDispatch()

  const [isAssignModalVisible, setAssignModalVisible] = useState(false)
  const [isUnassignModalVisible, setUnassignModalVisible] = useState(false)
  const [successModal, setSuccessModal] = useState<{
    message: string
    visible: boolean
  }>({
    message: ``,
    visible: false,
  })
  const [isCopyMessageVisible, setCopyMessageVisible] = useState(false)

  const { onLoadComplete } = useLoader()

  const handleUnassign = async () => {
    setUnassignModalVisible(false)
    try {
      await dispatch(actions.unassignUniversityProfile())
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setSuccessModal({
      message: t(`university.profileHasBeenSuccessfullyUnassigned`),
      visible: true,
    })
  }

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText(
      university?.universityAdministrator?.email ?? university?.email ?? ``,
    )
    setCopyMessageVisible(false)
    setTimeout(() => setCopyMessageVisible(true), 0)
  }

  const handlePasswordReset = async () => {
    try {
      await dispatch(
        actions.resetUniversityPassword({
          email: university!.universityAdministrator!.email,
        }),
      )
      setSuccessModal({
        message: t(`university.passwordResetSuccessfullyRequested`),
        visible: true,
      })
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (!isTokenLoaded || university?.id === id) {
      return
    }

    dispatch(actions.getUniversityAdminData(id))
  }, [dispatch, isTokenLoaded, university, id])

  useEffect(() => {
    if (university?.id !== id) {
      return
    }

    onLoadComplete()
  }, [university, id, onLoadComplete])

  return (
    <>
      <div>
        <div className={`mb-4`}>
          <Link className={Styles.link} to={`/admin/universities`}>
            <ChevronLeft className={`mr-2`} />
            {t(`university.backToUniversityList`)}
          </Link>
        </div>

        <h1>{university?.name}</h1>

        <MDBRow className={classNames(Styles.buttons, `mt-5 mb-n2`)} start>
          <MDBCol className={`my-4`} size={`4`}>
            {!university?.universityAdministrator && (
              <Button size={`auto`} onClick={() => setAssignModalVisible(true)}>
                {t(`university.assignProfile`)}
              </Button>
            )}

            {university?.universityAdministrator && (
              <Button
                size={`auto`}
                onClick={() => setUnassignModalVisible(true)}
              >
                {t(`university.unassignProfile`)}
              </Button>
            )}
          </MDBCol>

          <MDBCol className={`my-4`} size={`4`}>
            <Button
              size={`auto`}
              to={`/university/${university?.id}`}
              target={`_blank`}
            >
              {t(`university.viewProfile`)}
            </Button>
          </MDBCol>

          <MDBCol className={`my-4`} size={`4`}>
            <div className={`position-relative`}>
              <Button size={`auto`} onClick={handleEmailCopy}>
                {t(`university.emailUniversity`)}
              </Button>

              {isCopyMessageVisible && (
                <span className={classNames(Styles.copyMessage)}>
                  {t(`common:emailCopied`)}
                </span>
              )}
            </div>
          </MDBCol>

          <MDBCol className={`my-4`} size={`4`}>
            <Button
              size={`auto`}
              onClick={() =>
                history.push(`/university/${university?.id}/spirit`)
              }
            >
              {t(`university.reviewPosts`)}
            </Button>
          </MDBCol>

          <MDBCol className={`my-4`} size={`4`}>
            <Button
              size={`auto`}
              onClick={() => dispatch(actions.toggleUniversityVisibility())}
            >
              {t(
                `university.${
                  university?.isVisible ? `hideUniversity` : `showUniversity`
                }`,
              )}
            </Button>
          </MDBCol>

          {university?.universityAdministrator?.email && (
            <MDBCol className={`my-4`} size={`4`}>
              <Button size={`auto`} onClick={handlePasswordReset}>
                {t(`university.resetPassword`)}
              </Button>
            </MDBCol>
          )}
        </MDBRow>

        <section className={`mt-5`}>
          <h3>{t(`university.universityContact`)}</h3>

          <UniversityContactForm
            onSubmit={() =>
              setSuccessModal({
                message: t(
                  `university.universityAdministratorUpdatedSuccessfully`,
                ),
                visible: true,
              })
            }
          />
        </section>

        {university?.universityAdministrator && (
          <section className={`mt-5`}>
            <h3>{t(`university.profileClaimedBy`)}</h3>

            <UniversityAdministratorForm
              onSubmit={() =>
                setSuccessModal({
                  message: t(
                    `university.universityAdministratorUpdatedSuccessfully`,
                  ),
                  visible: true,
                })
              }
            />
          </section>
        )}

        <section className={`mt-5`}>
          <h3>{t(`university.overview`)}</h3>

          <MDBRow className={`mt-4`}>
            <MDBCol md={`12`} lg={`6`}>
              <About about={university?.about} />
            </MDBCol>

            <MDBCol md={`12`} lg={`6`} className={Styles.map}>
              <Map
                name={university?.name}
                location={university?.about.location}
              />
            </MDBCol>
          </MDBRow>
        </section>

        <section className={`mt-5`}>
          <h3>{t(`university.admissions`)}</h3>

          <MDBRow className={`mt-4`}>
            <MDBCol md={`12`} lg={`6`}>
              <AdmissionStats stats={university?.admissions.stats} />
            </MDBCol>
          </MDBRow>

          <MDBRow className={`mt-3`}>
            <MDBCol md={`12`} lg={`6`}>
              <AcceptanceRate
                acceptanceRate={university?.admissions.acceptanceRate}
              />
            </MDBCol>

            <MDBCol md={`12`} lg={`6`}>
              <GraduationRate
                graduationRate={university?.admissions.graduationRate}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className={`mt-3`}>
            <MDBCol md={`12`} lg={`12`}>
              <StandardizedTests
                standardizedTests={university?.admissions.standardizedTests}
              />
            </MDBCol>
          </MDBRow>
        </section>

        <section className={`mt-5`}>
          <h3>{t(`university.demographics`)}</h3>

          <MDBRow className={`mt-4`}>
            <MDBCol md={`12`} lg={`6`}>
              <StudentBody studentBody={university?.demographics.studentBody} />
            </MDBCol>

            <MDBCol md={`12`} lg={`6`}>
              <SocioEconomicDiversity
                socioEconomicDiversity={
                  university?.demographics.socioEconomicDiversity
                }
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className={`mt-3`}>
            <MDBCol md={`12`} lg={`12`}>
              <RaceAndEthnicity
                raceAndEthnicity={university?.demographics.raceAndEthnicity}
              />
            </MDBCol>
          </MDBRow>
        </section>
      </div>

      <AssignUniversityModal
        visible={isAssignModalVisible}
        onClose={() => setAssignModalVisible(false)}
      />

      <DeleteModal
        title={t(`university.unassignProfile`)}
        message={t(`university.unassignUniversityConfirmation`, { university })}
        buttonLabel={t(`university.unassign`)}
        isOpen={isUnassignModalVisible}
        toggle={() => setUnassignModalVisible(false)}
        footerAction={handleUnassign}
      />

      <MessageModal
        title={t(`common:success`)}
        message={successModal.message}
        visible={successModal.visible}
        onClose={() => setSuccessModal({ ...successModal, visible: false })}
      />
    </>
  )
}

export default UniversityView

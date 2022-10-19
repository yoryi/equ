//Utils
import classNames from "classnames"
//Components
import { MDBCard, MDBCardBody, MDBCardText,MDBCardTitle } from "mdbreact"
import * as React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useSelector } from "react-redux"

import { ReactComponent as Edit } from "../../../../assets/edit.svg"
//Types
import {
  AboutUniversity,
  InstitutionType,
  ReduxState,
  Role,
  StudentBody,
} from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface AboutProps {
  about: AboutUniversity | null | undefined
  onEdit?: () => void
}

const About: React.VFC<AboutProps> = ({ about, onEdit }) => {
  const isViewingOwnProfile = useSelector<ReduxState, boolean>(
    (state) => state.auth.user?.role === Role.University,
  )

  const { t } = useTranslation()

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          {t(`profile.university.overviewScreen.aboutSchool`)}

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
          <div className={Styles.row}>
            <span className={`text-2`}>
              {t(`profile.university.overviewScreen.schoolSize`)}
            </span>
            <h5>{about?.size?.toLocaleString(`en-US`)}</h5>
          </div>

          {about && (
            <>
              <div className={Styles.row}>
                <span className={`text-2`}>
                  {t(`profile.university.overviewScreen.institutionType`)}
                </span>
                <h5 className={classNames(Styles.ellipsis, `text-right`)}>
                  {t(
                    `common:institutionType.${
                      InstitutionType[about.institutionType]
                    }`,
                  )}
                </h5>
              </div>

              <div className={Styles.row}>
                <span className={`text-2`}>
                  {t(`profile.university.overviewScreen.mainStudentBody`)}
                </span>
                <h5>
                  {t(
                    `common:studentBody.${StudentBody[about.mainStudentBody]}`,
                  )}
                </h5>
              </div>
            </>
          )}

          <div className={Styles.row}>
            <span className={`text-2`}>
              {t(`profile.university.overviewScreen.onCampusHousing`)}
            </span>
            <h5>{t(`common:${about?.onCampusHousing ? `yes` : `no`}`)}</h5>
          </div>

          {about?.campusSetting && (
            <div className={Styles.row}>
              <span className={`text-2`}>
                {t(`profile.university.overviewScreen.campusSetting`)}
              </span>
              <h5>
                {t(`common:campusSetting.${about.campusSetting.toLowerCase()}`)}
              </h5>
            </div>
          )}

          <div className={Styles.row}>
            <span className={`text-2`}>
              {t(`profile.university.overviewScreen.location`)}
            </span>
            <h5>{`${about?.location.city}, ${about?.location.stateCode}`}</h5>
          </div>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default About

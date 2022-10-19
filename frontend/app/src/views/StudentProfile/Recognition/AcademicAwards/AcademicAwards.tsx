import moment from "moment"
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import { ReactComponent as Plus } from "../../../../assets/plus.svg"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
//Components
import IconBox from "../../../../components/IconBox"
import { actions } from "../../../../store"
import { AwardType,ProfileRecognition } from "../../../../store/types/profile"
import { AddAwardModal } from "../AddAwardModal"
import { AwardsModal } from "../AwardsModal"

interface AcademicAwardsProps {
  recognition: ProfileRecognition | null
}

export const AcademicAwards: React.FC<AcademicAwardsProps> = ({
  recognition,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isAcademicAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isAddAcademicAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isEditAcademicAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )

  if (!recognition?.academicAwards?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>{t(`profile.student.recognitionScreen.academicAwards`)}</div>

        {!!recognition?.academicAwards?.length && isViewingOwnProfile && (
          <IconBox
            icon={Plus}
            variant={`dark`}
            onClick={() => dispatch(actions.toggleAddAcademicAwardsModal(true))}
            tag={`button`}
            shadow
          />
        )}
      </div>

      <div className="awards">
        {!!recognition?.academicAwards?.length && (
          <Card
            body={
              recognition.academicAwards &&
              recognition.academicAwards.length > 0 &&
              recognition.academicAwards
                .sort((a: any, b: any) => {
                  return a.order - b.order
                })
                .map((academicAward: any) => (
                  <div className="awards-table-row">
                    <div className="awards-table-name">
                      {academicAward.name}
                    </div>
                    <div className="awards-table-organisation">
                      {academicAward.organisation}
                    </div>
                    <div className="awards-table-date">
                      {academicAward.date
                        ? moment(academicAward.date).format(`MMMM YYYY`)
                        : ``}
                    </div>
                  </div>
                ))
            }
            toggleModal={() =>
              dispatch(actions.toggleAcademicAwardsModal(true))
            }
            hideEditIcon={!isViewingOwnProfile}
          />
        )}

        {!recognition?.academicAwards?.length && isViewingOwnProfile && (
          <EmptyExperience
            title={t(`profile.student.recognitionScreen.academicAwards`)}
            toggleModal={() =>
              dispatch(actions.toggleAddAcademicAwardsModal(true))
            }
          />
        )}

        {isAcademicAwardsModalOpen && !!recognition?.academicAwards?.length ? (
          <AwardsModal
            isOpen={
              isAcademicAwardsModalOpen && !!recognition?.academicAwards?.length
            }
            toggle={() => dispatch(actions.toggleAcademicAwardsModal(false))}
            toggleAddModal={() =>
              dispatch(actions.toggleAddAcademicAwardsModal(true))
            }
            awards={recognition?.academicAwards ?? []}
            type={AwardType.Academic}
            toggleEditModal={actions.toggleEditAcademicAwardsModal}
            isEditModalOpen={isEditAcademicAwardsModalOpen}
          />
        ) : null}

        {isAddAcademicAwardsModalOpen ? (
          <AddAwardModal
            isOpen={isAddAcademicAwardsModalOpen}
            toggle={() => dispatch(actions.toggleAddAcademicAwardsModal(false))}
            type={AwardType.Academic}
          />
        ) : null}
      </div>
    </div>
  )
}

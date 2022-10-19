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

interface SchoolarshipAwardsProps {
  recognition: ProfileRecognition | null
}

export const SchoolarshipAwards: React.FC<SchoolarshipAwardsProps> = ({
  recognition,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isSchoolarshipAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isAddSchoolarshipAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isEditSchoolarshipAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )

  if (!recognition?.scholarshipAwards?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    recognition && (
      <div className="student-profile-tab-item">
        <div className="student-profile-tab-item-title">
          <div>{t(`profile.student.recognitionScreen.scholarshipAwards`)}</div>

          {!!recognition?.scholarshipAwards?.length && isViewingOwnProfile && (
            <IconBox
              icon={Plus}
              variant={`dark`}
              onClick={() =>
                dispatch(actions.toggleAddSchoolarshipAwardsModal(true))
              }
              tag={`button`}
              shadow
            />
          )}
        </div>

        <div className="awards">
          {!!recognition?.scholarshipAwards?.length && (
            <Card
              body={recognition?.scholarshipAwards
                ?.sort((a: any, b: any) => {
                  return a.order - b.order
                })
                .map((scholarshipAward: any) => (
                  <div className="awards-table-row">
                    <div className="awards-table-name">
                      {scholarshipAward.name}
                    </div>
                    <div className="awards-table-organisation">
                      {scholarshipAward.organisation}
                    </div>
                    <div className="awards-table-date">
                      {scholarshipAward.date
                        ? moment(scholarshipAward.date).format(`MMMM YYYY`)
                        : ``}
                    </div>
                  </div>
                ))}
              toggleModal={() =>
                dispatch(actions.toggleSchoolarshipAwardsModal(true))
              }
              hideEditIcon={!isViewingOwnProfile}
            />
          )}

          {!recognition?.scholarshipAwards?.length && isViewingOwnProfile && (
            <EmptyExperience
              title={t(`profile.student.recognitionScreen.scholarshipAwards`)}
              toggleModal={() =>
                dispatch(actions.toggleAddSchoolarshipAwardsModal(true))
              }
            />
          )}

          {isSchoolarshipAwardsModalOpen &&
          !!recognition?.scholarshipAwards?.length ? (
            <AwardsModal
              isOpen={
                isSchoolarshipAwardsModalOpen &&
                !!recognition?.scholarshipAwards?.length
              }
              toggle={() =>
                dispatch(actions.toggleSchoolarshipAwardsModal(false))
              }
              toggleAddModal={() =>
                dispatch(actions.toggleAddSchoolarshipAwardsModal(true))
              }
              awards={recognition?.scholarshipAwards ?? []}
              type={AwardType.Scholarship}
              toggleEditModal={actions.toggleEditSchoolarshipAwardsModal}
              isEditModalOpen={isEditSchoolarshipAwardsModalOpen}
            />
          ) : null}

          {isAddSchoolarshipAwardsModalOpen ? (
            <AddAwardModal
              isOpen={isAddSchoolarshipAwardsModalOpen}
              toggle={() =>
                dispatch(actions.toggleAddSchoolarshipAwardsModal(false))
              }
              type={AwardType.Scholarship}
            />
          ) : null}
        </div>
      </div>
    )
  )
}

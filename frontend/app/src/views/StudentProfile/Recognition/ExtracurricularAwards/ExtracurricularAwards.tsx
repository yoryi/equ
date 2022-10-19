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

interface ExtracurricularAwardsProps {
  recognition: ProfileRecognition | null
}

export const ExtracurricularAwards: React.FC<ExtracurricularAwardsProps> = ({
  recognition,
}) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isExtracirricularAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isAddExtracirricularAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )
  const { isEditExtracirricularAwardsModalOpen } = useSelector((state: any) =>
    state.profile.recognition ? state.profile.recognition : false,
  )

  if (!recognition?.extracurricularsAwards?.length && !isViewingOwnProfile) {
    return null
  }

  return (
    <div className="student-profile-tab-item">
      <div className="student-profile-tab-item-title">
        <div>
          {t(`profile.student.recognitionScreen.extracurricularsAwards`)}
        </div>

        {!!recognition?.extracurricularsAwards?.length &&
          isViewingOwnProfile && (
            <IconBox
              icon={Plus}
              variant={`dark`}
              onClick={() =>
                dispatch(actions.toggleAddExtracurricularsAwardsModal(true))
              }
              tag={`button`}
              shadow
            />
          )}
      </div>

      <div className="awards">
        {!!recognition?.extracurricularsAwards?.length && (
          <Card
            body={
              recognition.extracurricularsAwards &&
              recognition.extracurricularsAwards.length > 0 &&
              recognition.extracurricularsAwards
                .sort((a: any, b: any) => {
                  return a.order - b.order
                })
                .map((extracurricularsAward: any) => (
                  <div className="awards-table-row">
                    <div className="awards-table-name">
                      {extracurricularsAward.name}
                    </div>
                    <div className="awards-table-organisation">
                      {extracurricularsAward.organisation}
                    </div>
                    <div className="awards-table-date">
                      {extracurricularsAward.date
                        ? moment(extracurricularsAward.date).format(`MMMM YYYY`)
                        : ``}
                    </div>
                  </div>
                ))
            }
            toggleModal={() =>
              dispatch(actions.toggleExtracurricularsAwardsModal(true))
            }
            hideEditIcon={!isViewingOwnProfile}
          />
        )}

        {!recognition?.extracurricularsAwards?.length &&
          isViewingOwnProfile && (
            <EmptyExperience
              title={t(
                `profile.student.recognitionScreen.extracurricularsAwards`,
              )}
              toggleModal={() =>
                dispatch(actions.toggleAddExtracurricularsAwardsModal(true))
              }
            />
          )}

        {isExtracirricularAwardsModalOpen &&
        !!recognition?.extracurricularsAwards?.length ? (
          <AwardsModal
            isOpen={
              isExtracirricularAwardsModalOpen &&
              !!recognition?.extracurricularsAwards?.length
            }
            toggle={() =>
              dispatch(actions.toggleExtracurricularsAwardsModal(false))
            }
            toggleAddModal={() =>
              dispatch(actions.toggleAddExtracurricularsAwardsModal(true))
            }
            awards={recognition?.extracurricularsAwards ?? []}
            type={AwardType.Extracurriculars}
            toggleEditModal={actions.toggleEditExtracurricularsAwardsModal}
            isEditModalOpen={isEditExtracirricularAwardsModalOpen}
          />
        ) : null}

        {isAddExtracirricularAwardsModalOpen ? (
          <AddAwardModal
            isOpen={isAddExtracirricularAwardsModalOpen}
            toggle={() =>
              dispatch(actions.toggleAddExtracurricularsAwardsModal(false))
            }
            type={AwardType.Extracurriculars}
          />
        ) : null}
      </div>
    </div>
  )
}

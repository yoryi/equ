import moment from "moment"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import HiperLinkIcon from "../../../../assets/Icon-Attach.svg"
import { ReactComponent as Plus } from "../../../../assets/plus.svg"
import Card from "../../../../components/Card/Card"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
import IconBox from "../../../../components/IconBox"
import JourneyModal from "../../../../components/JourneyModal"
//Components
import ReferenceModal from "../../../../components/ReferenceModal"
import { actions } from "../../../../store"
//Types
import { ReduxState, Reference } from "../../../../store/types"
import {
  ActivityType,
  ProfileExtracurriculars,
} from "../../../../store/types/profile"
import { ActivityMedia } from "../../../Activity/ActivityMedia"
import { CreateActivityModal } from "../../../Activity/CreateActivityModal"
import { EditActivityModal } from "../../../Activity/EditActivityModal"

interface HobbiesProps {
  extracurriculars: ProfileExtracurriculars | null
}

export const Hobbies: React.FC<HobbiesProps> = ({ extracurriculars }) => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const { activityModalOpen, editActivityModalOpen } = useSelector(
    (state: any) => state.profile,
  )
  const references = useSelector<ReduxState, Reference[] | null>(
    (state) =>
      (isViewingOwnProfile
        ? state.profile.recognition?.references
        : state.student.activityReferences) ?? null,
  )
  const dispatch = useDispatch()

  const [isJourneyModalOpen, toggleJourneyModal] = useState(0)
  const [referenceModal, setReferenceModal] = useState<{
    reference: Reference | null
    visible: boolean
  }>({
    reference: null,
    visible: false,
  })

  const { t } = useTranslation()

  if (!extracurriculars?.hobbies.length && !isViewingOwnProfile) {
    return null
  }

  return (
    extracurriculars && (
      <div className="student-profile-tab-item hobbies">
        <div className="student-profile-tab-item-title">
          <div>{t(`profile.student.extracurricularsScreen.hobbies`)}</div>

          {!!extracurriculars?.hobbies?.length && isViewingOwnProfile && (
            <IconBox
              icon={Plus}
              variant={`dark`}
              onClick={() =>
                dispatch(actions.toggleAddActivityModal(ActivityType.HOBBIES))
              }
              tag={`button`}
              shadow
            />
          )}
        </div>
        {!!extracurriculars?.hobbies?.length &&
          extracurriculars.hobbies.map((item) => {
            const reference =
              references?.find(
                ({ referenceLink: { id } }) => id === item.referenceLink?.id,
              ) ?? null

            return (
              <>
                <Card
                  body={
                    <>
                      <div style={{ whiteSpace: `pre-wrap` }}>
                        {item.description}
                      </div>
                      <div className="card-attached">
                        {item.attachments?.map((attachment) => (
                          <div
                            className="card-attached-item"
                            key={attachment.name}
                          >
                            <img
                              src={HiperLinkIcon}
                              alt="hiperlink-icon"
                              onClick={console.log}
                            />
                            {attachment.name.length > 20 ? (
                              <div>
                                <span>
                                  {attachment.name.substring(0, 12)}...
                                </span>
                                <span>
                                  {attachment.name.substr(
                                    attachment.name.length - 7,
                                  )}
                                </span>
                              </div>
                            ) : (
                              <div>{attachment.name}</div>
                            )}
                          </div>
                        ))}
                      </div>
                      {item.journeys && item.journeys.length > 0 && (
                        <div
                          style={{
                            display: `flex`,
                            justifyContent: `center`,
                          }}
                          onClick={() => toggleJourneyModal(item.id)}
                        >
                          <ActivityMedia
                            path={
                              item.journeys.sort((a: any, b: any) => {
                                return a.order - b.order
                              })[0].media.path
                            }
                            className="card-body-image"
                          />
                        </div>
                      )}
                    </>
                  }
                  title={
                    <div className="activity-main-info">
                      {item.logo && (
                        <ActivityMedia
                          path={item.logo.path}
                          className="card-body-image"
                        />
                      )}
                      <div className="activity-data-container">
                        <div className="activity-title">{item.title}</div>
                        {item.company && (
                          <div className="activity-company">{item.company}</div>
                        )}
                        {item.startDate && (
                          <div className="activity-date">{`${
                            moment(item.startDate).month() === 0
                              ? Number(moment(item.startDate).format(`YYYY`)) -
                                1
                              : moment(item.startDate).format(`YYYY`)
                          } - ${
                            item.endDate
                              ? moment(item.endDate).month() === 0
                                ? Number(moment(item.endDate).format(`YYYY`)) -
                                  1
                                : moment(item.endDate).format(`YYYY`)
                              : t(`common:present`).toLocaleLowerCase()
                          }`}</div>
                        )}
                      </div>
                    </div>
                  }
                  toggleModal={() =>
                    dispatch(actions.toggleEditActivityModal(item.id))
                  }
                  footer={!!reference ? t(`common:readReference`) : ``}
                  toggleFooterModal={() =>
                    setReferenceModal({ reference, visible: true })
                  }
                  className="activity-card"
                  hideEditIcon={!isViewingOwnProfile}
                />

                {editActivityModalOpen === item.id ? (
                  <EditActivityModal
                    activity={item}
                    isOpen={editActivityModalOpen === item.id}
                    toggle={() => dispatch(actions.toggleEditActivityModal(0))}
                    title={t(`profile.student.extracurricularsScreen.hobbies`)}
                  />
                ) : null}

                {item?.journeys &&
                  item.id === isJourneyModalOpen &&
                  !!isJourneyModalOpen && (
                    <JourneyModal
                      visible={item.id === isJourneyModalOpen}
                      onClose={() => {
                        toggleJourneyModal(0)
                        document.body.className = ``
                      }}
                      activity={item}
                      editable={isViewingOwnProfile}
                    />
                  )}
              </>
            )
          })}

        {!extracurriculars?.hobbies.length && isViewingOwnProfile && (
          <EmptyExperience
            title={t(`profile.student.extracurricularsScreen.hobbies`)}
            toggleModal={() =>
              dispatch(actions.toggleAddActivityModal(ActivityType.HOBBIES))
            }
          />
        )}

        <CreateActivityModal
          isOpen={activityModalOpen}
          toggle={() => dispatch(actions.toggleAddActivityModal(``))}
          title={t(`profile.student.extracurricularsScreen.hobbies`)}
          type={ActivityType.HOBBIES}
        />

        <ReferenceModal
          reference={referenceModal.reference}
          visible={referenceModal.visible}
          onToggleVisibility={() =>
            setReferenceModal({ ...referenceModal, visible: false })
          }
          viewType={`view`}
        />
      </div>
    )
  )
}

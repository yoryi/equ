import moment from "moment"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import AddIcon from "../../../assets/add-icon.svg"
import Card from "../../../components/Card/Card"
import EmptyExperience from "../../../components/EmptyExperience/EmptyExperience"
//Components
import JourneyModal from "../../../components/JourneyModal"
//Actions
import * as actions from "../../../store/actions"
import { ActivityType } from "../../../store/types"
import { ActivityMedia } from "../../Activity/ActivityMedia"
import { CreateActivityModal } from "../../Activity/CreateActivityModal"
import { EditActivityModal } from "../../Activity/EditActivityModal"
//Styles
import Styles from "../Overview/index.module.scss"

const Spirit: React.FC = () => {
  const params = useParams<{ id: string | undefined }>()
  const id = params.id ? parseInt(params.id) : undefined

  const [isJourneyModalOpen, toggleJourneyModal] = useState(0)
  const { spirit, spiritModalOpen, editSpiritModalOpen } = useSelector(
    (state: any) => state.university,
  )
  const dispatch = useDispatch()

  const { t } = useTranslation()

  return (
    spirit && (
      <div
        className={`${Styles.backgroundContainer} university-profile-tab-item`}
      >
        <div
          className={`${Styles.container} university-profile-tab-item-title mb-5`}
        >
          <h1>{t(`profile.university.spiritScreen.spirit`)}</h1>

          {!!spirit?.length && !id && (
            <img
              src={AddIcon}
              alt="hamburger-icon"
              onClick={() =>
                dispatch(actions.toggleAddSpiritModal(ActivityType.SPIRIT))
              }
            />
          )}
        </div>

        {spirit && spirit.length > 0
          ? spirit.map((item: any) => (
              <>
                <span className={`anchor`} id={`activity-${item.id}`} />
                <Card
                  body={
                    <>
                      <div style={{ whiteSpace: `pre-wrap` }}>
                        {item.description}
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
                            publicMedia
                          />
                        </div>
                      )}
                    </>
                  }
                  title={
                    <div className="activity-main-info">
                      <div className="activity-data-container">
                        <div className="activity-title">{item.title}</div>
                        {item.company && (
                          <div className="activity-company">{item.company}</div>
                        )}
                        {item.date && (
                          <div className="activity-date">
                            {t(`profile.university.spiritScreen.shared`)}{` `}
                            {moment(item.date).format(`MM/YYYY`)}
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  toggleModal={() =>
                    dispatch(actions.toggleEditSpiritModal(item.id))
                  }
                  className="activity-card"
                  hideEditIcon={!!id}
                />
                <EditActivityModal
                  activity={item}
                  isOpen={editSpiritModalOpen === item.id}
                  toggle={() => dispatch(actions.toggleEditSpiritModal(0))}
                  title={t(`profile.university.spiritScreen.spirit`)}
                />

                <JourneyModal
                  visible={item.id === isJourneyModalOpen}
                  onClose={() => {
                    toggleJourneyModal(0)
                  }}
                  activity={item}
                  editable={!id}
                />
              </>
            ))
          : null}

        {!spirit?.length && !id && (
          <EmptyExperience
            title={t(`profile.university.spiritScreen.spirit`)}
            toggleModal={() =>
              dispatch(actions.toggleAddSpiritModal(ActivityType.SPIRIT))
            }
          />
        )}

        <CreateActivityModal
          isOpen={spiritModalOpen}
          toggle={() => dispatch(actions.toggleAddSpiritModal(``))}
          title={t(`profile.university.spiritScreen.spirit`)}
          type={ActivityType.SPIRIT}
        />
      </div>
    )
  )
}

export default Spirit

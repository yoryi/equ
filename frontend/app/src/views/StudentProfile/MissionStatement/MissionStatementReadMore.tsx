import React, { useEffect } from "react"
import { Trans,useTranslation  } from "react-i18next"
//Hooks
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"
//Components
import { Link } from "react-router-dom"

import EditIcon from "../../../assets/edit.svg"
import EquediIcon from "../../../assets/equedi-img.svg"
import Breadcrumb from "../../../components/Breadcrumb"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
import { YourBeatPayload } from "../../../store/actions/payloads"
import { ReduxState,StudentBeat  } from "../../../store/types"
//Types
import { Profile } from "../../../store/types"
import MissionStatement, { MissionStatementTypes } from "./MissionStatement"
import { MissionStatementModal } from "./MissionStatementModal"
import { MissionStatementReadMoreModal } from "./MissionStatementReadMoreModal"

const Icon: React.VFC = () => (
  <img
    src={EquediIcon}
    alt="equedi-icon"
    style={{ width: 27.04, height: 35.16, marginLeft: 8, marginRight: 8 }}
  />
)

const MissionStatementReadMore = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const { t } = useTranslation()
  const profile = useSelector<ReduxState, Profile | null>((state) =>
    id ? state.student.profile : state.profile.profile,
  )
  const beat = useSelector<ReduxState, StudentBeat | null>((state) =>
    id ? state.student.beat : state.profile.yourBeat,
  )
  const yourBeatQuestionId = useSelector<ReduxState, number>(
    (state) => state.profile.yourBeatQuestionId,
  )
  const { isMissionStatementModalOpen } = useSelector(
    (state: any) => state.profile,
  )
  const dispatch = useDispatch()

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if ((!id && profile) || profile?.id === id) {
      return
    }

    dispatch(id ? actions.getStudentProfile(id) : actions.getProfile())
  })

  useEffect(() => {
    if (beat) {
      return
    }

    dispatch(id ? actions.getStudentEquediBeat(id) : actions.getYourBeat())
  }, [dispatch, beat, id])

  useEffect(() => {
    if ((!id && !profile) || (id && profile?.id !== id) || !beat) {
      return
    }

    onLoadComplete()
  }, [onLoadComplete, profile, id, beat])

  return (
    <>
      <div className="mission-statement-read-more">
        <Breadcrumb>
          <Link to={id ? `/student/${id}` : `/`}>
            <span>{`${profile?.firstName} ${profile?.lastName}`}</span>
          </Link>

          <span className={`active`}>
            {t(`profile.student.profileScreen.missionStatement`)}
          </span>
        </Breadcrumb>

        <div className="mission-statement-read-more-title">
          {t(`profile.student.profileScreen.missionStatement`)}

          {!id && profile?.mission?.trim() !== `<p></p>` && (
            <img
              src={EditIcon}
              alt="edit-icon"
              onClick={() =>
                dispatch(actions.toggleMissionStatementModal(true))
              }
            />
          )}
        </div>
        {profile?.mission?.trim() !== `<p></p>` && profile?.mission ? (
          <p className="mission-statement-read-more-text">
            {profile?.mission ?? ``}
          </p>
        ) : (
          <MissionStatement
            mission={``}
            type={MissionStatementTypes.Student}
            readMore={false}
            noTitle={true}
            className="your-beat-mission-statement"
          />
        )}
        <div
          className="mission-statement-read-more-title"
          style={{ marginTop: 60 }}
        >
          <div>
            <Trans
              i18nKey={`screens:yourBeatScreen.yourBeat`}
              components={[<Icon />]}
            />
          </div>
        </div>

        <div className="mission-statement-read-more-item-text">
          {t(`profile.student.missionStatementScreen.yourBeatText`)}
        </div>

        {beat?.map((item) => (
          <>
            <div className="mission-statement-read-more-item-title">
              <div>{item.question}</div>

              {!id && (
                <img
                  src={EditIcon}
                  alt="edit-icon"
                  onClick={() => {
                    dispatch(actions.toggleYourBeatModal(item.id))
                  }}
                />
              )}
            </div>

            {item.answer && (
              <div className="mission-statement-read-more-item-text">
                {item.answer}
              </div>
            )}
          </>
        ))}
      </div>

      <MissionStatementModal
        isOpen={isMissionStatementModalOpen}
        toggle={() => dispatch(actions.toggleMissionStatementModal(false))}
        mission={profile?.mission ?? ``}
        type={MissionStatementTypes.Student}
      />

      <MissionStatementReadMoreModal
        item={beat?.find(
          (item: YourBeatPayload) => item.id === yourBeatQuestionId,
        )}
        toggle={() => dispatch(actions.toggleYourBeatModal(0))}
      />
    </>
  )
}

export default MissionStatementReadMore

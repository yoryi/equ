import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
//Hooks
import { useParams } from "react-router"

import Card from "../../../components/Card/Card"
import history from "../../../history"
import { actions } from "../../../store"
import { ReduxState } from "../../../store/types"
import { MissionStatementModal } from "./MissionStatementModal"

interface MissionStatementProps {
  mission: string
  type: MissionStatementTypes
  readMore?: boolean
  noTitle?: boolean
  className?: string
}

export enum MissionStatementTypes {
  University = `UNIVERSITY`,
  Student = `STUDENT`,
}

const MissionStatement: React.FC<MissionStatementProps> = ({
  mission,
  type,
  readMore,
  noTitle,
  className,
}) => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const showEquediBeat = useSelector<ReduxState, boolean>(
    (state) => !id || state.student.showBeat,
  )

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isMissionStatementModalOpen } = useSelector(
    (state: any) => state.profile,
  )

  return (
    <>
      <Card
        body={
          <div>
            {mission && mission.trim() !== `<p></p>`
              ? mission
              : type === MissionStatementTypes.University
              ? t(
                  `common:toShowTheseOnYourProfilePleaseFillOutYourMissionStatement`,
                )
              : t(`common:enterYourMissionStatementHere`)}
          </div>
        }
        footer={
          type === MissionStatementTypes.Student && readMore && showEquediBeat
            ? t(`common:readMore`)
            : ``
        }
        title={
          noTitle ? `` : t(`profile.student.profileScreen.missionStatement`)
        }
        className={`student-profile-card ${className ? className : ``}`}
        id="mission-statement"
        toggleModal={() => dispatch(actions.toggleMissionStatementModal(true))}
        toggleFooterModal={() => {
          window.scrollTo(0, 0)
          history.push(`/mission-statement${id ? `/${id}` : ``}`)
        }}
        hideEditIcon={!!id}
      />
      <MissionStatementModal
        isOpen={isMissionStatementModalOpen}
        toggle={() => dispatch(actions.toggleMissionStatementModal(false))}
        mission={mission}
        type={type}
      />
    </>
  )
}

export default MissionStatement

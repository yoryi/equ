import * as mui from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { ReactComponent as Lock } from "../../../assets/lock.svg"
import RecognitionCoverImg from "../../../assets/recognition-cover-img.svg"
import * as actions from "../../../store/actions"
import {
  ProfileRecognition,
  ReduxState,
  ReferenceType,
} from "../../../store/types"
import { AcademicAwards } from "./AcademicAwards/AcademicAwards"
import { ExtracurricularAwards } from "./ExtracurricularAwards/ExtracurricularAwards"
import { RecognitionModal } from "./RecognitionModal"
import { Recognitions } from "./Recognitions/Recognitions"
import { References } from "./References/References"
import { SchoolarshipAwards } from "./SchoolarshipAwards/SchoolarshipAwards"

export const Recognition: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const recognition = useSelector<ReduxState, ProfileRecognition | null>(
    (state) => (id ? state.student.recognition : state.profile.recognition),
  )
  const isRecognitionPrivate = useSelector<ReduxState, boolean>((state) =>
    id
      ? state.student.isRecognitionLoaded && !state.student.recognition
      : state.profile.isRecognitionLoaded && !state.profile.recognition,
  )
  const isRecognitionModalOpen = useSelector<ReduxState, boolean>(
    (state) => state.profile.isRecognitionModalOpen,
  )
  const areActivityReferencesLoaded = useSelector<ReduxState, boolean>(
    (state) =>
      id
        ? !!state.student.activityReferences
        : !!state.profile.recognition?.references,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      id ? actions.getStudentRecognition(id) : actions.getProfileRecognition(),
    )
  }, [id, dispatch])

  useEffect(() => {
    if (areActivityReferencesLoaded) {
      return
    }

    dispatch(
      id
        ? actions.getStudentReferences({
            studentId: id,
            type: ReferenceType.Activity,
          })
        : actions.getReferences(ReferenceType.Activity),
    )
  }, [id, areActivityReferencesLoaded, dispatch])

  const { t } = useTranslation()

  if (isRecognitionPrivate) {
    return (
      <div
        className={
          `recognition-tab d-flex justify-content-center align-items-center`
        }
      >
        <div
          className={
            `student-profile-tab-item d-flex flex-column justify-content-center align-items-center`
          }
        >
          <Lock width={45} height={60} />

          <h1
            className={
              `student-profile-tab-item-title mt-4 mb-0 d-block text-center`
            }
          >
            {t(`common:thisTabIsPrivate`)}
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="recognition-tab">
      {!recognition && (
        <div className={`w-100 mt-5`} style={{ maxWidth: 960 }}>
          <mui.Skeleton className={`mt-4`} width={`100%`} height={350} />

          <h1>
            <mui.Skeleton className={`mt-5`} width={350} />{` `}
          </h1>

          <div className={`mt-4`}>
            {Array.from({ length: 5 }, (_, index) => (
              <mui.Skeleton
                key={index}
                height={16}
                {...(index && { style: { marginTop: `8px` } })}
              />
            ))}
          </div>
        </div>
      )}

      {recognition && (
        <>
          <Recognitions
            recognition={recognition}
            toggleModal={() =>
              dispatch(actions.toggleRecognitionQuoteModal(true))
            }
          />
          <AcademicAwards recognition={recognition} />
          <ExtracurricularAwards recognition={recognition} />
          <SchoolarshipAwards recognition={recognition} />
          <References />

          {!id && (
            <img
              src={RecognitionCoverImg}
              alt="cover-img"
              className="recognition-tab-cover-img"
            />
          )}

          <RecognitionModal
            isOpen={isRecognitionModalOpen}
            toggle={() => dispatch(actions.toggleRecognitionQuoteModal(false))}
            content={
              recognition && recognition.quote ? recognition.quote.content : ``
            }
            id={recognition && recognition.quote ? recognition.quote.id : 0}
          />
        </>
      )}
    </div>
  )
}

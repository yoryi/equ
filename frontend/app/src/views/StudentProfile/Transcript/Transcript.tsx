import * as mui from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"

import { ReactComponent as Lock } from "../../../assets/lock.svg"
import TranscriptCoverImg from "../../../assets/transcript-cover-img.svg"
import * as actions from "../../../store/actions"
import { ProfileTranscript, ReduxState } from "../../../store/types"
import AcademicReferences from "./AcademicReferences/AcademicReferences"
import { ApCourses } from "./ApCourses/ApCourses"
import { CollegeCourses } from "./CollegeCourses/CollegeCourses"
import { GPA } from "./GPA/GPA"
import { SatSubjectTests } from "./SatSubjectTests/SatSubjectTests"
import { StandarizedTests } from "./StandarizedTests/StandarizedTests"
import { TranscriptAtGlance } from "./TranscriptAtGlance/TranscriptAtGlance"

export const Transcript: React.VFC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const transcript = useSelector<ReduxState, ProfileTranscript | null>(
    (state) => (id ? state.student.transcript : state.profile.transcript),
  )
  const isTranscriptPrivate = useSelector<ReduxState, boolean>((state) =>
    id
      ? state.student.isTranscriptLoaded && !state.student.transcript
      : state.profile.isTranscriptLoaded && !state.profile.transcript,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      id ? actions.getStudentTranscript(id) : actions.getProfileTranscript(),
    )
  }, [id, dispatch])

  const { t } = useTranslation()

  if (isTranscriptPrivate) {
    return (
      <div
        className={
          `transcript-tab d-flex justify-content-center align-items-center`
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
    <div className="transcript-tab">
      <div className="student-profile-tab-item">
        <div
          className="student-profile-tab-item-title"
          style={{ marginBottom: 0 }}
        >
          {!transcript && <mui.Skeleton width={400} />}

          {transcript && t(`profile.student.transcriptScreen.transcripts`)}
        </div>
      </div>

      {!transcript && (
        <>
          <div className={`mt-4`}>
            {Array.from({ length: 5 }, (_, index) => (
              <mui.Skeleton
                key={index}
                height={16}
                {...(index && { style: { marginTop: `8px` } })}
              />
            ))}
          </div>

          <h1>
            <mui.Skeleton className={`mt-5`} width={350} />{` `}
          </h1>

          <mui.Skeleton className={`mt-4`} width={`100%`} height={350} />
        </>
      )}

      {transcript && (
        <>
          {!!transcript.gpas?.length && <GPA transcript={transcript} />}

          <StandarizedTests transcript={transcript} />
          <TranscriptAtGlance transcript={transcript} />
          <ApCourses transcript={transcript} />
          <CollegeCourses transcript={transcript} />
          <SatSubjectTests transcript={transcript} />
          <AcademicReferences transcript={transcript} />

          {!id && (
            <img
              src={TranscriptCoverImg}
              alt="cover-img"
              className="transcript-tab-cover-img"
            />
          )}
        </>
      )}
    </div>
  )
}

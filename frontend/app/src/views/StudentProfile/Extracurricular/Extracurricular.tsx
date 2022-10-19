import * as mui from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import ExtracurricularCoverImg from "../../../assets/extracurricular-cover-img.svg"
import { ReactComponent as Lock } from "../../../assets/lock.svg"
import * as actions from "../../../store/actions"
import {
  ActivityType,
  ProfileExtracurriculars,
  ReduxState,
  ReferenceType,
} from "../../../store/types"
import { AcademicArt } from "./AcademicArt/AcademicArt"
import { Extracurriculars } from "./Extracurriculars/Extracurriculars"
import { ExtracurricularsModal } from "./ExtracurricularsModal"
import { Hobbies } from "./Hobbies/Hobbies"
import { SportSpirit } from "./SportSpirit/SportSpirit"

export const Extracurricular: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const extracurriculars = useSelector<
    ReduxState,
    ProfileExtracurriculars | null
  >((state) =>
    id ? state.student.extracurriculars : state.profile.extracurriculars,
  )
  const areExtracurricularsPrivate = useSelector<ReduxState, boolean>((state) =>
    id
      ? state.student.areExtracurricularsLoaded &&
        !state.student.extracurriculars
      : state.profile.areExtracurricularsLoaded &&
        !state.profile.extracurriculars,
  )
  const isExtracurricularModalOpen = useSelector<ReduxState, boolean>(
    (state) => state.profile.isExtracurricularModalOpen,
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
      id
        ? actions.getStudentExtracurriculars(id)
        : actions.getProfileExtracurriculars(),
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

  if (areExtracurricularsPrivate) {
    return (
      <div
        className={
          `extracurricular-tab d-flex justify-content-center align-items-center`
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
    <div className="extracurricular-tab">
      {!extracurriculars && (
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

      {extracurriculars && (
        <>
          <Extracurriculars
            extracurriculars={extracurriculars}
            toggleModal={() =>
              dispatch(actions.toggleExtracurricularQuoteModal(true))
            }
          />

          {extracurriculars?.extracurricularOrder ===
          ActivityType.ACADEMIC_ART ? (
            <>
              <AcademicArt extracurriculars={extracurriculars} />
              <SportSpirit extracurriculars={extracurriculars} />
            </>
          ) : (
            <>
              <SportSpirit extracurriculars={extracurriculars} />
              <AcademicArt extracurriculars={extracurriculars} />
            </>
          )}

          <Hobbies extracurriculars={extracurriculars} />

          {!id && (
            <img
              src={ExtracurricularCoverImg}
              alt="cover-img"
              className="extracurricular-tab-cover-img"
            />
          )}

          <ExtracurricularsModal
            isOpen={isExtracurricularModalOpen}
            toggle={() =>
              dispatch(actions.toggleExtracurricularQuoteModal(false))
            }
            content={extracurriculars.quote?.content ?? ``}
            id={extracurriculars.quote?.id ?? 0}
          />
        </>
      )}
    </div>
  )
}

import * as mui from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { ReactComponent as Lock } from "../../../assets/lock.svg"
import ProfessionalCoverImg from "../../../assets/professional-cover-img.svg"
import * as actions from "../../../store/actions"
import {
  ProfileProfessional,
  ReduxState,
  ReferenceType,
} from "../../../store/types"
import { Employment } from "./Employment/Employment"
import { Internship } from "./Internship/Internship"
import { ProfessionalModal } from "./ProfessionalModal"
import { Professionals } from "./Professionals/Professionals"

export const Professional: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const professional = useSelector<ReduxState, ProfileProfessional | null>(
    (state) => (id ? state.student.professional : state.profile.professional),
  )
  const isProfessionalPrivate = useSelector<ReduxState, boolean>((state) =>
    id
      ? state.student.isProfessionalLoaded && !state.student.professional
      : state.profile.isProfessionalLoaded && !state.profile.professional,
  )
  const isProfessionalModalOpen = useSelector<ReduxState, boolean>(
    (state) => state.profile.isProfessionalModalOpen,
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
        ? actions.getStudentProfessional(id)
        : actions.getProfileProfessional(),
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

  if (isProfessionalPrivate) {
    return (
      <div
        className={
          `professional-tab d-flex justify-content-center align-items-center`
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
    <div className="professional-tab">
      {!professional && (
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

      {professional && (
        <>
          <Professionals
            professional={professional}
            toggleModal={() =>
              dispatch(actions.toggleProfessionalQuoteModal(true))
            }
          />

          <Employment professional={professional} />

          <Internship professional={professional} />

          {!id && (
            <img
              src={ProfessionalCoverImg}
              alt="cover-img"
              className="professional-tab-cover-img"
            />
          )}

          <ProfessionalModal
            isOpen={isProfessionalModalOpen}
            toggle={() => dispatch(actions.toggleProfessionalQuoteModal(false))}
            content={
              professional && professional.quote
                ? professional.quote.content
                : ``
            }
            id={professional && professional.quote ? professional.quote.id : 0}
          />
        </>
      )}
    </div>
  )
}

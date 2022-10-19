import * as mui from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { ReactComponent as Lock } from "../../../assets/lock.svg"
import ServiceCoverImg from "../../../assets/service-cover-img.svg"
import * as actions from "../../../store/actions"
import { ProfileService, ReduxState, ReferenceType } from "../../../store/types"
import { Activism } from "./Activism/Activism"
import { ServiceModal } from "./ServiceModal"
import { Services } from "./Services/Services"
import { VolunteerWork } from "./VolunteerWork/VolunteerWork"

export const Service: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const service = useSelector<ReduxState, ProfileService | null>((state) =>
    id ? state.student.service : state.profile.service,
  )
  const isServicePrivate = useSelector<ReduxState, boolean>((state) =>
    id
      ? state.student.isServiceLoaded && !state.student.service
      : state.profile.isServiceLoaded && !state.profile.service,
  )
  const isServiceModalOpen = useSelector<ReduxState, boolean>(
    (state) => state.profile.isServiceModalOpen,
  )
  const areActivityReferencesLoaded = useSelector<ReduxState, boolean>(
    (state) =>
      id
        ? !!state.student.activityReferences
        : !!state.profile.recognition?.references,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(id ? actions.getStudentService(id) : actions.getProfileService())
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

  if (isServicePrivate) {
    return (
      <div
        className={
          `service-tab d-flex justify-content-center align-items-center`
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
    <div className="service-tab">
      {!service && (
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

      {service && (
        <>
          <Services
            service={service}
            toggleModal={() => dispatch(actions.toggleServiceQuoteModal(true))}
          />

          <VolunteerWork service={service} />

          <Activism service={service} />

          {!id && (
            <img
              src={ServiceCoverImg}
              alt="cover-img"
              className="service-tab-cover-img"
            />
          )}

          <ServiceModal
            isOpen={isServiceModalOpen}
            toggle={() => dispatch(actions.toggleServiceQuoteModal(false))}
            content={service && service.quote ? service.quote.content : ``}
            id={service && service.quote ? service.quote.id : 0}
          />
        </>
      )}
    </div>
  )
}

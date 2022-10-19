import React from "react"
//Hooks
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

//Components
import ReferenceBox from "../../../../components/Reference"
import ReferenceModal from "../../../../components/ReferenceModal"
//Types
import { ReduxState, Reference } from "../../../../store/types"
//Styles
import Styles from "./References.module.scss"

export const References: React.VFC = () => {
  const isViewingOwnProfile = !useParams<{ id?: string }>().id

  const references = useSelector<ReduxState, Reference[] | null>((state) =>
    isViewingOwnProfile
      ? state.profile.recognition?.references ?? null
      : state.student.activityReferences,
  )

  const [isReferenceModalVisible, setReferenceModalVisible] = useState(false)
  const [viewedReference, setViewedReference] = useState<Reference | null>(null)

  const { t } = useTranslation()

  return (
    <>
      {!!references?.length && (
        <div className={`student-profile-tab-item`}>
          <div className={`student-profile-tab-item-title`}>
            {t(`profile.student.recognitionScreen.references`)}
          </div>

          <div className={Styles.container}>
            {references.map((reference) => (
              <ReferenceBox
                key={`reference-${reference.id}`}
                reference={reference}
                className={Styles.reference}
                onClick={() => {
                  setViewedReference(reference)
                  setReferenceModalVisible(true)
                }}
              />
            ))}
          </div>
        </div>
      )}

      <ReferenceModal
        visible={isReferenceModalVisible}
        reference={viewedReference}
        onToggleVisibility={() =>
          setReferenceModalVisible(!isReferenceModalVisible)
        }
      />
    </>
  )
}

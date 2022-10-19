import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"

import { ReactComponent as Plus } from "../../../../assets/plus.svg"
import AddReferenceModal from "../../../../components/AddReferenceModal"
import EmptyExperience from "../../../../components/EmptyExperience/EmptyExperience"
import IconBox from "../../../../components/IconBox"
//Components
import Reference from "../../../../components/Reference"
import ReferenceModal from "../../../../components/ReferenceModal"
//Actions
import * as actions from "../../../../store/actions"
import { ReduxState } from "../../../../store/types"
//Types
import {
  ProfileTranscript,
  Reference as TReference,
  ReferenceType,
} from "../../../../store/types/profile"
//Styles
import Styles from "./AcademicReferences.module.scss"

interface AcademicReferencesProps {
  transcript: ProfileTranscript | null
}

const AcademicReferences: React.FC<AcademicReferencesProps> = () => {
  const params = useParams<{ id?: string }>()
  const id = params.id ? parseInt(params.id) : null

  const references = useSelector<ReduxState, TReference[] | null>(
    (state) =>
      (id
        ? state.student.academicReferences
        : state.profile.transcript?.academicReferences) ?? null,
  )
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const [isReferenceModalVisible, setReferenceModalVisible] = useState(false)
  const [viewedReference, setViewedReference] = useState<TReference | null>(
    null,
  )

  const [
    isAddAcademicReferenceModalVisible,
    setAddAcademicReferenceModalVisible,
  ] = useState(false)

  useEffect(() => {
    if (references) {
      return
    }

    dispatch(
      id
        ? actions.getStudentReferences({
            studentId: id,
            type: ReferenceType.Academic,
          })
        : actions.getReferences(ReferenceType.Academic),
    )
  }, [id, references, dispatch])

  if (!references?.length && !!id) {
    return null
  }

  return (
    <>
      <div className={`student-profile-tab-item`}>
        <div className={`student-profile-tab-item-title`}>
          {t(`profile.student.transcriptScreen.academicReferences`)}

          {!!references?.length && !id && (
            <IconBox
              className={`mx-1`}
              icon={Plus}
              variant={`dark`}
              onClick={() => setAddAcademicReferenceModalVisible(true)}
              tag={`button`}
              shadow
            />
          )}
        </div>

        <div className={Styles.container}>
          {!!references?.length &&
            references.map((reference) => (
              <Reference
                key={`reference-${reference.id}`}
                reference={reference}
                className={Styles.reference}
                onClick={() => {
                  setViewedReference(reference)
                  setReferenceModalVisible(true)
                }}
              />
            ))}

          {!references?.length && (
            <div className={Styles.addAcademicReferenceContainer}>
              <EmptyExperience
                title={t(`profile.student.transcriptScreen.academicReferences`)}
                toggleModal={() =>
                  setAddAcademicReferenceModalVisible(
                    !isAddAcademicReferenceModalVisible,
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      <ReferenceModal
        visible={isReferenceModalVisible}
        reference={viewedReference}
        onToggleVisibility={() =>
          setReferenceModalVisible(!isReferenceModalVisible)
        }
      />

      <AddReferenceModal
        visible={isAddAcademicReferenceModalVisible}
        onClose={() => setAddAcademicReferenceModalVisible(false)}
        referenceType={ReferenceType.Academic}
      />
    </>
  )
}

export default AcademicReferences

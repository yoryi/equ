//Utils
import _ from "lodash"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
//Services
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

//Components
import MessageModal from "../../../components/MessageModal"
import Modal from "../../../components/Modal/Modal"
import TextArea from "../../../components/TextField/TextArea"
import UnsavedChangesModal from "../../../components/UnsavedChangesModal/UnsavedChangesModal"
//Actions
import * as actions from "../../../store/actions"
import { MissionStatementTypes } from "./MissionStatement"

interface MissionStatementModalProps {
  isOpen: boolean
  toggle: () => void
  mission: string
  type: MissionStatementTypes
}

const MAX_WORDS_COUNT = 40

export const MissionStatementModal: React.FC<MissionStatementModalProps> = ({
  isOpen,
  toggle,
  mission,
  type,
}) => {
  const [validationError, setValidationError] = useState(``)
  const [isSubmitting, setSubmitting] = useState(false)
  const [value, setValue] = useState(mission ?? ``)
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    setValidationError(``)
  }, [value])

  useEffect(() => {
    !mission ? setValue(``) : setValue(mission)
  }, [isOpen])

  const handleSubmit = async () => {
    if (value.split(` `).length > MAX_WORDS_COUNT) {
      return setValidationError(
        t(`errors:maximumNumberOfWords`, { count: MAX_WORDS_COUNT }),
      )
    }

    setSubmitting(true)
    try {
      await dispatch(
        type === MissionStatementTypes.Student
          ? actions.updateMission({ mission: value })
          : actions.updateUniversityMission({ mission: value }),
      )
      setSuccessModalVisible(true)
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setSubmitting(false)
  }

  return (
    <>
      <Modal
        title={t(`profile.student.profileScreen.missionStatement`)}
        subtitle={`${t(
          `profile.student.profileScreen.addMissionStatement`,
        )} ${t(`profile.student.profileScreen.pleaseLimit`)}`}
        isOpen={isOpen && !isSuccessModalVisible}
        toggle={() => {
          if ((!value && !mission) || mission === value) {
            toggle()
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <>
            <TextArea
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              size="lg"
              className="text-area-leading-questions"
              error={validationError}
            />
            {isUnsavedModalOpen ? (
              <UnsavedChangesModal
                isOpen={isUnsavedModalOpen}
                footerLeaveAction={() => {
                  toggleUnsavedModal(false)
                  toggle()
                }}
                footerStayAction={() => toggleUnsavedModal(false)}
              />
            ) : null}
          </>
        }
        footer={t(`common:saveChanges`)}
        footerAction={async () => handleSubmit()}
        disabledFooterButton={_.isEqual(mission, value) || isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`common:missionStatementUpdated`)}
        visible={isSuccessModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
          toggle()
        }}
      />
    </>
  )
}

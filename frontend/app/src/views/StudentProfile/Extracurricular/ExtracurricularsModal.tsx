import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import Modal from "../../../components/Modal/Modal"
import TextArea from "../../../components/TextField/TextArea"
import UnsavedChangesModal from "../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../store"

interface ExtracurricularsProps {
  isOpen: boolean
  toggle: () => void
  content: string
  id?: number
}
const MAX_WORDS_COUNT = 40

export const ExtracurricularsModal: React.FC<ExtracurricularsProps> = ({
  isOpen,
  toggle,
  content,
  id,
}) => {
  const [value, setValue] = useState(content)
  const [validationError, setValidationError] = useState(``)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  useEffect(() => {
    setValidationError(``)
  }, [value])

  const handleSubmit = async () => {
    if (value.split(` `).length > MAX_WORDS_COUNT) {
      return setValidationError(
        t(`errors:maximumNumberOfWords`, { count: MAX_WORDS_COUNT }),
      )
    }

    setSubmitting(true)
    try {
      await dispatch(
        id
          ? actions.updateExtracurricularQuote({
              content: value,
              id,
            })
          : actions.addExtracurricularQuote({
              content: value,
              type: `EXTRACURRICULAR`,
            }),
      )

      setSuccessModalVisible(true)
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
    setSubmitting(false)
  }

  useEffect(() => {
    setValue(content)
  }, [isOpen])

  return (
    <>
      <Modal
        title={t(`profile.student.extracurricularsScreen.extracurriculars`)}
        subtitle={t(`common:pleaseLimitResponse`)}
        subtitleQuestion={t(
          `profile.student.extracurricularsScreen.whereDoYouShine`,
        )}
        isOpen={isOpen && !isSuccessModalVisible}
        toggle={() => {
          if ((!value && !content) || (content && content === value)) {
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
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <Modal
        isOpen={isSuccessModalVisible}
        toggle={() => {
          setSuccessModalVisible(false)
          toggle()
        }}
        title={t(`common:success`)}
        size={`sm`}
        footer={t(`common:continue`)}
        footerAction={() => {
          setSuccessModalVisible(false)
          toggle()
        }}
        footerStyle={{ marginBottom: 32 }}
        closeIcon
      >
        <p className={`text-center`}>
          {t(`common:leadingQuestionUpdatedSuccessfully`)}
        </p>
      </Modal>
    </>
  )
}

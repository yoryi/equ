import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

//Components
import Modal from "../../../components/Modal/Modal"
import TextArea from "../../../components/TextField/TextArea"
import UnsavedChangesModal from "../../../components/UnsavedChangesModal/UnsavedChangesModal"
//Actions
import * as actions from "../../../store/actions"

interface RecognitionModalProps {
  isOpen: boolean
  toggle: () => void
  content: string
  id?: number
}

const MAX_WORDS_COUNT = 40

export const RecognitionModal: React.FC<RecognitionModalProps> = ({
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
          ? actions.updateRecognitionQuote({
              content: value,
              id,
            })
          : actions.addRecognitionQuote({
              content: value,
              type: `RECOGNITION`,
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
        title={t(`profile.student.recognitionScreen.recognition`)}
        subtitle={t(`profile.student.profileScreen.pleaseLimit`)}
        subtitleQuestion={t(
          `profile.student.recognitionScreen.hardWorkPaysOff`,
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

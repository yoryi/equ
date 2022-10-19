import React, { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import EquediIcon from "../../../assets/equedi-img.svg"
//Components
import MessageModal from "../../../components/MessageModal"
import Modal from "../../../components/Modal/Modal"
import TextArea from "../../../components/TextField/TextArea"
import UnsavedChangesModal from "../../../components/UnsavedChangesModal/UnsavedChangesModal"
import useWindowDimensions from "../../../hooks/UseWindowDimensions"
import { actions } from "../../../store"

interface MissionStatementReadMoreModalProps {
  item: any
  toggle: () => void
}

export const MissionStatementReadMoreModal: React.FC<MissionStatementReadMoreModalProps> = ({
  item,
  toggle,
}) => {
  const [value, setValue] = useState(``)
  const [validationError, setValidationError] = useState(``)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)
  const { windowWidth } = useWindowDimensions()

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  useEffect(() => {
    setValidationError(``)
  }, [value])

  useEffect(() => {
    item && setValue(item.answer)
  }, [item])

  useEffect(() => {
    !item && setValue(``)
  }, [])

  const handleSubmit = () => {
    dispatch(
      actions.updateYourBeat({
        questionId: item.id,
        answer: value,
      }),
    ).then(() => {
      setMessageModalVisible(true)
    })
  }

  return (
    <>
      <Modal
        title={
          <div>
            Your <img src={EquediIcon} alt="equedi-icon" /> Beat
          </div>
        }
        subtitleQuestion={item?.question}
        isOpen={!!item && !isMessageModalVisible}
        toggle={() => {
          if ((!value && !item) || (item && item.answer === value)) {
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
        footerAction={() => handleSubmit()}
        disabledFooterButton={value === item?.answer}
        closeIcon={windowWidth <= 1023}
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`yourBeatScreen.yourBeatUpdated`)}
        visible={isMessageModalVisible}
        onClose={() => {
          setMessageModalVisible(false)
          toggle()
        }}
      />
    </>
  )
}

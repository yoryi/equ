import React from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import Modal from "../../../components/Modal/Modal"
import history from "../../../history"
import { actions } from "../../../store"

interface DeleteStudentAccountModalProps {
  isOpen: boolean
  toggle: () => void
  id: number
}

export const DeleteStudentAccountModal: React.FC<DeleteStudentAccountModalProps> = ({
  isOpen,
  toggle,
  id,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <>
      <Modal
        title={t(`studentOverview.areYouSureToDelete`)}
        isOpen={isOpen}
        toggle={toggle}
        closeIcon={true}
        footer={t(`settings.studentProfileSettingsScreen.deleteAccount`)}
        removeButton
        footerAction={async () => {
          try {
            await dispatch(actions.deleteStudentAccount(id))
            await dispatch(actions.getStudentsList())
            toggle()
            history.push(`/admin`)
          } catch (err) {
            if (err.message) {
              toast.error(err.message)
            }
          }
        }}
      />
    </>
  )
}

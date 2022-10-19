import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import Modal from "../../../../components/Modal/Modal"
import { actions } from "../../../../store"

interface CloseAccountModalProps {
  isOpen: boolean
  toggle: () => void
  firstName: string
}

export const CloseAccountModal: React.FC<CloseAccountModalProps> = ({
  isOpen,
  toggle,
  firstName,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <>
      <Modal
        title={t(`settings.studentProfileSettingsScreen.weAreSorryToSeeYouGo`, {
          firstName,
        })}
        isOpen={isOpen}
        toggle={toggle}
        closeIcon={true}
        body={
          <div className="close-account-body">
            {t(`settings.studentProfileSettingsScreen.deleteAccountText`)}
          </div>
        }
        footer={t(`settings.studentProfileSettingsScreen.deleteAccount`)}
        removeButton
        footerAction={() => {
          dispatch(actions.closeAccount())
        }}
      />
    </>
  )
}

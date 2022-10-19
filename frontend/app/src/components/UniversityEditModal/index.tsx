import * as React from "react"
//Hooks
import { useTranslation } from "react-i18next"

//Components
import Modal from "../Modal/Modal"

interface UniversityEditModalProps {
  visible: boolean
  onClose: () => void
}

const UniversityEditModal: React.VFC<UniversityEditModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={visible}
      toggle={onClose}
      title={t(`profile.university.overviewScreen.editDataModalTitle`)}
      size={`md`}
      closeIcon
    >
      <p className={`text-center`}>
        {t(`profile.university.overviewScreen.editDataModalMessage`)}
      </p>
    </Modal>
  )
}

export default UniversityEditModal

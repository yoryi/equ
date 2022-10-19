import * as React from "react"
//Hooks
import { useTranslation } from "react-i18next"

//Components
import Modal from "../Modal/Modal"

interface ClaimSchoolModalProps {
  visible: boolean
  onClose: () => void
}

const ClaimSchoolModal: React.VFC<ClaimSchoolModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={visible}
      toggle={onClose}
      title={t(`profile.university.profileScreen.claimSchoolTitle`)}
      size={`lg`}
      footer={t(`common:closeWindow`)}
      footerAction={onClose}
      closeIcon
    >
      <p className={`text-center`}>
        {t(`profile.university.profileScreen.claimSchoolMessage`)}
      </p>
    </Modal>
  )
}

export default ClaimSchoolModal

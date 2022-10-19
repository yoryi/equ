import { MDBModal, MDBModalFooter } from "mdbreact"
import React from "react"
//Hooks
import { useTranslation } from "react-i18next"

import Button from "../Button/Button"

interface ModalProps {
  isOpen: boolean
  footerLeaveAction?: () => void
  footerStayAction?: () => void
}

const UnsavedChangesModal: React.VFC<ModalProps> = ({
  isOpen,
  footerLeaveAction,
  footerStayAction,
}) => {
  const { t } = useTranslation(`common`)

  return (
    <MDBModal
      centered
      isOpen={isOpen}
      toggle={footerStayAction}
      size="sm"
      inline={false}
      noClickableBodyWithoutBackdrop={false}
      overflowScroll={false}
    >
      <div className="modal-default-header unsaved-changes-modal-header">
        <div className="modal-title-container">
          <div className="modal-title">{t(`areYouSureYouWantToExit`)}</div>
        </div>
      </div>

      <MDBModalFooter className="unsaved-changes-modal-footer">
        <Button
          className={`text-uppercase light`}
          onClick={() => footerLeaveAction && footerLeaveAction()}
        >
          {t(`leave`)}
        </Button>

        <Button
          className={`text-uppercase`}
          onClick={() => footerStayAction && footerStayAction()}
        >
          {t(`stay`)}
        </Button>
      </MDBModalFooter>
    </MDBModal>
  )
}

export default UnsavedChangesModal

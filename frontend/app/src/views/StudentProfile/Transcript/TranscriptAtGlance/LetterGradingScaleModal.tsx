import React from "react"
import { useTranslation } from "react-i18next"

import Modal from "../../../../components/Modal/Modal"
import Table from "../../../../components/Table/Table"

interface LetterGradingScaleModalProps {
  isOpen: boolean
  toggle: () => void
}

export const LetterGradingScaleModal: React.FC<LetterGradingScaleModalProps> = ({
  isOpen,
  toggle,
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      title={t(`profile.student.transcriptScreen.equediLetterGradingScale`)}
      subtitle={t(
        `profile.student.transcriptScreen.equediLetterGradingScaleSubtitle`,
      )}
      isOpen={isOpen}
      toggle={toggle}
      closeIcon={true}
      body={
        <div className="letter-grading-scale-modal-body">
          <Table
            headValues={[`Equedi Grade`, `Letter Grade`, `Numeric Grade`]}
            body={
              <>
                <tr>
                  <td>{`A+`}</td>
                  <td>{`A+`}</td>
                  <td>{`97-100`}</td>
                </tr>
                <tr>
                  <td>{`A`}</td>
                  <td>{`A`}</td>
                  <td>{`93-96`}</td>
                </tr>
                <tr>
                  <td>{`A-`}</td>
                  <td>{`A-`}</td>
                  <td>{`90-92`}</td>
                </tr>
                <tr>
                  <td>{`B+`}</td>
                  <td>{`B+`}</td>
                  <td>{`87-89`}</td>
                </tr>
                <tr>
                  <td>{`B`}</td>
                  <td>{`B`}</td>
                  <td>{`83-86`}</td>
                </tr>
                <tr>
                  <td>{`B-`}</td>
                  <td>{`B-`}</td>
                  <td>{`80-82`}</td>
                </tr>
                <tr>
                  <td>{`C+`}</td>
                  <td>{`C+`}</td>
                  <td>{`77-79`}</td>
                </tr>
                <tr>
                  <td>{`C`}</td>
                  <td>{`C`}</td>
                  <td>{`73-76`}</td>
                </tr>
                <tr>
                  <td>{`C-`}</td>
                  <td>{`C-`}</td>
                  <td>{`70-72`}</td>
                </tr>
                <tr>
                  <td>{`D+`}</td>
                  <td>{`D+`}</td>
                  <td>{`67-69`}</td>
                </tr>
                <tr>
                  <td>{`D`}</td>
                  <td>{`D`}</td>
                  <td>{`65-66`}</td>
                </tr>
                <tr>
                  <td>{`F`}</td>
                  <td>{`D- / F`}</td>
                  <td>{`Below 65`}</td>
                </tr>
                <tr>
                  <td>{`P`}</td>
                  <td>{`Pass`}</td>
                  <td>{`Pass`}</td>
                </tr>
                <tr>
                  <td>{`F`}</td>
                  <td>{`F`}</td>
                  <td>{`Fail`}</td>
                </tr>
              </>
            }
          />
        </div>
      }
    />
  )
}

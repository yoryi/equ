import React from "react"
import { useDropzone } from "react-dropzone"
//Types
import { FileRejection } from "react-dropzone"
//Services
import toast from "react-hot-toast"
//Hooks
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import CloseIcon from "../../../assets/close-icon.svg"
import Modal from "../../../components/Modal/Modal"
//Constants
import fileLimits from "../../../const/fileLimits"
import { actions } from "../../../store"
import { ActivityType } from "../../../store/types"
import { ActivityMedia } from "../ActivityMedia"

interface UpdateLogoModalProps {
  isOpen: boolean
  toggle: () => void
  activityType: ActivityType
  activityId: number
  logo?: any
}

export const UpdateLogoModal: React.FC<UpdateLogoModalProps> = ({
  isOpen,
  toggle,
  activityType,
  activityId,
  logo,
}) => {
  const dispatch = useDispatch()

  const onDropRejected = ([rejection]: FileRejection[]) => {
    if (!!rejection.errors.find(({ code }) => code === `file-invalid-type`)) {
      toast.error(
        t(`errors:invalidFileExtension`, {
          extensions: `jpg, jpeg, png`,
        }),
      )
    }

    if (!!rejection.errors.find(({ code }) => code === `file-too-large`)) {
      toast.error(
        t(`errors:fileIsTooBig`, { limit: fileLimits.journeyMedia }),
      )
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: [`image/jpg`, `image/jpeg`, `image/png`],
    multiple: false,
    maxSize: fileLimits.activityLogo,
    onDropRejected,
    onDropAccepted: (acceptedFiles) => {
      acceptedFiles.length > 0 &&
        acceptedFiles.map(async (acceptedFile) => {
          const reader: any = new FileReader()
          await reader.readAsBinaryString(acceptedFile)
          reader.onloadend = async function () {
            const formData = new FormData()
            formData.append(`logo`, acceptedFile)
            dispatch(
              actions.uploadActivityLogo({
                activityId,
                data: formData,
                activityType,
              }),
            )
          }
        })
    },
  })

  const { t } = useTranslation(`common`)

  return isOpen && logo ? (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="update-activity-logo-modal"
      body={
        <div className="update-activity-logo-modal-body">
          <div className="update-activity-logo-modal-title">
            <img src={CloseIcon} alt="close-icon" onClick={toggle} />
          </div>
          <div className="upload-logo-container" {...getRootProps()}>
            <div className="dropzone">
              <input {...getInputProps()} />
              <div className="update-activity-logo-modal-logo-container">
                <ActivityMedia
                  path={logo.path}
                  className="update-activity-logo-modal-logo"
                />
              </div>
              <div>{t(`changeIcon`)}</div>
            </div>
          </div>
        </div>
      }
      size="sm"
      closeIcon={true}
      deleteFooter={t(`removeIcon`)}
      deleteAction={() =>
        dispatch(actions.deleteActivityLogo({ activityId, activityType }))
      }
    />
  ) : null
}

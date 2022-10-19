import * as React from "react"
import { useDropzone } from "react-dropzone"
//Types
import { FileRejection } from "react-dropzone"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch } from "react-redux"

import DeleteModal from "../../../components/Modal/DeleteModal"
//Constants
import fileLimits from "../../../const/fileLimits"
//Actions
import * as actions from "../../../store/actions"
import { ActivityType, Attachment } from "../../../store/types"

interface UploadAttachments {
  id: number
  activityType: ActivityType
  attachments: Attachment[]
}

export const UploadAttachments: React.FC<UploadAttachments> = ({
  id,
  activityType,
  attachments,
}) => {
  const dispatch = useDispatch()
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<{
    isOpen: boolean
    id: number
  }>({ isOpen: false, id: 0 })

  const onDropRejected = ([rejection]: FileRejection[]) => {
    if (!!rejection.errors.find(({ code }) => code === `file-invalid-type`)) {
      toast.error(
        t(`errors:invalidFileExtension`, {
          extensions: `pdf, doc, ppt, xls`,
        }),
      )
    }

    if (!!rejection.errors.find(({ code }) => code === `file-too-large`)) {
      toast.error(t(`errors:fileIsTooBig`, { limit: fileLimits.journeyMedia }))
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: [`.pdf`, `.doc`, `.docx`, `.pptx`, `.xlsx`, `.ppt`, `.xls`],
    multiple: true,
    maxSize: fileLimits.journeyMedia,
    onDropRejected: onDropRejected,
    onDropAccepted: async (acceptedFiles) => {
      try {
        await dispatch(
          actions.updateAttachments({
            activityId: id,
            formData: { files: acceptedFiles },
            activityType,
          }),
        )
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }
      }
    },
  })

  const onDeleteFile = async () => {
    try {
      await dispatch(
        actions.deleteAttachment({
          activityId: id,
          attachmentId: deleteModalOpen.id,
          activityType,
        }),
      )
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }

    setDeleteModalOpen({ isOpen: false, id: deleteModalOpen.id })
  }

  const { t } = useTranslation(`common`)
  return (
    <div>
      <div className="attached-files">
        {attachments?.map((file: Attachment) => (
          <div className="attached-files-item">
            {file.name.length > 20 ? (
              <>
                <span>{file.name.substring(0, 12)}...</span>
                <span>{file.name.substr(file.name.length - 7)}</span>
              </>
            ) : (
              <div>{file.name}</div>
            )}
            <div
              className="closeIcon"
              onClick={() => setDeleteModalOpen({ isOpen: true, id: file.id })}
            />
          </div>
        ))}
      </div>
      <div {...getRootProps()}>
        <div className="dropzone">
          <input {...getInputProps()} />
          <div>{t(`addAttachments`)}</div>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen.isOpen}
        toggle={() =>
          setDeleteModalOpen({ isOpen: false, id: deleteModalOpen.id })
        }
        footerAction={onDeleteFile}
      />
    </div>
  )
}

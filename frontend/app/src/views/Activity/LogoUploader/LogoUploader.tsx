import * as React from "react"
import { useDropzone } from "react-dropzone"
//Types
import { FileRejection } from "react-dropzone"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch } from "react-redux"

//Constants
import fileLimits from "../../../const/fileLimits"
//Actions
import * as actions from "../../../store/actions"
import { ActivityType } from "../../../store/types"

interface LogoUploaderProps {
  activityId: number
  activityType: ActivityType
  logo?: any
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  activityId,
  activityType,
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

            try {
              await dispatch(
                actions.uploadActivityLogo({
                  activityId,
                  data: formData,
                  activityType,
                }),
              )
            } catch (err) {
              if (err.message) {
                toast.error(err.message)
              }
            }
          }
        })
    },
  })

  const { t } = useTranslation(`common`)

  return logo?.path ? (
    <div onClick={() => dispatch(actions.toggleUploadActivityLogoModal(true))}>
      {t(`update`)}
    </div>
  ) : (
    <div className="upload-logo-container" {...getRootProps()}>
      <div className="dropzone">
        <input {...getInputProps()} />
        <div>{t(`addLogoOrPhoto`)}</div>
      </div>
    </div>
  )
}

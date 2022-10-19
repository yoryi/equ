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

interface UploadPhotoVideoProps {
  id: number
  activityType: ActivityType
}

export const UploadPhotoVideo: React.FC<UploadPhotoVideoProps> = ({
  id,
  activityType,
}) => {
  const dispatch = useDispatch()

  const onDropRejected = ([rejection]: FileRejection[]) => {
    if (!!rejection.errors.find(({ code }) => code === `file-invalid-type`)) {
      toast.error(
        t(`errors:invalidFileExtension`, {
          extensions: `jpg, jpeg, png, mp4`,
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
    accept: [`image/jpg`, `image/jpeg`, `image/png`, `video/mp4`],
    multiple: false,
    maxSize: fileLimits.journeyMedia,
    onDropRejected: onDropRejected,
    onDropAccepted: (acceptedFiles) => {
      acceptedFiles.length > 0 &&
        acceptedFiles.map(async (acceptedFile) => {
          const reader: any = new FileReader()
          await reader.readAsBinaryString(acceptedFile)
          reader.onloadend = async function () {
            const formData = new FormData()
            formData.append(`image`, acceptedFile)
            formData.append(`description`, ``)
            formData.append(`order`, `0`)

            try {
              await dispatch(
                activityType === ActivityType.SPIRIT
                  ? actions.updateSpiritJourney({
                      activityId: id,
                      formData,
                      activityType,
                    })
                  : actions.updateJourney({
                      activityId: id,
                      formData,
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

  return (
    <div {...getRootProps()}>
      <div className="dropzone">
        <input {...getInputProps()} />
        <div>{t(`addPhotoOrVideo`)}</div>
      </div>
    </div>
  )
}

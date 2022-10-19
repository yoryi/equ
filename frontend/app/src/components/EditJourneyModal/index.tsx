//Utils
import cx from "classnames"
//Components
import { MDBModal, MDBModalBody,MDBModalHeader } from "mdbreact"
import * as React from "react"
//Hooks
import { useCallback,useState } from "react"
import { useDropzone } from "react-dropzone"
//Types
import { FileRejection } from "react-dropzone"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

//Icons
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg"
//Constants
import fileLimits from "../../const/fileLimits"
//Actions
import * as actions from "../../store/actions"
import { Activity, ActivityType, Journey } from "../../store/types"
import EditJourneyDescriptionModal from "../EditJourneyDescriptionModal"
//Styles
import Styles from "./index.module.scss"

interface EditJourneyModalProps {
  visible: boolean
  onClose: () => void
  activity: Activity
  journey: Journey
}

/**
 * Modal for editing the activity journey.
 * @param {object} props Component props
 * @param {boolean} props.visible Value that indicated if the modal should be visible or not
 * @param {Function} props.onClose Function that will be called after the modal is closed
 * @param {Activity} props.activity Activity to which the journey belongs
 * @param {Journey} props.journey The journey that is being edited
 */
const EditJourneyModal: React.VFC<EditJourneyModalProps> = ({
  visible,
  onClose,
  activity,
  journey,
}) => {
  const dispatch = useDispatch()

  const [
    isEditDescriptionModalVisible,
    setEditDescriptionModalVisible,
  ] = useState(false)

  const { t } = useTranslation(`common`)

  const handleMakeFirstPhoto = useCallback(() => {
    dispatch(
      (activity.type === ActivityType.SPIRIT
        ? actions.makeFirstPhotoSpiritJourney
        : actions.makeFirstPhotoJourney)({
        activityId: activity.id,
        journeyId: journey.id,
        activityType: activity.type,
      }),
    )
  }, [activity, journey, dispatch])

  const handleEditDescription = () => setEditDescriptionModalVisible(true)

  const handlePhotoRemove = async () => {
    try {
      await dispatch(
        (activity.type === ActivityType.SPIRIT
          ? actions.removePhotoOrVideoSpirit
          : actions.removePhotoOrVideo)({
          activityId: activity.id,
          journeyId: journey.id,
          activityType: activity.type,
        }),
      )

      onClose()
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
  }

  const handleJourneyDelete = async () => {
    try {
      await dispatch(
        (activity.type === ActivityType.SPIRIT
          ? actions.deleteSpiritJourney
          : actions.deleteJourney)(activity),
      )
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
  }

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

  const onDropAccepted = async (files: File[]) => {
    const [file] = files
    const formData = new FormData()
    formData.append(`image`, file)
    formData.append(`description`, ``)
    formData.append(`order`, `0`)

    try {
      await dispatch(
        (activity.type === ActivityType.SPIRIT
          ? actions.updateSpiritJourney
          : actions.updateJourney)({
          activityId: activity.id,
          formData,
          activityType: activity.type,
        }),
      )
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: [`image/jpg`, `image/jpeg`, `image/png`, `video/mp4`],
    multiple: false,
    maxSize: fileLimits.journeyMedia,
    noDrag: true,
    onDropRejected,
    onDropAccepted,
  })

  return (
    <>
      <MDBModal
        isOpen={visible && !isEditDescriptionModalVisible}
        toggle={onClose}
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}
        backdropTransitionTimeout={0}
        modalTransitionTimeout={0}
        size={`sm`}
        centered
        aria-label={`edit-journey-modal`}
        aria-hidden={(!visible).toString()}
      >
        <MDBModalHeader className={`d-flex justify-content-end mt-0 pb-0`}>
          <button
            className={Styles.closeButton}
            onClick={onClose}
            role={`button`}
            aria-label={`close`}
          >
            <CloseIcon className={`position-absolute`} />
          </button>
        </MDBModalHeader>

        <MDBModalBody
          className={cx(
            Styles.actionButtonsContainer,
            `d-flex flex-column align-items-center pt-0`,
          )}
        >
          <button
            onClick={handleMakeFirstPhoto}
            role={`button`}
            aria-label={`make-first-photo`}
          >
            {t(`common:makeFirstPhotoOrVideo`)}
          </button>

          <button
            onClick={handleEditDescription}
            role={`button`}
            aria-label={`description`}
          >
            {t(journey?.description ? `editDescription` : `addDescription`)}
          </button>

          <button
            onClick={handlePhotoRemove}
            role={`button`}
            aria-label={`remove-photo`}
          >
            {t(`removePhotoOrVideo`)}
          </button>

          <button
            {...getRootProps({
              type: `button`,
            })}
          >
            <input {...getInputProps({ alt: `upload-media` })} />
            {t(`addPhotoOrVideo`)}
          </button>

          <button
            className={Styles.destructive}
            onClick={handleJourneyDelete}
            role={`button`}
            aria-label={`delete-journey`}
          >
            {t(`deleteJourney`)}
          </button>
        </MDBModalBody>
      </MDBModal>

      <EditJourneyDescriptionModal
        visible={isEditDescriptionModalVisible}
        onClose={() => setEditDescriptionModalVisible(false)}
        activity={activity}
        journey={journey}
      />
    </>
  )
}

export default EditJourneyModal

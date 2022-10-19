import cx from "classnames"
import { useFormik } from "formik"
import _ from "lodash"
//Components
import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact"
import * as React from "react"
//Hooks
import { useMemo,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

//Icons
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg"
import { actions } from "../../store"
//Types
import { Activity, ActivityType, Journey } from "../../store/types"
import Button from "../Button/Button"
import MessageModal from "../MessageModal"
import TextArea from "../TextField/TextArea"
//Styles
import Styles from "./index.module.scss"

interface EditJourneyDescriptionModalProps {
  visible: boolean
  onClose: () => void
  activity: Activity
  journey: Journey
}

interface FormValues {
  description: string
}

const MAX_DESCRIPTION_LENGTH = 140

/**
 * Modal containing the form that allows to edit the journey description
 * @param {object} props Component props
 * @param {boolean} props.visible Value that indicated if the modal should be visible or not
 * @param {Function} props.onClose Function that will be called after the modal is closed
 * @param {Activity} props.activity Activity to which the journey belongs
 * @param {Journey} props.journey The journey whose description is being edited
 */
const EditJourneyDescriptionModal: React.VFC<EditJourneyDescriptionModalProps> = ({
  visible,
  onClose,
  activity,
  journey,
}) => {
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const initialValues = useMemo<FormValues>(
    () => ({
      description: journey.description ?? ``,
    }),
    [journey],
  )

  const { t } = useTranslation(`common`)

  const validationSchema = yup.object<FormValues>({
    description: yup
      .string()
      .max(
        MAX_DESCRIPTION_LENGTH,
        t(`errors:maximumNumberOfCharacters`, {
          count: MAX_DESCRIPTION_LENGTH,
        }),
      )
      .ensure()
      .default(``)
      .required(),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(
          (activity.type === ActivityType.SPIRIT
            ? actions.addDescriptionSpiritJourney
            : actions.addJourneyDescription)({
            activityId: activity.id,
            journeyId: journey.id,
            description: values.description,
            activityType: activity.type,
          }),
        )

        const showSuccessModal = !_.isEqual(values, initialValues)
        setSuccessModalVisible(showSuccessModal)
        if (!showSuccessModal) {
          onClose()
        }
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
    enableReinitialize: true,
  })

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false)
    onClose()
  }

  return (
    <>
      <MDBModal
        className={Styles.modal}
        isOpen={visible && !isSuccessModalVisible}
        toggle={onClose}
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}
        backdropTransitionTimeout={0}
        modalTransitionTimeout={0}
        size={`md`}
        centered
        aria-label={`edit-journey-description-modal`}
        aria-hidden={(!visible).toString()}
      >
        <form onSubmit={handleSubmit}>
          <MDBModalHeader
            className={cx(Styles.header, `d-flex align-items-center mt-0 pb-0`)}
            tag={`div`}
          >
            <div className={`d-flex justify-content-end`}>
              <button
                className={Styles.closeButton}
                type={`button`}
                onClick={onClose}
                role={`button`}
                aria-label={`close`}
              >
                <CloseIcon />
              </button>
            </div>

            <h3>{t(`journeyItemDescription`)}</h3>
            <p className={`text-1 font-weight-normal`}>
              {t(`addJourneyItemDescription`)}
            </p>
          </MDBModalHeader>

          <MDBModalBody>
            <TextArea
              className={`w-100`}
              name={`description`}
              value={values.description}
              onChange={handleChange}
              placeholder={t(`enterJourneyDescription`)}
              error={touched.description && errors.description}
            />
          </MDBModalBody>

          <MDBModalFooter>
            <Button
              type={`submit`}
              disabled={isSubmitting}
              role={`button`}
              ariaLabel={`submit`}
            >
              {t(`saveDescription`)}
            </Button>
          </MDBModalFooter>
        </form>
      </MDBModal>

      <MessageModal
        title={t(`common:success`)}
        message={t(`common:journeyDescriptionSaved`)}
        visible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
      />
    </>
  )
}

export default EditJourneyDescriptionModal

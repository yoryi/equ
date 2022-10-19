import { useFormik } from "formik"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

//Actions
import * as actions from "../../store/actions"
//Types
import { Activity,ReferenceType } from "../../store/types"
//Components
import Modal from "../Modal/Modal"
import TextField from "../TextField/TextField"
//Styles
import Styles from "./index.module.scss"

interface AddReferenceModalProps {
  visible: boolean
  onClose: () => void
}

type AddAcademicReferenceModalProps = {
  referenceType: ReferenceType.Academic
  activity?: undefined
} & AddReferenceModalProps

type AddActivityReferenceModalProps = {
  referenceType: ReferenceType.Activity
  activity: Activity
} & AddReferenceModalProps

interface FormValues {
  email: string
}

const AddReferenceModal: React.FC<
  AddAcademicReferenceModalProps | AddActivityReferenceModalProps
> = ({ visible, onClose, referenceType, activity }) => {
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { t } = useTranslation()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t(`errors:invalidEmailAddress`))
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:email`) })),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik<FormValues>({
    initialValues: {
      email: ``,
    },
    validationSchema,
    onSubmit: async ({ email }, { setErrors }) => {
      try {
        await dispatch(
          actions.sendReferenceLink(
            referenceType === ReferenceType.Academic
              ? {
                  type: ReferenceType.Academic,
                  email,
                }
              : { type: ReferenceType.Activity, email, activity: activity! },
          ),
        )

        onClose()
        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
  })

  useEffect(() => {
    resetForm()
  }, [resetForm, visible])

  const handleSuccessModalClose = () => setSuccessModalVisible(false)

  return (
    <>
      <Modal
        title={t(`profile.student.transcriptScreen.requestAcademicReference`)}
        isOpen={visible}
        toggle={onClose}
        footer={t(`profile.student.transcriptScreen.requestReference`)}
        footerAction={handleSubmit}
        footerButtonAriaLabel={`submit`}
        disabledFooterButton={isSubmitting}
        closeIcon
      >
        <TextField
          id={`email`}
          name={`email`}
          title={t(`profile.student.transcriptScreen.enterEmailAddressBelow`)}
          value={values.email}
          onChange={handleChange}
          error={touched.email && errors.email}
          size={`lg`}
        />
      </Modal>

      <Modal
        isOpen={isSuccessModalVisible}
        toggle={handleSuccessModalClose}
        title={t(`common:success`)}
        size={`sm`}
        footer={t(`common:continue`)}
        footerAction={handleSuccessModalClose}
        footerStyle={{ marginBottom: 32 }}
        closeIcon
      >
        <p className={Styles.modalMessage}>
          {t(`common:referenceRequestedSuccessfully`)}
        </p>
      </Modal>
    </>
  )
}

export default AddReferenceModal

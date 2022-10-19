//Utils
import classNames from "classnames"
import { useFormik } from "formik"
//Components
import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"

//Actions
import * as actions from "../../store/actions"
//Types
import {
  ReduxState,
  UniversityAdminData,
  UniversityAdministrator,
} from "../../store/types"
import Button from "../Button/Button"
import Checkbox from "../Checkbox/Checkbox"
import MessageModal from "../MessageModal"
import Modal from "../Modal/Modal"
import TextField from "../TextField/TextField"
//Styles
import Styles from "./index.module.scss"

interface AssignUniversityModalProps {
  visible: boolean
  onClose: () => void
}

const AssignUniversityModal: React.VFC<AssignUniversityModalProps> = ({
  visible,
  onClose,
}) => {
  const university = useSelector<ReduxState, UniversityAdminData>(
    (state) => state.admin.university!,
  )
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { t } = useTranslation()

  const { values, handleChange, handleSubmit, isSubmitting } = useFormik<
    UniversityAdministrator & { confirmed: boolean }
  >({
    initialValues: {
      firstName: ``,
      lastName: ``,
      email: ``,
      phone: ``,
      position: ``,
      confirmed: false,
    },
    onSubmit: async (universityAdministrator, { setErrors }) => {
      try {
        await dispatch(actions.assignUniversityProfile(universityAdministrator))
        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
  })

  return (
    <>
      <Modal
        titleClassName={`px-4`}
        bodyClassName={`px-4`}
        title={t(`university.assignUniversity`, { university })}
        isOpen={visible && !isSuccessModalVisible}
        toggle={onClose}
        closeIcon
      >
        <p className={`text-1 text-center`}>
          {t(`university.assignUniversityDescription`)}
        </p>

        <form
          className={`d-flex flex-column align-items-center mt-5 pb-5`}
          onSubmit={handleSubmit}
        >
          <MDBRow className={classNames(Styles.row, `my-n2`)}>
            <MDBCol className={`my-2`} size={`6`}>
              <TextField
                className={`m-0 w-auto`}
                name={`firstName`}
                value={values.firstName}
                onChange={handleChange}
                title={t(`common:firstName`)}
                placeholder={t(`common:firstName`)}
              />
            </MDBCol>

            <MDBCol className={`my-2`} size={`6`}>
              <TextField
                className={`m-0 w-auto`}
                name={`lastName`}
                value={values.lastName}
                onChange={handleChange}
                title={t(`common:lastName`)}
                placeholder={t(`common:lastName`)}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className={classNames(Styles.row, `my-n2`)}>
            <MDBCol className={`my-2`} size={`6`}>
              <TextField
                className={`m-0 w-auto`}
                inputStyle={{ margin: 0 }}
                name={`email`}
                value={values.email}
                onChange={handleChange}
                title={t(`common:email`)}
                placeholder={t(`common:email`)}
              />
            </MDBCol>

            <MDBCol className={`my-2`} size={`6`}>
              <TextField
                className={`m-0 w-auto`}
                inputStyle={{ margin: 0 }}
                name={`position`}
                value={values.position}
                onChange={handleChange}
                title={t(`common:position`)}
                placeholder={t(`common:position`)}
              />
            </MDBCol>
          </MDBRow>

          <div
            className={classNames(
              Styles.checkboxContainer,
              `d-flex align-items-center mt-5`,
            )}
          >
            <Checkbox
              className={`mr-3`}
              id={`confirmed`}
              name={`confirmed`}
              checked={values.confirmed}
              onChange={handleChange}
            />

            <label
              className={classNames(Styles.label, `text-3`)}
              htmlFor="confirmed"
            >
              {t(`university.assignUniversityConfirmation`, { university })}
            </label>
          </div>

          <Button
            className={`mt-5`}
            type={`submit`}
            disabled={!values.confirmed || isSubmitting}
          >
            {t(`university.submitAndEmail`)}
          </Button>
        </form>
      </Modal>

      <MessageModal
        title={t(`common:success`)}
        message={t(`university.profileHasBeenSuccessfullyAssignedToUniversity`)}
        visible={isSuccessModalVisible}
        onClose={() => {
          onClose()
          setSuccessModalVisible(false)
        }}
      />
    </>
  )
}

export default AssignUniversityModal

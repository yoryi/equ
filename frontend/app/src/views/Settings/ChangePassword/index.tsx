import { useFormik } from "formik"
//Components
import { MDBCol,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

import Button from "../../../components/Button/Button"
import MessageModal from "../../../components/MessageModal"
import PasswordField from "../../../components/TextField/PasswordField"
//Constants
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "../../../const/password"
import useLoader from "../../../hooks/useLoader"
//Actions
import * as actions from "../../../store/actions"
//Types
import { ChangePasswordPayload } from "../../../store/actions/auth/payloads"
//Styles
import Styles from "./index.module.scss"

const ChangePassword: React.VFC = () => {
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { t } = useTranslation()

  const initialValues: ChangePasswordPayload = {
    oldPassword: ``,
    password: ``,
  }

  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:password`) })),
    password: yup
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        t(`errors:tooShort`, { name: t(`common:password`) }),
      )
      .max(
        PASSWORD_MAX_LENGTH,
        t(`errors:tooLong`, { name: t(`common:password`) }),
      )
      .matches(PASSWORD_REGEX, t(`errors:tooWeak`, { name: t(`password`) }))
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:newPassword`) })),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<ChangePasswordPayload>({
    initialValues,
    validationSchema,
    onSubmit: async (payload, { setSubmitting, setErrors }) => {
      try {
        await dispatch(actions.changePassword(payload))
        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }

      setSubmitting(false)
    },
  })

  const { onLoadComplete } = useLoader()

  useEffect(onLoadComplete, [])

  return (
    <>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <h3 className={`d-none d-md-block`}>
          {t(`settings.changePassword.changePassword`)}
        </h3>
        <h1 className={`d-block d-md-none mb-2`}>
          {t(`settings.changePassword.changePassword`)}
        </h1>

        <MDBRow>
          <MDBCol md={`6`} sm={`12`}>
            <PasswordField
              className={Styles.input}
              name={`oldPassword`}
              title={t(`common:oldPassword`)}
              placeholder={t(`common:oldPassword`)}
              value={values.oldPassword}
              onChange={handleChange}
              error={touched.oldPassword && errors.oldPassword}
              size={`auto`}
            />
          </MDBCol>

          <MDBCol md={`6`} sm={`12`}>
            <PasswordField
              className={Styles.input}
              name={`password`}
              title={t(`common:newPassword`)}
              placeholder={t(`common:passwordPlaceholder.8orMoreCharacters`)}
              value={values.password}
              onChange={handleChange}
              error={touched.password && errors.password}
              size={`auto`}
              strengthIndicator
            />
          </MDBCol>
        </MDBRow>

        <Button
          className={Styles.button}
          type={`submit`}
          disabled={isSubmitting}
        >
          {t(`common:saveChanges`)}
        </Button>
      </form>

      <MessageModal
        title={t(`common:success`)}
        message={t(`common:passwordSuccessfullyChanged`)}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
  )
}

export default ChangePassword

import { useFormik } from "formik"
//Types
import { FormikValues } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"
//Hooks
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

import Button from "../../components/Button/Button"
//Components
import PasswordField from "../../components/TextField/PasswordField"
//Constants
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "../../const/password"
import history from "../../history"
import i18n from "../../services/i18n"
//Actions
import * as actions from "../../store/actions"

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      i18n.t(`errors:tooShort`, { name: i18n.t(`common:password`) }),
    )
    .max(
      PASSWORD_MAX_LENGTH,
      i18n.t(`errors:tooLong`, { name: i18n.t(`common:password`) }),
    )
    .matches(
      PASSWORD_REGEX,
      i18n.t(`errors:tooWeak`, { name: i18n.t(`password`) }),
    )
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:password`) }),
    ),
  repeatPassword: yup
    .string()
    .oneOf(
      [yup.ref(`newPassword`), undefined],
      i18n.t(`errors:passwordMustMatch`),
    )
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:password`) }),
    ),
})

const ChangePassword = () => {
  const dispatch = useDispatch()
  const initialValues: FormikValues = {
    newPassword: ``,
    repeatPassword: ``,
  }

  const token = history.location.search.split(`=`)[1]

  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ newPassword }, { setSubmitting, setErrors }) => {
      dispatch(actions.resetPassword({ token, password: newPassword }))
        .then(() => {
          history.push(``)
        })
        .catch(({ errors }: { errors: { [key: string]: string } | null }) =>
          setErrors({
            newPassword: errors?.password,
          }),
        )
        .finally(() => setSubmitting(false))
    },
  })

  const { t } = useTranslation()

  return (
    <div className="change-password change-password-view">
      <div className="change-password-title change-password-view-title">
        {t(`signIn.forgotPassword.createNewPasswordScreen.createNewPassword`)}
      </div>

      <PasswordField
        name={`newPassword`}
        onChange={handleChange}
        value={values.newPassword}
        placeholder={t(`common:passwordPlaceholder.8orMoreCharacters`)}
        title={t(`signIn.forgotPassword.createNewPasswordScreen.newPassword`)}
        error={touched.newPassword && (errors.newPassword as string)}
        strengthIndicator
      />

      <PasswordField
        name={`repeatPassword`}
        onChange={handleChange}
        value={values.repeatPassword}
        placeholder={t(
          `signIn.forgotPassword.createNewPasswordScreen.repeatYourPassword`,
        )}
        title={t(
          `signIn.forgotPassword.createNewPasswordScreen.repeatYourPassword`,
        )}
        error={touched.repeatPassword && (errors.repeatPassword as string)}
      />

      <div className="change-password-submit change-password-view-submit">
        <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
          {t(`signIn.forgotPassword.createNewPasswordScreen.saveNewPassword`)}
        </Button>
      </div>
    </div>
  )
}

export default ChangePassword

import { FormikErrors , useFormik } from "formik"
import React from "react"
//Hooks
import { useEffect } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import Button from "../../../../components/Button/Button"
//Components
import MessageModal from "../../../../components/MessageModal"
import PasswordField from "../../../../components/TextField/PasswordField"
//Constants
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "../../../../const/password"
import useLoader from "../../../../hooks/useLoader"
import i18n from "../../../../services/i18n"
import { actions } from "../../../../store"
import { ChangePasswordPayload } from "../../../../store/actions/auth/payloads"

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .min(6, i18n.t(`errors:tooShort`, { name: i18n.t(`common:password`) }))
    .required(
      i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:password`) }),
    ),
  password: yup
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
})

export const ChangePassword = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { isChangePasswordModalOpen } = useSelector(
    (state: any) => state.settings,
  )

  const initialValues: ChangePasswordPayload = {
    oldPassword: ``,
    password: ``,
  }

  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik<ChangePasswordPayload>({
    initialValues,
    validationSchema,
    onSubmit: (payload, { setErrors, setSubmitting }) => {
      dispatch(actions.changePassword(payload))
        .catch(
          ({
            errors,
            message,
          }: {
            errors: FormikErrors<ChangePasswordPayload>
            message: string
          }) => {
            if (message) {
              toast.error(message)
            }

            setErrors(errors ?? {})
          },
        )
        .finally(() => setSubmitting(false))
    },
  })

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    onLoadComplete()
  }, [])

  return (
    <div className="change-password-container">
      <div className="change-password-title">
        {t(`changePasswordScreen.changePassword`)}
      </div>

      <div className="change-password-row mx-n2">
        <PasswordField
          className={`mx-2`}
          name={`oldPassword`}
          onChange={handleChange}
          value={values.oldPassword}
          placeholder={t(`common:oldPassword`)}
          title={t(`common:oldPassword`)}
          error={touched.oldPassword && (errors.oldPassword as string)}
        />

        <PasswordField
          className={`mx-2`}
          name={`password`}
          onChange={handleChange}
          value={values.password}
          placeholder={t(`common:passwordPlaceholder.8orMoreCharacters`)}
          title={t(`common:newPassword`)}
          error={touched.password && (errors.password as string)}
          strengthIndicator
        />
      </div>

      <div className="change-password-submit mx-auto">
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
        >
          {t(`common:saveChanges`)}
        </Button>
      </div>

      <MessageModal
        visible={isChangePasswordModalOpen}
        onClose={() => dispatch(actions.toggleChangePasswordModal(false))}
        title={t(`common:success`)}
        message={t(`common:passwordChanged`)}
      />
    </div>
  )
}

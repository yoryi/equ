import { FormikValues,useFormik } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

import Button from "../../components/Button/Button"
import TextField from "../../components/TextField/TextField"
import history from "../../history"
import i18n from "../../services/i18n"

const validationSchema = yup.object({
  email: yup
    .string()
    .min(4, i18n.t(`errors:tooShort`, { name: i18n.t(`common:email`) }))
    .max(20, i18n.t(`errors:tooLong`, { name: i18n.t(`common:email`) }))
    .email(i18n.t(`errors:invalidEmailAddress`))
    .required(i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:email`) })),
})

const UniversityRegister = () => {
  const { t } = useTranslation()

  const initialValues: FormikValues = {
    email: ``,
  }

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
    onSubmit: () => {
      history.push(`/register-university-intro`)
    },
  })

  return (
    <div className="register">
      <div className="register-title university-register-title">
        {t(`signUp.university.signUpFormScreen.requestUniversityProfile`)}
      </div>
      <TextField
        onChange={handleChange(`email`)}
        value={values.email}
        placeholder={t(`common:emailPlaceholder.exampleEmail`)}
        title={t(`common:email`)}
        error={touched.email && (errors.email as string)}
      />
      <div className="register-submit" style={{ marginTop: 40 }}>
        <Button
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
          type={`submit`}
        >
          {t(`common:continue`)}
        </Button>
        <div className="register-submit-text">
          {t(`common:byClickingYouAgreeToTermsOfUse`)}
        </div>
      </div>
      <div
        className="register-sign-up"
        onClick={() => history.push(`/register`)}
      >
        {t(`signUp.university.signUpFormScreen.signUpAsStudent`)}
      </div>
    </div>
  )
}

export default UniversityRegister

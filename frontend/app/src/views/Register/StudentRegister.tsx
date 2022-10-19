import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useFormik } from "formik"
import React from "react"
//Hooks
import { useRef,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//Components
import { Trans } from "react-i18next"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import * as yup from "yup"

import Button from "../../components/Button/Button"
import Checkbox from "../../components/Checkbox/Checkbox"
import MessageModal from "../../components/MessageModal"
import PasswordField from "../../components/TextField/PasswordField"
import TextField from "../../components/TextField/TextField"
//Constants
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "../../const/password"
import i18n from "../../services/i18n"
import * as actions from "../../store/actions"
import { SignUpPayload } from "../../store/actions/auth/payloads"
//Styles
import Styles from "./StudentRegister.module.scss"

const StudentRegister = () => {
  const dispatch = useDispatch()

  const [isEmailModalVisible, setEmailModalVisible] = useState(false)

  const captchaRef = useRef<HCaptcha>(null)

  const { t } = useTranslation()

  const initialValues: SignUpPayload = {
    email: ``,
    password: ``,
    captchaToken: ``,
    remember: false,
    termsOfUseAccepted: false,
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .min(4, i18n.t(`errors:tooShort`, { name: i18n.t(`common:email`) }))
      .max(1000, i18n.t(`errors:tooLong`, { name: i18n.t(`common:email`) }))
      .email(i18n.t(`errors:invalidEmailAddress`))
      .required(
        i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:email`) }),
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
    captchaToken: yup.string().required(i18n.t(`errors:captchaNotCompleted`)),
  })

  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = useFormik<SignUpPayload>({
    initialValues,
    validationSchema,
    onSubmit: async (payload, { setErrors, setFieldValue }) => {
      try {
        await dispatch(actions.signUp(payload))
        setEmailModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
        captchaRef.current?.resetCaptcha()
        setFieldValue(`captchaToken`, ``, false)
      }
    },
    enableReinitialize: true,
  })

  return (
    <div className="register">
      <div className="register-title">
        {t(`signUp.student.signUpFormScreen.findTheBestUniversityMatch`)}
      </div>

      <form
        className={`w-100`}
        autoComplete="on"
        onSubmit={(e) => {
          if (!values.captchaToken.length) {
            e.preventDefault()
            captchaRef.current?.execute()
            return
          }

          handleSubmit(e)
        }}
      >
        <TextField
          onChange={handleChange(`email`)}
          value={values.email}
          placeholder={t(`common:emailPlaceholder.exampleEmail`)}
          type={`email`}
          title={t(`common:email`)}
          error={touched.email && errors.email}
          size={`auto`}
        />

        <PasswordField
          name={`password`}
          onChange={handleChange}
          value={values.password}
          placeholder={t(`common:passwordPlaceholder.8orMoreCharacters`)}
          title={t(`common:password`)}
          error={touched.password && errors.password}
          size={`auto`}
          strengthIndicator
        />

        <div className={`d-flex align-items-center`}>
          <Checkbox
            id={`remember`}
            name={`remember`}
            checked={values.remember}
            onChange={handleChange}
          />

          <label
            htmlFor={`remember`}
            className={`position-relative small ml-2 mb-0`}
            style={{ top: -1 }}
          >
            {t(`common:keepMeSignedIn`)}
          </label>
        </div>

        <div className={`d-flex mt-3`}>
          <Checkbox
            id={`termsOfUseAccepted`}
            name={`termsOfUseAccepted`}
            checked={values.termsOfUseAccepted}
            onChange={handleChange}
          />

          <label
            htmlFor={`termsOfUseAccepted`}
            className={`position-relative text-left small ml-2 mb-0`}
            style={{ top: -2, lineHeight: `150%` }}
          >
            <Trans
              i18nKey={`common:termsOfUseAgreement`}
              components={[
                <Link
                  to={`/terms-of-use`}
                  className={Styles.link}
                  target={`_blank`}
                />,
                <Link
                  to={`/privacy-policy`}
                  className={Styles.link}
                  target={`_blank`}
                />,
              ]}
            />
          </label>
        </div>

        <div className={`d-flex flex-column mt-4`}>
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY!}
            onVerify={(token) => {
              setFieldValue(`captchaToken`, token)
              handleSubmit()
            }}
            size={`invisible`}
          />
        </div>

        <div className="register-submit mt-4">
          <Button
            type="submit"
            size={`auto`}
            disabled={!values.termsOfUseAccepted}
          >
            {t(`common:continue`)}
          </Button>
        </div>
      </form>

      <MessageModal
        title={t(`common:success`)}
        message={t(`signUp.student.signUpFormScreen.pleaseCheckYourInbox`)}
        visible={isEmailModalVisible}
        onClose={() => setEmailModalVisible(false)}
      />
    </div>
  )
}

export default StudentRegister

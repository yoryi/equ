import classNames from "classnames"
import { useFormik } from "formik"
import qs from "querystring"
import * as React from "react"
//Hooks
import { useEffect, useMemo,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { useLocation } from "react-router"
//Utils
import * as yup from "yup"

import Button from "../../components/Button/Button"
import FileInput from "../../components/FileInput"
import Modal from "../../components/Modal/Modal"
//Components
import TextField from "../../components/TextField/TextField"
//Constants
import fileLimits from "../../const/fileLimits"
import useLoader from "../../hooks/useLoader"
//Actions
import * as actions from "../../store/actions"
//Types
import {
  ReduxState,
  ReferenceType,
  UnsubmittedReference,
} from "../../store/types"
//Styles
import Styles from "./index.module.scss"

interface FormValues {
  firstName: string
  lastName: string
  organization: string
  position: string
  image: File | null
  content: string
}

const AddReference: React.FC = () => {
  const reference = useSelector<ReduxState, UnsubmittedReference | null>(
    (state) => state.profile.reference,
  )
  const dispatch = useDispatch()

  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
    false,
  )

  const { onLoadComplete } = useLoader()

  const { t } = useTranslation()

  const { search } = useLocation()

  const { user, userId = parseInt(user), token } = qs.parse(
    search.substring(1),
  ) as { user: string; userId: undefined; token: string }

  useEffect(() => {
    dispatch(actions.getReference({ userId, token }))
  }, [userId, token])

  useEffect(() => {
    if (!reference) {
      return
    }

    onLoadComplete()
  }, [reference])

  const initialValues = useMemo<FormValues>(
    () => ({
      firstName: reference?.firstName ?? ``,
      lastName: reference?.lastName ?? ``,
      organization:
        (reference?.type === ReferenceType.Activity
          ? reference?.extraData?.activityTitle
          : reference?.organization) ?? ``,
      position: reference?.position ?? ``,
      image: null,
      content: reference?.content ?? ``,
    }),
    [reference],
  )

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:firstName`) })),
    lastName: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:lastName`) })),
    organization: yup.string(),
    position: yup
      .string()
      .required(
        t(`errors:cannotBeEmpty`, { name: t(`addReferenceScreen.position`) }),
      ),
    content: yup
      .string()
      .min(20, t(`errors:tooShort`, { name: t(`common:reference`) }))
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:reference`) })),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(
          actions.addReference({
            ...values,
            userId,
            token,
          }),
        )

        setConfirmationModalVisible(false)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
    enableReinitialize: true,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files?.[0] &&
      e.target.files[0].size > fileLimits.referenceMedia
    ) {
      toast.error(
        t(`errors:fileIsTooBig`, { limit: fileLimits.referenceMedia }),
      )
      return
    }

    setFieldValue(`image`, e.target.files?.item(0) ?? null)
  }

  useEffect(() => {
    if (!errors) {
      return
    }

    setConfirmationModalVisible(false)
  }, [errors])

  return (
    <>
      <div className={Styles.container}>
        <h1 className={Styles.title}>
          {t(`common:referenceFor`, {
            reference: t(
              `common:${
                reference?.type === ReferenceType.Academic
                  ? `academic`
                  : `activity`
              }Reference`,
            ),
            name: reference?.studentName,
          })}
        </h1>

        <h6 className={Styles.description}>
          {t(
            `addReferenceScreen.${
              reference?.type === ReferenceType.Academic
                ? `academic`
                : `activity`
            }ReferenceDescription`,
            {
              name: reference?.studentName,
              firstName: reference?.studentName.split(` `)[0],
            },
          )}
        </h6>

        <form
          className={Styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            setConfirmationModalVisible(true)
          }}
        >
          <div className={classNames(Styles.row, `mx-n2`)}>
            <TextField
              className={classNames(Styles.input, `mx-2`)}
              name={`firstName`}
              title={t(`common:firstName`)}
              placeholder={t(`common:firstName`)}
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && errors.firstName}
            />

            <TextField
              className={classNames(Styles.input, `mx-2`)}
              name={`lastName`}
              title={t(`common:lastName`)}
              placeholder={t(`common:lastName`)}
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && errors.lastName}
            />
          </div>

          <div className={classNames(Styles.row, `mx-n2`)}>
            <TextField
              className={classNames(Styles.input, `mx-2`)}
              name={`organization`}
              title={t(
                reference?.type === ReferenceType.Academic
                  ? `addReferenceScreen.classesTaught`
                  : `addReferenceScreen.activityName`,
              )}
              placeholder={t(
                reference?.type === ReferenceType.Academic
                  ? `addReferenceScreen.classesTaughtPlaceholder`
                  : `addReferenceScreen.activityName`,
              )}
              disabled={reference?.type === ReferenceType.Activity}
              value={values.organization}
              onChange={handleChange}
              error={touched.organization && errors.organization}
            />

            <TextField
              className={classNames(Styles.input, `mx-2`)}
              name={`position`}
              title={t(`addReferenceScreen.position`)}
              placeholder={t(`addReferenceScreen.teacherPositionPlaceholder`)}
              value={values.position}
              onChange={handleChange}
              error={touched.position && errors.position}
            />
          </div>

          <div>
            <FileInput
              accept={`image/*`}
              filename={values.image?.name ?? null}
              onChange={handleImageChange}
            />
          </div>

          <TextField
            className={Styles.input}
            name={`content`}
            title={t(`common:reference`)}
            placeholder={t(`common:reference`)}
            value={values.content}
            onChange={handleChange}
            error={touched.content && errors.content}
            rows={12}
            textArea
          />

          <div className={Styles.buttonsContainer}>
            <Button className={Styles.button} size={`md`} type={`submit`}>
              {t(`addReferenceScreen.submitReference`)}
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isConfirmationModalVisible}
        toggle={() => setConfirmationModalVisible(!isConfirmationModalVisible)}
        title={t(`addReferenceScreen.readyToSubmit`)}
        size={`md`}
        footer={t(`addReferenceScreen.submitReference`)}
        footerAction={handleSubmit}
        footerStyle={{ marginBottom: 32 }}
        disabledFooterButton={isSubmitting}
      >
        <p className={Styles.modalMessage}>
          {t(
            `addReferenceScreen.confirmationMessage.${
              reference?.type === ReferenceType.Academic
                ? `academic`
                : `activity`
            }`,
            { name: reference?.studentName },
          )}
        </p>
      </Modal>

      <Modal
        isOpen={!isConfirmationModalVisible && !!reference?.content}
        title={t(`addReferenceScreen.thankYouForSubmitting`)}
        size={`md`}
        footer={t(`addReferenceScreen.closeWindow`)}
        footerAction={() => window.self.close()}
        footerStyle={{ marginBottom: 32 }}
      >
        <p className={Styles.modalMessage}>
          {t(`addReferenceScreen.yourReferenceHasBeenSent`, {
            name: reference?.studentName,
          })}
        </p>
      </Modal>
    </>
  )
}

export default AddReference

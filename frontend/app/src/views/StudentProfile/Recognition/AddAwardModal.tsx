import { useFormik } from "formik"
import * as React from "react"
//Hooks
import { useEffect, useMemo,useState } from "react"
//Services
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

import Datepicker from "../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../components/MessageModal"
import Modal from "../../../components/Modal/Modal"
import TextField from "../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../store"
import { Award,AwardType } from "../../../store/types"

export interface AddAwardModalProps {
  isOpen: boolean
  toggle: () => void
  type: AwardType
}

export const AddAwardModal: React.FC<AddAwardModalProps> = ({
  isOpen,
  toggle,
  type,
}) => {
  const dispatch = useDispatch()

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const initialValues = useMemo<Award>(
    () => ({
      name: ``,
      organisation: ``,
      month: ``,
      year: ``,
      type: ``,
    }),
    [],
  )

  const { t } = useTranslation()

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:awardName`) })),
    organisation: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:organization`) })),
    month: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
    year: yup
      .number()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
  })

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    resetForm,
  } = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: async ({ name, organisation, month, year }, { setErrors }) => {
      const date = new Date(year, month - 1)

      try {
        await dispatch(actions.createAward({ name, organisation, date, type }))
        setSuccessModalVisible(true)
      } catch (err) {
        if (err.message) {
          toast.error(err.message)
        }

        setErrors(err.errors ?? {})
      }
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [resetForm, isOpen])

  return (
    <>
      <Modal
        title={t(`profile.student.recognitionScreen.addAward`, {
          name: t(
            `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
          ),
        })}
        subtitle={t(
          `profile.student.recognitionScreen.addAwardToYourEquediProfile`,
          {
            name: t(
              `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
            ),
          },
        )}
        isOpen={isOpen && !isSuccessModalVisible}
        toggle={() => {
          if (
            !values.name &&
            !values.organisation &&
            !values.month &&
            !values.year
          ) {
            toggle()
            document.body.className = ``
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div className="add-award-modal-body">
            <TextField
              name={`name`}
              value={values.name}
              onChange={handleChange}
              error={touched.name && (errors.name as string)}
              placeholder={t(`common:name`)}
              title={t(`common:awardName`)}
            />

            <TextField
              name={`organisation`}
              value={values.organisation || ``}
              onChange={handleChange}
              error={touched.organisation && (errors.organisation as string)}
              placeholder={t(`common:organization`)}
              title={t(`common:awardingOrganization`)}
            />

            <Datepicker
              title={t(`common:date`)}
              setFieldValue={setFieldValue}
              fromMonth={values.month}
              fromYear={values.year}
              error={
                (touched.month || touched.year) &&
                ((errors.month ?? errors.year) as string)
              }
              type="Month"
            />
            {isUnsavedModalOpen ? (
              <UnsavedChangesModal
                isOpen={isUnsavedModalOpen}
                footerLeaveAction={() => {
                  toggleUnsavedModal(false)
                  toggle()
                  document.body.className = ``
                }}
                footerStayAction={() => toggleUnsavedModal(false)}
              />
            ) : null}
          </div>
        }
        footer={t(`profile.student.recognitionScreen.addAwards`)}
        footerAction={() => handleSubmit()}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.recognitionScreen.awardCreated`)}
        visible={isSuccessModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
          toggle()
          document.body.className = ``
        }}
      />
    </>
  )
}

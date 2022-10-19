import { useFormik } from "formik"
import _ from "lodash"
import moment from "moment"
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

export interface EditAwardModalProps {
  isOpen?: number
  toggle: () => void
  type: AwardType
  award: Award
}

export const EditAwardModal: React.FC<EditAwardModalProps> = ({
  isOpen,
  toggle,
  type,
  award,
}) => {
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { t } = useTranslation()

  const initialValues = useMemo<Award>(
    () => ({
      name: award.name,
      organisation: award.organisation,
      month: award.date ? moment(award.date).format(`M`) : ``,
      year: award.date ? moment(award.date).format(`YYYY`) : ``,
      type: award.type,
      order: award.order,
    }),
    [award],
  )

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
    onSubmit: async (
      { name, organisation, year, month, order },
      { setErrors },
    ) => {
      const date = new Date(year, month - 1)

      try {
        await dispatch(
          actions.updateAward({
            id: award.id,
            name,
            organisation,
            date,
            type,
            order,
          }),
        )

        const showSuccessModal = !_.isEqual(
          { name, organisation, month, year, type, order },
          initialValues,
        )
        setSuccessModalVisible(showSuccessModal)
        if (!showSuccessModal) {
          toggle()
        }
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
  }, [isOpen])

  return (
    <>
      <Modal
        title={t(`profile.student.recognitionScreen.editAward`, {
          name: t(
            `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
          ),
        })}
        subtitle={t(
          `profile.student.recognitionScreen.editAwardToYourEquediProfile`,
          {
            name: t(
              `profile.student.recognitionScreen.awardTypes.${type.toLowerCase()}`,
            ),
          },
        )}
        isOpen={isOpen === award.id && !isSuccessModalVisible}
        toggle={() => {
          const oldDate = award.date ? new Date(award.date) : null
          const newDate =
            values.month && values.year
              ? new Date(values.year, values.month - 1)
              : null
          if (
            (!values.name || (values.name && values.name === award.name)) &&
            (!values.organisation ||
              (values.organisation &&
                values.organisation === award.organisation)) &&
            oldDate &&
            newDate &&
            oldDate.getTime() === newDate.getTime()
          ) {
            toggle()
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
              value={values.organisation ?? ``}
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
                }}
                footerStayAction={() => toggleUnsavedModal(false)}
              />
            ) : null}
          </div>
        }
        footer={t(`profile.student.recognitionScreen.updateAward`)}
        footerAction={() => handleSubmit()}
        deleteFooter={t(`profile.student.recognitionScreen.deleteAward`)}
        deleteAction={() => {
          const date = new Date(values.year, values.month - 1)
          dispatch(
            actions.deleteAward({
              id: award.id,
              name: values.name,
              organisation: values.organisation,
              date,
              type,
            }),
          )
          document.body.className = ``
        }}
        footerStyle={{ flexDirection: `column` }}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.recognitionScreen.awardUpdated`)}
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

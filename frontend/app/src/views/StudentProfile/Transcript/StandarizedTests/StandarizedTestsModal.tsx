import { useFormik } from "formik"
import React, { useState } from "react"
//Hooks
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import Datepicker from "../../../../components/DatePicker/Datepicker"
import Modal from "../../../../components/Modal/Modal"
import SelectField from "../../../../components/SelectField/SelectField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../../store"

interface StandarizedTestsModalProps {
  isOpen: boolean
  toggle: () => void
  date: Date | null
  setDate: any
  data: any
  toggleAddScore: () => void
}

type StandarizedTestType = "ACT" | "SAT"

interface StandardizedTestsFirstStepProps {
  type: StandarizedTestType | ""
  month: any
  year: any
}

export const StandarizedTestsModal: React.FC<StandarizedTestsModalProps> = ({
  isOpen,
  toggle,
  toggleAddScore,
  data,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const validationSchema = yup.object({
    type: yup.string().required(t(`errors:thisFieldIsRequired`)),
    month: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
    year: yup
      .number()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
  })
  const initialValues: StandardizedTestsFirstStepProps = {
    type: ``,
    month: ``,
    year: ``,
  }

  const {
    values,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useFormik<StandardizedTestsFirstStepProps>({
    initialValues,
    validationSchema,
    onSubmit: ({ type, year, month }) => {
      const date = new Date(year, month - 1)
      dispatch(actions.updateStandarizedTestFirstStep({ type, date }))
      toggle()
      toggleAddScore()
    },
  })
  const typeOptions = data && data.act ? [{ name: `SAT` }] : [{ name: `ACT` }]

  useEffect(() => {
    resetForm()
  }, [isOpen])

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        title={t(`profile.student.transcriptScreen.standardizedTests`)}
        subtitle={t(
          `profile.student.transcriptScreen.standardizedTestsSubtitle`,
        )}
        isOpen={isOpen}
        toggle={() => {
          if (!values.type && !values.month && !values.year) {
            toggle()
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div
            className={`choose-test`}
            style={{
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `center`,
              marginTop: 40,
              marginBottom: 40,
              alignItems: `center`,
            }}
          >
            <SelectField
              onChange={async (e: any) => {
                return setFieldValue(`type`, e.value)
              }}
              value={values.type}
              placeholder={t(`profile.student.transcriptScreen.selectTest`)}
              items={
                !data || (data && !data.act && !data.sat)
                  ? [
                      { id: `act`, name: `ACT` },
                      { id: `sat`, name: `SAT` },
                    ]
                  : typeOptions
              }
              error={touched.type && (errors.type as string)}
              title={t(`profile.student.transcriptScreen.test`)}
            />
            <div className="standarized-tests-modal-datepicker-container">
              <Datepicker
                title={t(`common:date`)}
                setFieldValue={setFieldValue}
                fromMonth={values.month}
                fromYear={values.year}
                type="Month"
                error={
                  (touched.month || touched.year) &&
                  ((errors.month ?? errors.year) as string)
                }
              />
            </div>
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
        footer={t(`common:continue`)}
        footerType={`submit`}
        closeIcon
      />
    </form>
  )
}

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

import Datepicker from "../../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../../store"
import { Course, CourseType } from "../../../../store/types"

export interface AddSatSubjectsTestsModalProps {
  isOpen: boolean
  toggle: () => void
}

export const AddSatSubjectTestModal: React.FC<AddSatSubjectsTestsModalProps> = ({
  isOpen,
  toggle,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const validationSchema = yup.object({
    gpa: yup
      .string()
      .required(
        t(`errors:cannotBeEmpty`, { name: t(`common:subjectTestName`) }),
      ),
    grade: yup
      .number()
      .min(200, `Min value is 200`)
      .max(800, `Max value is 800`)
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:score`) })),
    month: yup
      .string()
      .nullable()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
    year: yup
      .number()
      .nullable()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
  })

  const initialValues = useMemo<Course>(
    () => ({
      gpa: ``,
      grade: ``,
      month: null,
      year: null,
      type: CourseType.SAT,
    }),
    [],
  )

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    touched,
    errors,
    resetForm,
  } = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: async ({ gpa, grade, year, month }, { setErrors }) => {
      const date = new Date(year, month - 1)

      try {
        await dispatch(
          actions.createCourse({
            name: gpa,
            grade,
            year: date,
            type: CourseType.SAT,
            order: 0,
          }),
        )

        setMessageModalVisible(true)
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
        title={t(`profile.student.transcriptScreen.addSatSubjectTests`)}
        subtitle={t(
          `profile.student.transcriptScreen.addSatSubjectTestsSubtitle`,
        )}
        isOpen={isOpen && !isMessageModalVisible}
        toggle={() => {
          if (!values.gpa && !values.grade && !values.month && !values.year) {
            toggle()
            document.body.className = ``
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div className="add-sat-subjects-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`gpa`}
              value={values.gpa}
              onChange={handleChange(`gpa`)}
              error={touched.gpa && (errors.gpa as string)}
              placeholder={t(`common:testName`)}
              title={t(`common:subjectTestName`)}
            />

            <TextField
              name={`grade`}
              value={values.grade ?? ``}
              onChange={handleChange}
              error={touched.grade && (errors.grade as string)}
              placeholder={t(`common:score`)}
              title={t(`common:score`)}
              type="number"
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
        footer={t(`profile.student.transcriptScreen.addSubjectTest`)}
        footerAction={() => handleSubmit()}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.subjectTestCreated`)}
        visible={isMessageModalVisible}
        onClose={() => {
          setMessageModalVisible(false)
          toggle()
          document.body.className = ``
        }}
      />
    </>
  )
}

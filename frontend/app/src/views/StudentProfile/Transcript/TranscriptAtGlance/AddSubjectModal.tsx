import { useFormik } from "formik"
import React, { useEffect } from "react"
//Hooks
import { useMemo, useState } from "react"
//Services
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
//Utils
import * as yup from "yup"

import Datepicker from "../../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
import SelectField from "../../../../components/SelectField/SelectField"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { gradeOptions } from "../../../../const/gradeOptions"
//Actions
import * as actions from "../../../../store/actions"
import { Course, CourseType } from "../../../../store/types"

export interface AddSubjectModalProps {
  isOpen: string
  toggle: () => void
  title: string
  category: string
  openLetterGradingScaleModal: () => void
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  isOpen,
  toggle,
  title,
  category,
  openLetterGradingScaleModal,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const initialValues = useMemo<Course>(
    () => ({
      gpa: ``,
      grade: ``,
      month: ``,
      year: ``,
      type: CourseType.College,
    }),
    [],
  )

  const validationSchema = yup.object({
    gpa: yup.string().required(
      t(`errors:cannotBeEmpty`, {
        name: t(`common:subjectCourseName`, { subject: title }),
      }),
    ),
    grade: yup
      .string()
      .oneOf(
        gradeOptions.map(({ name }) => name),
        t(`errors:pleasePick`, { name: t(`common:grade`) }),
      )
      .required(t(`errors:pleasePick`, { name: t(`common:grade`) })),
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
    setFieldValue,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: async ({ gpa, grade, month, year }, { setErrors }) => {
      const date = new Date(year, month)

      try {
        await dispatch(
          actions.createGlance({ name: gpa, grade, date, category }),
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
        title={t(`profile.student.transcriptScreen.addTest`, { title })}
        subtitle={
          <div>
            {t(`profile.student.transcriptScreen.addYourFinalGrade`)}
            <span
              className="modal-subtitle-link"
              onClick={() => {
                openLetterGradingScaleModal()
              }}
            >
              {` `}
              {t(`profile.student.transcriptScreen.clickHereToViewScale`)}
            </span>
          </div>
        }
        isOpen={isOpen === title && !isMessageModalVisible}
        toggle={() => {
          if (!values.gpa && !values.grade && !values.month && !values.year) {
            toggle()
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div className="add-college-course-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`gpa`}
              value={values.gpa}
              onChange={handleChange}
              error={touched.gpa && (errors.gpa as string)}
              placeholder={t(`common:course`)}
              title={t(`common:subjectCourseName`, { subject: title })}
            />

            <SelectField
              value={values.grade ?? ``}
              onChange={async (e: any) => setFieldValue(`grade`, e.value)}
              isInvalid={touched.grade && !!errors.grade}
              error={touched.grade && (errors.grade as string)}
              placeholder={t(`common:grade`)}
              title={t(`common:grade`)}
              items={gradeOptions}
            />

            <Datepicker
              title={t(`common:semesterYearTaken`)}
              setFieldValue={setFieldValue}
              fromMonth={values.month}
              fromYear={values.year}
              error={
                (touched.month || touched.year) &&
                ((errors.month ?? errors.year) as string)
              }
              type={`Semester`}
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
        footer={t(`profile.student.transcriptScreen.addCourses`)}
        footerAction={() => handleSubmit()}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.testCourseCreated`)}
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

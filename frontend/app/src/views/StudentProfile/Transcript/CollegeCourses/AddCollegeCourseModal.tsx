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

export interface AddCollegeCourseModalProps {
  isOpen: boolean
  toggle: () => void
}

export const AddCollegeCourseModal: React.FC<AddCollegeCourseModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const { t } = useTranslation()

  const initialValues = useMemo<Course>(
    () => ({
      gpa: ``,
      grade: ``,
      month: null,
      year: null,
      type: CourseType.College,
    }),
    [],
  )

  const validationSchema = yup.object({
    gpa: yup
      .string()
      .required(
        t(`errors:cannotBeEmpty`, { name: t(`common:collegeCourseName`) }),
      ),
    grade: yup
      .number()
      .min(0, t(`errors:pleaseEnterPositiveValue`))
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:creditsEarned`) })),
    month: yup
      .string()
      .nullable()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
    year: yup
      .number()
      .nullable()
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
    onSubmit: async ({ gpa, grade, year, month }, { setErrors }) => {
      const date = new Date(year, month - 1)

      try {
        await dispatch(
          actions.createCourse({
            name: gpa,
            grade,
            year: date,
            type: CourseType.College,
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
        title={t(`profile.student.transcriptScreen.addCollegeCourse`)}
        subtitle={t(
          `profile.student.transcriptScreen.addCollegeCourseSubtitle`,
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
          <div className="add-college-course-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`gpa`}
              value={values.gpa}
              onChange={handleChange}
              error={touched.gpa && (errors.gpa as string)}
              placeholder={t(`common:courseName`)}
              title={t(`common:collegeCourseName`)}
            />

            <TextField
              name={`grade`}
              value={values.grade || ``}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  `grade`,
                  parseInt(e.target.value.replace(/[^\d]/, ``)),
                )
              }
              error={touched.grade && (errors.grade as string)}
              placeholder={t(`common:credits`)}
              title={t(`common:creditsEarned`)}
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
        footer={t(`profile.student.transcriptScreen.addCourses`)}
        footerAction={() => handleSubmit()}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.collegeCourseCreated`)}
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

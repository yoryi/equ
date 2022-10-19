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
import SelectField from "../../../../components/SelectField/SelectField"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../../store"
import { Course, CourseType } from "../../../../store/types"

export interface AddApCoursesTestModalProps {
  isOpen: boolean
  toggle: () => void
}

export const AddApCourseModal: React.FC<AddApCoursesTestModalProps> = ({
  isOpen,
  toggle,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const initialValues = useMemo<Course>(
    () => ({
      gpa: ``,
      grade: ``,
      month: null,
      year: null,
      type: CourseType.AP,
    }),
    [],
  )

  const validationSchema = yup.object({
    gpa: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:apTestName`) })),
    grade: yup
      .number()
      .required(
        t(`errors:pleasePick`, {
          name: t(`common:score`).trim().toLowerCase(),
        }),
      ),
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
    setFieldValue,
    handleSubmit,
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
            grade: Number(grade),
            year: date,
            type: CourseType.AP,
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
        title={t(`profile.student.transcriptScreen.addApTest`)}
        subtitle={t(`profile.student.transcriptScreen.addApTestSubtitle`)}
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
          <div className="add-ap-course-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`gpa`}
              value={values.gpa}
              onChange={handleChange}
              error={touched.gpa && (errors.gpa as string)}
              placeholder={t(`common:testName`)}
              title={t(`common:apTestName`)}
            />

            <SelectField
              onChange={async (e: any) => setFieldValue(`grade`, e.value)}
              items={[
                { name: `1`, id: 1 },
                { name: `2`, id: 2 },
                { name: `3`, id: 3 },
                { name: `4`, id: 4 },
                {
                  name: `5`,
                  id: 5,
                },
              ]}
              value={values.grade || ``}
              isInvalid={touched.grade && !!errors.grade}
              error={touched.grade && (errors.grade as string)}
              placeholder={t(`common:score`)}
              title={t(`common:score`)}
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
        footer={t(`profile.student.transcriptScreen.addApTest`)}
        footerAction={() => handleSubmit()}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.apTestCreated`)}
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

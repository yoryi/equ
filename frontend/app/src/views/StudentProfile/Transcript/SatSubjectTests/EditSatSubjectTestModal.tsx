import { useFormik } from "formik"
//Utils
import _ from "lodash"
import moment from "moment"
import * as React from "react"
//Hooks
import { useEffect, useMemo,useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import Datepicker from "../../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../../store"
import { Course, CourseType } from "../../../../store/types"

export interface EditSatSubjectTestModalProps {
  course: Course
  isOpen: number | undefined
  toggle: () => void
  id: number | undefined
}

export const EditSatSubjectTestModal: React.FC<EditSatSubjectTestModalProps> = ({
  id,
  isOpen,
  toggle,
  course,
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
      .min(200, t(`errors:minValueIs`, { count: 200 }))
      .max(800, t(`errors:maxValueIs`, { count: 800 }))
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
      gpa: course.gpa || course.name,
      grade: course.grade,
      month: course.date
        ? moment(course.date).format(`M`)
        : course.year
        ? moment(course.year).format(`M`)
        : null,
      year: course.date
        ? moment(course.date).format(`YYYY`)
        : course.year
        ? moment(course.year).format(`YYYY`)
        : null,
      order: course.order,
      type: CourseType.SAT,
    }),
    [course],
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
    onSubmit: async ({ gpa, grade, year, month, order }, { setErrors }) => {
      const date = new Date(year, month - 1)

      try {
        await dispatch(
          actions.updateCourse({
            id: course.id,
            name: gpa,
            grade,
            year: date,
            type: CourseType.SAT,
            order,
          }),
        )

        const showSuccessModal = _.isEqual(
          { gpa, grade, month, year },
          initialValues,
        )
        setMessageModalVisible(showSuccessModal)
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
        title={t(`profile.student.transcriptScreen.editSatSubjectTest`)}
        subtitle={t(
          `profile.student.transcriptScreen.editSatSubjectTestSubtitle`,
        )}
        isOpen={isOpen === id && !isMessageModalVisible}
        toggle={() => {
          const oldDate = course.date ? new Date(course.date) : null
          const newDate =
            values.month && values.year
              ? new Date(values.year, values.month - 1)
              : null
          const oldDateNew =
            course && course.year ? new Date(course.year) : null
          if (
            (!values.gpa ||
              (values.gpa &&
                (values.gpa === course.gpa || values.gpa === course.name))) &&
            (!values.grade ||
              (values.grade && values.grade === course.grade)) &&
            ((oldDate && newDate && oldDate.getTime() === newDate.getTime()) ||
              oldDateNew?.getTime() === newDate?.getTime())
          ) {
            toggle()
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div className="add-sat-subjects-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`gpa`}
              value={values.gpa}
              onChange={handleChange}
              error={touched.gpa && (errors.gpa as string)}
              placeholder={t(`common:testName`)}
              title={t(`common:subjectTestName`)}
            />

            <TextField
              name={`grade`}
              value={values.grade ?? ``}
              onChange={handleChange}
              placeholder={t(`common:score`)}
              title={t(`common:score`)}
              type="number"
              error={touched.grade && (errors.grade as string)}
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
        footer={t(`profile.student.transcriptScreen.updateSubjectTest`)}
        footerAction={() => handleSubmit()}
        deleteFooter={t(`profile.student.transcriptScreen.deleteSubjectTest`)}
        deleteAction={() => {
          const date = new Date(values.year, values.month - 1)
          dispatch(
            actions.deleteCourse({
              id: course.id,
              name: values.gpa,
              grade: values.grade,
              year: date,
              type: CourseType.SAT,
            }),
          )
        }}
        footerStyle={{ flexDirection: `column` }}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.subjectTestUpdated`)}
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

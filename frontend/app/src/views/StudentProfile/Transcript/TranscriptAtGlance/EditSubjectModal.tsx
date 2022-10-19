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

import Datepicker from "../../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
import SelectField from "../../../../components/SelectField/SelectField"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { gradeOptions } from "../../../../const/gradeOptions"
import { actions } from "../../../../store"
import { GlancePart } from "../../../../store/types"

export interface EditSubjectModalProps {
  isOpen: number
  toggle: () => void
  openLetterGradingScaleModal: () => void
  course: GlancePart
  title: string
  category: string
}

export const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  isOpen,
  toggle,
  openLetterGradingScaleModal,
  course,
  title,
  category,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)

  const initialValues = useMemo<any>(
    () => ({
      id: course.id,
      name: course.name,
      grade: course.grade,
      month: course.date
        ? moment(course.date).month() === 0
          ? 1
          : Number(moment(course.date).format(`M`)) - 1
        : ``,
      year: course.date ? moment(course.date).format(`YYYY`) : ``,
      order: course.order,
    }),
    [course],
  )

  const validationSchema = yup.object({
    name: yup.string().required(
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
      .typeError(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
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
    onSubmit: async (payload, { setErrors }) => {
      const date = new Date(payload.year, payload.month)

      try {
        await dispatch(
          actions.updateGlance({
            id: course.id,
            name: payload.name,
            grade: payload.grade,
            date,
            category,
            order: payload.order,
          }),
        )

        const showSuccessModal = !_.isEqual(payload, initialValues)
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
    <form onSubmit={handleSubmit}>
      <Modal
        title={t(`profile.student.transcriptScreen.addTest`, {
          title: course.name,
        })}
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
        isOpen={isOpen === course.id && !isMessageModalVisible}
        toggle={() => {
          const oldDate = course.date ? new Date(course.date) : null
          const newDate =
            values.month && values.year
              ? new Date(values.year, values.month)
              : null
          if (
            (!values.name || (values.name && values.name === course.name)) &&
            (!values.grade ||
              (values.grade && values.grade === course.grade)) &&
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
          <div className="add-college-course-modal-body d-flex flex-column align-items-center">
            <TextField
              name={`name`}
              value={values.name}
              onChange={handleChange}
              error={touched.name && (errors.name as string)}
              placeholder={t(`common:course`)}
              title={t(`common:subjectCourseName`, { subject: title })}
            />

            <SelectField
              value={values.grade ?? ``}
              onChange={async (e: any) => setFieldValue(`grade`, e.value)}
              error={touched.grade && (errors.grade as string)}
              placeholder={t(`common:grade`)}
              title={t(`common:grade`)}
              items={gradeOptions}
            />

            <Datepicker
              title={t(`common:semesterYearTaken`)}
              setFieldValue={setFieldValue}
              fromMonth={Number(values.month)}
              fromYear={values.year}
              error={
                (touched.month || touched.year) &&
                ((errors.month ?? errors.year) as string)
              }
              type="Semester"
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
        footer={t(`profile.student.transcriptScreen.updateCourse`)}
        footerType={`submit`}
        deleteFooter={t(`profile.student.transcriptScreen.deleteCourse`)}
        deleteAction={() => {
          const date = new Date(values.year, values.month - 1)
          dispatch(
            actions.deleteGlance({
              id: course.id,
              name: values.name,
              grade: values.grade,
              date,
              category,
              order: course.order,
            }),
          )
          dispatch(actions.toggleGlanceModal(``))
          document.body.className = ``
        }}
        footerStyle={{ flexDirection: `column` }}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(`profile.student.transcriptScreen.testCourseUpdated`)}
        visible={isMessageModalVisible}
        onClose={() => {
          setMessageModalVisible(false)
          toggle()
        }}
      />
    </form>
  )
}

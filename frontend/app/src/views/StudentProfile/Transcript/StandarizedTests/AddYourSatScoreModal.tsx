import { FormikErrors,useFormik } from "formik"
//Utils
import _ from "lodash"
import moment from "moment"
import React, { useMemo } from "react"
//Hooks
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import * as yup from "yup"

import Datepicker from "../../../../components/DatePicker/Datepicker"
//Components
import MessageModal from "../../../../components/MessageModal"
import Modal from "../../../../components/Modal/Modal"
import TextField from "../../../../components/TextField/TextField"
import UnsavedChangesModal from "../../../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../../../store"
import { ReduxState, StandardizedTestCategory } from "../../../../store/types"

interface AddYourSatScoreModalProps {
  isOpen: boolean
  toggle: () => void
  isEditModal?: string
}

export const AddYourSatScoreModal: React.FC<AddYourSatScoreModalProps> = ({
  isOpen,
  toggle,
  isEditModal,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const standardizedTest: any = useSelector<ReduxState>(
    (state) => state.profile.transcript?.standardizedTests,
  )

  const [isMessageModalVisible, setMessageModalVisible] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  const validationSchemaSAT = yup.object({
    english: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(200, t(`errors:minValueIs`, { count: 200 }))
      .max(800, t(`errors:maxValueIs`, { count: 800 })),
    math: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(200, t(`errors:minValueIs`, { count: 200 }))
      .max(800, t(`errors:maxValueIs`, { count: 800 })),
    reading: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(8, t(`errors:maxValueIs`, { count: 8 })),
    science: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(8, t(`errors:maxValueIs`, { count: 8 })),
    writing: yup
      .number()
      .nullable()
      .optional()
      .min(0, t(`errors:minValueIs`, { count: 0 }))
      .max(8, t(`errors:maxValueIs`, { count: 8 })),
  })

  const validationSchemaACT = yup.object({
    composite: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(1, t(`errors:minValueIs`, { count: 1 }))
      .max(36, t(`errors:maxValueIs`, { count: 36 })),
    english: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(1, t(`errors:minValueIs`, { count: 1 }))
      .max(36, t(`errors:maxValueIs`, { count: 36 }))
      .integer(),
    math: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(1, t(`errors:minValueIs`, { count: 1 }))
      .max(36, t(`errors:maxValueIs`, { count: 36 })),
    reading: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(1, t(`errors:minValueIs`, { count: 1 }))
      .max(36, t(`errors:maxValueIs`, { count: 36 })),
    science: yup
      .number()
      .required(t(`errors:thisFieldIsRequired`))
      .nullable()
      .min(1, t(`errors:minValueIs`, { count: 1 }))
      .max(36, t(`errors:maxValueIs`, { count: 36 })),
    writing: yup
      .number()
      .nullable()
      .optional()
      .min(2, t(`errors:minValueIs`, { count: 2 }))
      .max(12, t(`errors:maxValueIs`, { count: 12 })),
  })

  const initialValues: any = useMemo(() => {
    if (!isEditModal) {
      return {
        english: null,
        math: null,
        reading: null,
        science: null,
        writing: null,
        month: ``,
        year: ``,
        composite: null,
        type: standardizedTest && standardizedTest.type,
        date: standardizedTest && standardizedTest.date,
      }
    } else if (isEditModal === `ACT`) {
      return {
        english:
          standardizedTest.act.english || standardizedTest.act.english === 0
            ? standardizedTest.act.english
            : null,
        math:
          standardizedTest.act.math || standardizedTest.act.math === 0
            ? standardizedTest.act.math
            : null,
        reading:
          standardizedTest.act.reading || standardizedTest.act.reading === 0
            ? standardizedTest.act.reading
            : null,
        science:
          standardizedTest.act.science || standardizedTest.act.science === 0
            ? standardizedTest.act.science
            : null,
        writing:
          standardizedTest.act.writing || standardizedTest.act.writing === 0
            ? standardizedTest.act.writing
            : null,
        month: standardizedTest.act.date
          ? moment(standardizedTest.act.date).format(`M`)
          : ``,
        year: standardizedTest.act.date
          ? moment(standardizedTest.act.date).format(`YYYY`)
          : ``,
        composite:
          standardizedTest.act.composite || standardizedTest.act.composite === 0
            ? standardizedTest.act.composite
            : null,
        type: standardizedTest && standardizedTest.type,
        date: standardizedTest && standardizedTest.date,
      }
    } else {
      return {
        english:
          standardizedTest.sat.english || standardizedTest.sat.english === 0
            ? standardizedTest.sat.english
            : null,
        math:
          standardizedTest.sat.math || standardizedTest.sat.math === 0
            ? standardizedTest.sat.math
            : null,
        reading:
          standardizedTest.sat.reading || standardizedTest.sat.reading === 0
            ? standardizedTest.sat.reading
            : null,
        science:
          standardizedTest.sat.science || standardizedTest.sat.science === 0
            ? standardizedTest.sat.science
            : null,
        writing:
          standardizedTest.sat.writing || standardizedTest.sat.writing === 0
            ? standardizedTest.sat.writing
            : null,
        month: standardizedTest.sat.date
          ? moment(standardizedTest.sat.date).format(`M`)
          : ``,
        year: standardizedTest.sat.date
          ? moment(standardizedTest.sat.date).format(`YYYY`)
          : ``,
        composite:
          standardizedTest.sat.composite || standardizedTest.sat.composite === 0
            ? standardizedTest.sat.composite
            : null,
        type: standardizedTest && standardizedTest.type,
        date: standardizedTest && standardizedTest.date,
      }
    }
  }, [isEditModal])

  const testType = isEditModal?.length ? isEditModal : standardizedTest?.type

  const {
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    touched,
    errors,
  } = useFormik<any>({
    initialValues,
    validationSchema:
      testType === `SAT` ? validationSchemaSAT : validationSchemaACT,
    onSubmit: ({ year, month }, { setSubmitting, setErrors, resetForm }) => {
      const updatedValues = values
      const date = new Date(year, month - 1)
      values.date
        ? (updatedValues.date = values.date)
        : (updatedValues.date = date)
      updatedValues.type = testType === `SAT` ? `SAT` : `ACT`
      values.composite
        ? (updatedValues.composite = values.composite)
        : (updatedValues.composite = 0)

      dispatch(actions.updateStandardizedTests(updatedValues))
        .then(() => {
          resetForm()

          const showSuccessModal = !_.isEqual(values, initialValues)
          setMessageModalVisible(showSuccessModal)
          if (!showSuccessModal) {
            toggle()
          }
        })
        .catch(
          ({ errors }: { errors: FormikErrors<StandardizedTestCategory> }) =>
            setErrors(errors),
        )
        .finally(() => setSubmitting(false))
    },
    enableReinitialize: true,
  })

  if (!standardizedTest) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        className={`add-your-sat-score-modal`}
        title={t(`profile.student.transcriptScreen.addYourScore`, {
          name: testType,
        })}
        subtitle={t(`profile.student.transcriptScreen.addYourScoreSubtitle`, {
          name: testType,
        })}
        isOpen={isOpen && !isMessageModalVisible}
        toggle={() => {
          const oldSatDate =
            standardizedTest.sat && standardizedTest.sat.date
              ? new Date(standardizedTest.sat.date)
              : null
          const oldActDate =
            standardizedTest.act && standardizedTest.act.date
              ? new Date(standardizedTest.act.date)
              : null
          const newDate =
            values.month && values.year
              ? new Date(values.year, values.month - 1)
              : null
          if (
            isEditModal &&
            isEditModal === `ACT` &&
            values &&
            standardizedTest &&
            values.composite === standardizedTest.act.composite &&
            values.english === standardizedTest.act.english &&
            values.math === standardizedTest.act.math &&
            values.reading === standardizedTest.act.reading &&
            values.science === standardizedTest.act.science &&
            values.writing === standardizedTest.act.writing &&
            oldActDate &&
            newDate &&
            oldActDate.getTime() === newDate.getTime()
          ) {
            toggle()
          } else if (
            isEditModal &&
            isEditModal === `SAT` &&
            values &&
            standardizedTest &&
            values.composite === standardizedTest.sat.composite &&
            values.english === standardizedTest.sat.english &&
            values.math === standardizedTest.sat.math &&
            values.reading === standardizedTest.sat.reading &&
            values.science === standardizedTest.sat.science &&
            values.writing === standardizedTest.sat.writing &&
            oldSatDate &&
            newDate &&
            oldSatDate.getTime() === newDate.getTime()
          ) {
            toggle()
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `center`,
              alignItems: `center`,
            }}
          >
            {!!isEditModal ? (
              <div className="add-your-sat-score-modal-row datepicker">
                <Datepicker
                  title={t(`common:date`)}
                  setFieldValue={setFieldValue}
                  fromMonth={values.month}
                  fromYear={values.year}
                  type="Month"
                />
              </div>
            ) : null}
            {testType === `ACT` ? (
              <>
                <div className="add-your-sat-score-modal-row">
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `composite`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.composite}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(1-36)` },
                    )}
                    title={t(`profile.student.transcriptScreen.composite`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.composite &&
                      (errors.composite as string)
                    }
                  />
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `math`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.math}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(1-36)` },
                    )}
                    title={t(`profile.student.transcriptScreen.math`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.math &&
                      (errors.math as string)
                    }
                  />
                </div>
                <div className="add-your-sat-score-modal-row">
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `science`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.science}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(1-36)` },
                    )}
                    title={t(`profile.student.transcriptScreen.science`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.science &&
                      (errors.science as string)
                    }
                  />
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `english`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.english}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(1-36)` },
                    )}
                    title={t(`profile.student.transcriptScreen.english`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.english &&
                      (errors.english as string)
                    }
                  />
                </div>
                <div className="add-your-sat-score-modal-row">
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `reading`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.reading}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(1-36)` },
                    )}
                    title={t(`profile.student.transcriptScreen.reading`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.reading &&
                      (errors.reading as string)
                    }
                  />
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `writing`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.writing}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(2-12)` },
                    )}
                    title={t(
                      `profile.student.transcriptScreen.writingOptional`,
                    )}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.writing &&
                      (errors.writing as string)
                    }
                  />
                </div>
              </>
            ) : null}
            {testType === `SAT` ? (
              <>
                <div className="add-your-sat-score-modal-row">
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `english`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.english}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(200-800)` },
                    )}
                    title={t(`profile.student.transcriptScreen.ebrw`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.english &&
                      (errors.english as string)
                    }
                  />
                  <TextField
                    className={`flex-grow-1 standardized-test-input`}
                    onChange={async (e: any) =>
                      setFieldValue(
                        `math`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.math}
                    placeholder={t(
                      `profile.student.transcriptScreen.enterYourScore`,
                      { name: `(200-800)` },
                    )}
                    title={t(`profile.student.transcriptScreen.math`)}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.math &&
                      (errors.math as string)
                    }
                  />
                </div>
                <div className="add-your-sat-score-modal-row second-row">
                  <div>
                    {
                      <div
                        className={`date-picker-label ${
                          standardizedTest.type === `SAT`
                            ? values.reading && values.science && values.writing
                            : values.reading && values.science && values.writing
                            ? `standardized-test-filled`
                            : `pristine`
                        }`}
                        style={{ marginLeft: 10 }}
                      >
                        {t(`profile.student.transcriptScreen.essayOptional`)}
                      </div>
                    }
                    <TextField
                      onChange={async (e: any) =>
                        setFieldValue(
                          `reading`,
                          e.target.value === `` ? null : Number(e.target.value),
                        )
                      }
                      value={values.reading}
                      placeholder={t(
                        `profile.student.transcriptScreen.readingScore`,
                      )}
                      type="number"
                      error={
                        touched &&
                        errors &&
                        touched &&
                        errors &&
                        touched.reading &&
                        (errors.reading as string)
                      }
                      className={`flex-grow-1 standardized-test-input`}
                    />
                  </div>
                  <TextField
                    onChange={async (e: any) =>
                      setFieldValue(
                        `science`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.science}
                    placeholder={t(
                      `profile.student.transcriptScreen.analysisScore`,
                    )}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.science &&
                      (errors.science as string)
                    }
                    className={`flex-grow-1 standardized-test-input`}
                  />
                  <TextField
                    onChange={async (e: any) =>
                      setFieldValue(
                        `writing`,
                        e.target.value === `` ? null : Number(e.target.value),
                      )
                    }
                    value={values.writing}
                    placeholder={t(
                      `profile.student.transcriptScreen.writingScore`,
                    )}
                    type="number"
                    error={
                      touched &&
                      errors &&
                      touched &&
                      errors &&
                      touched.writing &&
                      (errors.writing as string)
                    }
                    className={`flex-grow-1 standardized-test-input`}
                  />
                </div>
              </>
            ) : null}
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
        deleteFooter={
          isEditModal &&
          t(`profile.student.transcriptScreen.deleteStandardizedTest`, {
            name: isEditModal,
          })
        }
        deleteAction={() =>
          dispatch(
            actions.deleteStandardizedTest(
              standardizedTest[isEditModal!.toLowerCase()],
            ),
          ).then(() => toggle())
        }
        footer={t(`common:continue`)}
        footerType={`submit`}
        disabledFooterButton={isSubmitting}
        closeIcon
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(
          `profile.student.transcriptScreen.${
            isEditModal ? `standardizedTestUpdated` : `standardizedTestCreated`
          }`,
        )}
        visible={isMessageModalVisible}
        onClose={() => {
          setMessageModalVisible(false)
          toggle()
        }}
      />
    </form>
  )
}

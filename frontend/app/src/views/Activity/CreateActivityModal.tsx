import { useFormik } from "formik"
//Types
import { FormikErrors, FormikTouched } from "formik"
import _ from "lodash"
//Utils
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import AddReferenceModal from "../../components/AddReferenceModal"
import Datepicker from "../../components/DatePicker/Datepicker"
import FromToDatepicker from "../../components/DatePicker/FromToDatepicker"
//Components
import JourneyModal from "../../components/JourneyModal"
import MessageModal from "../../components/MessageModal"
import Modal from "../../components/Modal/Modal"
import SelectField from "../../components/SelectField/SelectField"
import TextArea from "../../components/TextField/TextArea"
import TextField from "../../components/TextField/TextField"
import UnsavedChangesModal from "../../components/UnsavedChangesModal/UnsavedChangesModal"
import { actions } from "../../store"
import { ActivityType, ReferenceType } from "../../store/types"
import { UploadAttachments } from "./Attachments/UploadAttachments"
import { UploadPhotoVideo } from "./Journey/UploadPhotoVideo"
import { LogoUploader } from "./LogoUploader/LogoUploader"
import { UpdateLogoModal } from "./LogoUploader/UpdateLogoModal"

interface ActivityModalProps {
  isOpen: string
  toggle: () => void
  title: string
  type: ActivityType
}

interface DateFieldValue {
  month: number | null
  year: number | null
}

interface FormValues {
  title: string
  categoryId: number | null
  company: string
  month: number | null
  year: number | null
  from: DateFieldValue
  to: DateFieldValue | null
  description: string
}

export const CreateActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  toggle,
  title,
  type,
}) => {
  const dispatch = useDispatch()
  const {
    isAddActivitySecondStepOpen,
    activityTypes,
    currentActivity,
    isUploadActivityModalOpen,
  } = useSelector((state: any) => state.profile)
  const { isAddSpiritSecondStepOpen, currentSpirit } = useSelector(
    (state: any) => state.university,
  )
  const [isJourneyModalOpen, toggleJourneyModal] = useState(0)

  const [isReferenceModalVisible, setReferenceModalVisible] = useState(false)
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  useEffect(() => {
    if (activityTypes) {
      return
    }

    isOpen === type &&
      (type === ActivityType.ACADEMIC_ART ||
        type === ActivityType.SPORTS_SPIRIT) &&
      dispatch(actions.getActivityTypes())
  }, [dispatch, activityTypes, type, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.className = `modal-open overflow-hidden`
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.className = `modal-open overflow-hidden`
    }
    if (
      (!isJourneyModalOpen && isOpen) ||
      (!isReferenceModalVisible && isOpen)
    ) {
      setTimeout(() => {
        document.body.className = `modal-open overflow-hidden`
      }, 100)
    }
  }, [
    isOpen,
    isUploadActivityModalOpen,
    isJourneyModalOpen,
    isReferenceModalVisible,
    isSuccessModalVisible,
    currentActivity,
  ])

  useEffect(() => {
    if (
      isAddActivitySecondStepOpen &&
      isOpen === type &&
      type !== ActivityType.SPIRIT
    ) {
      dispatch(
        actions.getCurrentActivity({
          activityType: type,
          activityId: isAddActivitySecondStepOpen,
        }),
      )
    }
    if (
      isAddSpiritSecondStepOpen &&
      isOpen === type &&
      type === ActivityType.SPIRIT
    ) {
      dispatch(
        actions.getCurrentSpirit({
          activityType: type,
          activityId: isAddSpiritSecondStepOpen,
        }),
      )
    }
  }, [
    dispatch,
    isAddActivitySecondStepOpen,
    isAddSpiritSecondStepOpen,
    isOpen,
    type,
  ])

  const { t } = useTranslation()

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:activityName`) })),
    categoryId:
      type === ActivityType.ACADEMIC_ART || type === ActivityType.SPORTS_SPIRIT
        ? yup
            .number()
            .typeError(
              t(`errors:cannotBeEmpty`, { name: t(`common:activityType`) }),
            )
            .required(
              t(`errors:cannotBeEmpty`, { name: t(`common:activityType`) }),
            )
        : yup.mixed(),
    company:
      type === ActivityType.INTERNSHIP ||
      type === ActivityType.EMPLOYMENT ||
      type === ActivityType.VOLUNTEER ||
      type === ActivityType.ACTIVISM
        ? yup
            .string()
            .required(t(`errors:cannotBeEmpty`, { name: t(`common:company`) }))
        : yup.mixed(),
    month:
      type === ActivityType.SPIRIT
        ? yup
            .number()
            .nullable()
            .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) }))
        : yup.mixed(),
    year:
      type === ActivityType.SPIRIT
        ? yup
            .number()
            .nullable()
            .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) }))
        : yup.mixed(),
    from:
      type !== ActivityType.SPIRIT
        ? yup.object({
            month: yup
              .number()
              .nullable()
              .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
            year: yup
              .number()
              .nullable()
              .required(t(`errors:cannotBeEmpty`, { name: t(`common:date`) })),
          })
        : yup.mixed(),
    to:
      type !== ActivityType.SPIRIT
        ? yup
            .object({
              month: yup
                .number()
                .nullable()
                .required(
                  t(`errors:cannotBeEmpty`, { name: t(`common:date`) }),
                ),
              year: yup
                .number()
                .nullable()
                .required(
                  t(`errors:cannotBeEmpty`, { name: t(`common:date`) }),
                ),
            })
            .test(
              `endDate`,
              t(`errors:endDateCannotBeBeforeStartDate`),
              function (value) {
                return (
                  !value ||
                  (value?.month &&
                    value?.year &&
                    this.parent.from.month &&
                    this.parent.from.year &&
                    moment()
                      .month(value.month === 12 ? value.month - 1 : value.month)
                      .year(value.year)
                      .startOf(`month`)
                      .isSameOrAfter(
                        moment()
                          .month(this.parent.from.month)
                          .year(this.parent.from.year)
                          .startOf(`month`),
                      ))
                )
              },
            )
            .nullable()
        : yup.mixed(),
    description: yup
      .string()
      .required(t(`errors:cannotBeEmpty`, { name: t(`common:description`) })),
  })

  const initialValues = useMemo<FormValues>(
    () => ({
      title: ``,
      categoryId: null,
      company: ``,
      month: null,
      year: null,
      from: {
        month: null,
        year: null,
      },
      to: {
        month: null,
        year: null,
      },
      description: ``,
      logo: ``,
      journey: ``,
      attachments: [],
      reference: ``,
    }),
    [],
  )

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik<FormValues>({
    validationSchema,
    initialValues,
    onSubmit: (
      { title, categoryId, company, month, year, from, to, description },
      { setErrors, setSubmitting },
    ) => {
      const date = new Date(year!, month! - 1)
      const startDate = new Date(from.year!, from.month!)
      const endDate = to ? new Date(to.year!, to.month!) : null
      type === ActivityType.SPIRIT
        ? dispatch(
            actions.createSpirit({
              title,
              date,
              description,
              type: ActivityType.SPIRIT,
            }),
          )
            .then(() => setSuccessModalVisible(true))
            .catch(({ errors }: { errors: { [field: string]: string } }) =>
              setErrors(errors),
            )
            .finally(() => setSubmitting(false))
        : dispatch(
            actions.createActivity({
              title,
              categoryId: categoryId!,
              company,
              startDate,
              endDate,
              description,
              type,
            }),
          )
            .then(() => setSuccessModalVisible(true))
            .catch(({ errors }: { errors: { [field: string]: string } }) =>
              setErrors(errors),
            )
            .finally(() => setSubmitting(false))
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen])

  return (
    <>
      <Modal
        title={title}
        isOpen={isOpen === type}
        toggle={() => {
          if (
            (!values.title &&
              !values.categoryId &&
              !values.company &&
              !values.month &&
              !values.year &&
              !values.from.month &&
              !values.from.year &&
              !values.to?.month &&
              !values.to?.year &&
              !_.isNull(values.to) &&
              !values.description) ||
            currentActivity
          ) {
            toggle()
            document.body.className = ``
          } else {
            toggleUnsavedModal(true)
          }
        }}
        body={
          <div className="activity-modal-body">
            <div className="activity-modal-body-row">
              <TextField
                name={`title`}
                value={values.title}
                onChange={handleChange}
                error={touched.title && errors.title}
                placeholder={t(`common:activityName`)}
                title={t(`common:activityName`)}
              />
            </div>

            {(type === ActivityType.ACADEMIC_ART ||
              type === ActivityType.SPORTS_SPIRIT) && (
              <div className="activity-modal-body-row">
                <SelectField
                  onChange={(option: any) => {
                    setFieldValue(
                      `categoryId`,
                      activityTypes.find((it: any) => it.name === option.value)
                        ?.id,
                    )
                  }}
                  value={
                    values.categoryId
                      ? activityTypes.find(
                          (it: any) => it.id === values.categoryId,
                        )?.name
                      : ``
                  }
                  isInvalid={touched.categoryId && !!errors.categoryId}
                  error={touched.categoryId && errors.categoryId}
                  items={
                    activityTypes &&
                    activityTypes.length > 0 &&
                    activityTypes.filter(
                      (activityType: any) => activityType.type === type,
                    )
                  }
                  title={t(`common:activityType`)}
                  placeholder={t(`common:activityType`)}
                />
              </div>
            )}

            {(type === ActivityType.INTERNSHIP ||
              type === ActivityType.EMPLOYMENT ||
              type === ActivityType.VOLUNTEER ||
              type === ActivityType.ACTIVISM) && (
              <div className="activity-modal-body-row">
                <TextField
                  name={`company`}
                  placeholder={t(`common:company`)}
                  title={t(`common:companyOrganizationName`)}
                  value={values.company}
                  onChange={handleChange}
                  error={touched.company && errors.company}
                />
              </div>
            )}

            <div className="activity-modal-body-row activity-modal-body-row-align-left">
              {type === ActivityType.SPIRIT ? (
                <Datepicker
                  title={t(`common:date`)}
                  setFieldValue={setFieldValue}
                  fromMonth={values.month}
                  fromYear={values.year}
                  error={
                    (touched.month || touched.year) &&
                    (errors.month ?? errors.year)
                  }
                  type="Month"
                  className={`mb-3`}
                />
              ) : (
                <FromToDatepicker
                  setFieldValue={setFieldValue}
                  from={values.from}
                  to={values.to}
                  error={
                    (touched.from?.month ||
                      touched.from?.year ||
                      touched.to ||
                      (touched.to as FormikTouched<DateFieldValue> | undefined)
                        ?.month ||
                      (touched.to as FormikTouched<DateFieldValue> | undefined)
                        ?.year) &&
                    ((errors.from?.month ??
                      errors.from?.year ??
                      (typeof errors.to === `string` ? errors.to : null) ??
                      (errors.to as FormikErrors<DateFieldValue> | undefined)
                        ?.month ??
                      (errors.to as FormikErrors<DateFieldValue> | undefined)
                        ?.year) as string)
                  }
                  checkboxText={t(
                    `common:${
                      type === ActivityType.EMPLOYMENT
                        ? `currentlyWorkHere`
                        : `currentlyParticipateInThisActivity`
                    }`,
                  )}
                />
              )}
            </div>

            <div className="activity-modal-body-row">
              <TextArea
                name={`description`}
                value={values.description}
                onChange={handleChange}
                error={touched.description && errors.description}
                title={t(`common:description`)}
                placeholder={t(`common:description`)}
              />
            </div>

            {(!!isAddActivitySecondStepOpen || !!isAddSpiritSecondStepOpen) && (
              <>
                {!isAddSpiritSecondStepOpen && (
                  <div
                    className="activity-modal-body-row"
                    style={{ display: `block` }}
                  >
                    <div className="field-label">
                      {t(`common:activityIcon`)}
                    </div>
                    {currentActivity && (
                      <div className="activity-modal-body-row-text">
                        <LogoUploader
                          activityId={currentActivity.id}
                          activityType={currentActivity.type}
                          logo={currentActivity.logo}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div
                  className="activity-modal-body-row"
                  style={{ display: `block` }}
                >
                  <div className="field-label">
                    {t(`common:yourJourneyOnePerActivity`)}
                  </div>
                  <div className="activity-modal-body-row-text">
                    {currentActivity &&
                    currentActivity.journeys &&
                    currentActivity.journeys.length > 0 ? (
                      <div
                        onClick={() => toggleJourneyModal(currentActivity.id)}
                      >
                        {t(`common:viewYourJourney`)}
                      </div>
                    ) : (
                      !currentSpirit && (
                        <UploadPhotoVideo
                          id={isAddActivitySecondStepOpen}
                          activityType={type}
                        />
                      )
                    )}
                    {currentSpirit &&
                    currentSpirit.journeys &&
                    currentSpirit.journeys.length > 0 ? (
                      <div onClick={() => toggleJourneyModal(currentSpirit.id)}>
                        {t(`common:viewYourJourney`)}
                      </div>
                    ) : (
                      !currentActivity && (
                        <UploadPhotoVideo
                          id={isAddSpiritSecondStepOpen}
                          activityType={type}
                        />
                      )
                    )}
                  </div>
                </div>
                {!isAddSpiritSecondStepOpen && (
                  <div
                    className="activity-modal-body-row"
                    style={{ display: `block` }}
                  >
                    <div className="field-label">
                      {t(`common:referenceOnePerActivity`)}
                    </div>

                    <button
                      className="activity-modal-body-row-text"
                      onClick={() => setReferenceModalVisible(true)}
                    >
                      {t(
                        `profile.student.extracurricularsScreen.requestReference`,
                      )}
                    </button>
                  </div>
                )}
                <div
                  className="activity-modal-body-row"
                  style={{ display: `block` }}
                >
                  <div className="field-label">
                    {t(`common:attachment15MBLimit`)}
                  </div>
                  {currentActivity && (
                    <div className="activity-modal-body-row-text">
                      <UploadAttachments
                        id={currentActivity.id}
                        activityType={currentActivity.type}
                        attachments={currentActivity.attachments}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {currentActivity && (
              <JourneyModal
                visible={
                  !!isJourneyModalOpen && currentActivity.journeys?.length
                }
                onClose={() => {
                  toggleJourneyModal(0)
                }}
                activity={currentActivity}
                editable
              />
            )}

            {currentSpirit && (
              <JourneyModal
                visible={!!isJourneyModalOpen && currentSpirit.journeys?.length}
                onClose={() => {
                  toggleJourneyModal(0)
                }}
                activity={currentSpirit}
                editable
              />
            )}

            {currentActivity && currentActivity.logo && (
              <UpdateLogoModal
                isOpen={isUploadActivityModalOpen}
                toggle={() =>
                  dispatch(actions.toggleUploadActivityLogoModal(false))
                }
                activityId={currentActivity.id}
                activityType={currentActivity.type}
                logo={currentActivity.logo}
              />
            )}
            <UnsavedChangesModal
              isOpen={isUnsavedModalOpen}
              footerLeaveAction={() => {
                toggleUnsavedModal(false)
                toggle()
                document.body.className = ``
              }}
              footerStayAction={() => {
                toggleUnsavedModal(false)
                setTimeout(() => {
                  document.body.className = `modal-open overflow-hidden`
                }, 100)
              }}
            />
          </div>
        }
        closeIcon={true}
        disabledFooterButton={
          isSubmitting &&
          !isAddActivitySecondStepOpen &&
          !isAddSpiritSecondStepOpen
        }
        footer={t(
          `common:${
            isAddActivitySecondStepOpen || isAddSpiritSecondStepOpen
              ? `finish`
              : `saveAndContinue`
          }`,
        )}
        footerAction={
          isAddActivitySecondStepOpen ||
          isAddSpiritSecondStepOpen ||
          currentSpirit
            ? () => {
                toggle()
                if (_.isEmpty(errors)) {
                  document.body.className = ``
                }
              }
            : () => handleSubmit()
        }
      />

      <AddReferenceModal
        visible={isReferenceModalVisible}
        onClose={() => setReferenceModalVisible(false)}
        activity={currentActivity}
        referenceType={ReferenceType.Activity}
      />

      <MessageModal
        title={t(`common:success`)}
        message={t(
          type === ActivityType.SPIRIT
            ? `common:spiritActivityCreated`
            : `common:activityCreated`,
        )}
        visible={isSuccessModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
        }}
      />
    </>
  )
}

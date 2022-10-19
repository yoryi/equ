import { useFormik } from "formik"
//Types
import { FormikErrors, FormikTouched } from "formik"
//Utils
import _ from "lodash"
import moment from "moment"
import React, { useEffect, useState } from "react"
//Hooks
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import AddReferenceModal from "../../components/AddReferenceModal"
import Datepicker from "../../components/DatePicker/Datepicker"
import FromToDatepicker from "../../components/DatePicker/FromToDatepicker"
//Components
import JourneyModal from "../../components/JourneyModal"
import MessageModal from "../../components/MessageModal"
import DeleteModal from "../../components/Modal/DeleteModal"
import Modal from "../../components/Modal/Modal"
import ReferenceModal from "../../components/ReferenceModal"
import SelectField from "../../components/SelectField/SelectField"
import TextArea from "../../components/TextField/TextArea"
import TextField from "../../components/TextField/TextField"
import UnsavedChangesModal from "../../components/UnsavedChangesModal/UnsavedChangesModal"
import i18n from "../../services/i18n"
import { actions } from "../../store"
import { ActivityType,ReduxState, Reference , ReferenceType } from "../../store/types"
import { UploadAttachments } from "./Attachments/UploadAttachments"
import { UploadPhotoVideo } from "./Journey/UploadPhotoVideo"
import { LogoUploader } from "./LogoUploader/LogoUploader"
import { UpdateLogoModal } from "./LogoUploader/UpdateLogoModal"

interface ActivityModalProps {
  isOpen: boolean
  toggle: () => void
  title: string
  activity: any
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

export const EditActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  toggle,
  title,
  activity,
}) => {
  const { activityTypes, isUploadActivityModalOpen } = useSelector(
    (state: any) => state.profile,
  )
  const reference = useSelector<ReduxState, Reference | null>(
    (state) =>
      state.profile.recognition?.references?.find(
        ({ referenceLink: { id } }) => id === activity.referenceLink?.id,
      ) ?? null,
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [isJourneyModalOpen, toggleJourneyModal] = useState(0)
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)
  const [isReferenceModalVisible, setReferenceModalVisible] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useState(false)
  const [isUnsavedModalOpen, toggleUnsavedModal] = useState(false)

  useEffect(() => {
    if (activityTypes) {
      return
    }
    isOpen &&
      (activity.type === ActivityType.ACADEMIC_ART ||
        activity.type === ActivityType.SPORTS_SPIRIT) &&
      dispatch(actions.getActivityTypes())
  }, [dispatch, activityTypes, activity.type, isOpen])

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
  ])

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(
        i18n.t(`errors:cannotBeEmpty`, { name: i18n.t(`common:activityName`) }),
      ),
    from:
      activity.type !== ActivityType.SPIRIT
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
      activity.type !== ActivityType.SPIRIT
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
  })

  const initialValues = useMemo<FormValues>(
    () => ({
      title: activity.title,
      categoryId: activity.categoryId
        ? activity.categoryId
        : activity.category && activity.category.id
        ? activity.category.id
        : 0,
      company: activity.company,
      month:
        activity.type === ActivityType.SPIRIT && activity.date
          ? moment(activity.date).month() + 1
          : null,
      year:
        activity.type === ActivityType.SPIRIT && activity.date
          ? moment(activity.date).year()
          : null,
      from: {
        month:
          moment(activity.startDate).month() === 0
            ? 12
            : moment(activity.startDate).month(),
        year:
          moment(activity.startDate).month() === 0
            ? moment(activity.startDate).year() - 1
            : moment(activity.startDate).year(),
      },
      to: activity.endDate
        ? {
            month:
              moment(activity.endDate).month() === 0
                ? 12
                : moment(activity.endDate).month(),
            year:
              moment(activity.endDate).month() === 0
                ? moment(activity.endDate).year() - 1
                : moment(activity.endDate).year(),
          }
        : null,
      description: activity.description,
      attachments: activity.attachments || [],
    }),
    [activity],
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
      { title, month, year, from, to, categoryId, company, description },
      { setErrors, setSubmitting },
    ) => {
      const date = month && year ? new Date(year, month - 1) : null
      const startDate = new Date(from.year!, from.month!)
      const endDate =
        to && to.month && to.year ? new Date(to.year, to.month) : null
      activity.type === ActivityType.SPIRIT
        ? dispatch(
            actions.updateSpirit({
              id: activity.id,
              title,
              date,
              description,
              type: activity.type,
              logo: activity.logo,
              journeys: activity.journeys,
            }),
          )
            .then(() => setSuccessModalVisible(true))
            .catch(({ errors }: { errors: { [field: string]: string } }) =>
              setErrors(errors),
            )
            .finally(() => setSubmitting(false))
        : dispatch(
            actions.updateActivity({
              id: activity.id,
              title,
              categoryId: categoryId!,
              company,
              startDate,
              endDate,
              description,
              type: activity.type,
              logo: activity.logo,
              journeys: activity.journeys,
              reference: activity.reference,
            }),
          )
            .then(() => {
              const showSuccessModal = !_.isEqual(
                {
                  title,
                  categoryId,
                  company,
                  month,
                  year,
                  from,
                  to,
                  description,
                },
                initialValues,
              )
              setSuccessModalVisible(showSuccessModal)
              if (!showSuccessModal) {
                toggle()
              }
            })
            .catch(({ errors }: { errors: { [field: string]: string } }) =>
              setErrors(errors),
            )
            .finally(() => setSubmitting(false))
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (activity && activity.journeys && activity.journeys.length === 0) {
      toggleJourneyModal(0)
    }
  }, [activity])

  useEffect(() => {
    resetForm()
  }, [isOpen])
  return (
    <>
      <Modal
        title={title}
        isOpen={
          isOpen &&
          !isReferenceModalVisible &&
          !isSuccessModalVisible &&
          !(!!isJourneyModalOpen && activity.journeys?.length)
        }
        toggle={() => {
          const oldStartDate = activity.startDate
            ? new Date(activity.startDate)
            : null
          const oldEndDate = activity.endDate
            ? new Date(activity.endDate)
            : null
          const newStartDate =
            values.from && values.from.year && values.from.month
              ? new Date(values.from.year, values.from.month)
              : null
          const newEndDate =
            values.to && values.to.year && values.to.month
              ? new Date(values.to.year, values.to.month)
              : null
          const spiritDate =
            activity && activity.date ? new Date(activity.date) : null
          const newSpiritStartDate =
            values.year && values.month
              ? new Date(values.year, values.month - 1)
              : null

          if (
            values.title === activity.title &&
            ((activity.category &&
              values.categoryId === activity.category.id) ||
              (activity.categoryId &&
                values.categoryId === activity.categoryId) ||
              (activity.type !== ActivityType.SPORTS_SPIRIT &&
                activity.type !== ActivityType.ACADEMIC_ART)) &&
            values.company === activity.company &&
            values.description === activity.description &&
            ((oldStartDate?.getTime() === newStartDate?.getTime() &&
              ((oldEndDate &&
                newEndDate &&
                oldEndDate.getTime() === newEndDate.getTime()) ||
                (!oldEndDate && !values.to))) ||
              (activity.type === ActivityType.SPIRIT &&
                newSpiritStartDate?.getTime() === spiritDate?.getTime()))
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
                onChange={handleChange(`title`)}
                value={values.title}
                placeholder={t(`common:activityName`)}
                title={t(`common:activityName`)}
              />
            </div>
            {(activity.type === ActivityType.ACADEMIC_ART ||
              activity.type === ActivityType.SPORTS_SPIRIT) &&
              activityTypes && (
                <div className="activity-modal-body-row">
                  <SelectField
                    onChange={(option: any) => {
                      setFieldValue(
                        `categoryId`,
                        activityTypes.find(
                          (it: any) => it.name === option.value,
                        )?.id,
                      )
                    }}
                    value={
                      values.categoryId
                        ? activityTypes.find(
                            (it: any) => it.id === values.categoryId,
                          )?.name
                        : ``
                    }
                    items={
                      activityTypes &&
                      activityTypes.length > 0 &&
                      activityTypes.filter(
                        (activityType: any) =>
                          activityType.type === activity.type,
                      )
                    }
                    title={t(`common:activityType`)}
                    placeholder={t(`common:activityType`)}
                  />
                </div>
              )}
            {(activity.type === ActivityType.INTERNSHIP ||
              activity.type === ActivityType.EMPLOYMENT ||
              activity.type === ActivityType.VOLUNTEER ||
              activity.type === ActivityType.ACTIVISM) && (
              <div className="activity-modal-body-row">
                <TextField
                  placeholder={t(`common:company`)}
                  title={t(`common:companyOrganizationName`)}
                  value={values.company}
                  onChange={handleChange(`company`)}
                />
              </div>
            )}
            <div className="activity-modal-body-row activity-modal-body-row-align-left">
              {activity.type === ActivityType.SPIRIT ? (
                <Datepicker
                  title={t(`common:date`)}
                  setFieldValue={setFieldValue}
                  fromMonth={values.month}
                  fromYear={values.year}
                  type="Month"
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
                      activity.type === ActivityType.EMPLOYMENT
                        ? `currentlyWorkHere`
                        : `currentlyParticipateInThisActivity`
                    }`,
                  )}
                />
              )}
            </div>
            <div className="activity-modal-body-row">
              <TextArea
                value={values.description}
                onChange={handleChange(`description`)}
                title={t(`common:description`)}
                placeholder={t(`common:description`)}
              />
            </div>
            {activity.type !== ActivityType.SPIRIT && (
              <div
                className="activity-modal-body-row"
                style={{ display: `block` }}
              >
                <div className="field-label">{t(`common:activityIcon`)}</div>
                <div className="activity-modal-body-row-text">
                  <LogoUploader
                    activityId={activity.id}
                    activityType={activity.type}
                    logo={activity.logo}
                  />
                </div>
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
                {activity.journeys && activity.journeys.length > 0 ? (
                  <div onClick={() => toggleJourneyModal(activity.id)}>
                    {t(`common:viewYourJourney`)}
                  </div>
                ) : (
                  <UploadPhotoVideo
                    id={activity.id}
                    activityType={activity.type}
                  />
                )}
              </div>
            </div>
            {activity.type !== ActivityType.SPIRIT && (
              <div
                className="activity-modal-body-row"
                style={{ display: `block` }}
              >
                <div className="field-label">
                  {t(`common:referenceOnePerActivity`)}
                </div>

                {!reference && (
                  <button
                    className="activity-modal-body-row-text"
                    onClick={() => setReferenceModalVisible(true)}
                  >
                    {t(
                      `profile.student.extracurricularsScreen.requestReference`,
                    )}
                  </button>
                )}

                {reference && (
                  <>
                    <span
                      className={`activity-modal-body-reference-name`}
                    >{`${reference?.firstName} ${reference?.lastName} (${reference?.position})`}</span>

                    <button
                      className={`activity-modal-body-row-text`}
                      onClick={() => setReferenceModalVisible(true)}
                    >
                      {t(
                        `profile.student.extracurricularsScreen.reviewReference`,
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
            <div
              className="activity-modal-body-row"
              style={{ display: `block` }}
            >
              <div className="field-label">
                {t(`common:attachment15MBLimit`)}
              </div>
              <div className="activity-modal-body-row-text">
                <UploadAttachments
                  id={activity.id}
                  activityType={activity.type}
                  attachments={activity.attachments}
                />
              </div>
            </div>

            <UpdateLogoModal
              isOpen={isUploadActivityModalOpen}
              toggle={() =>
                dispatch(actions.toggleUploadActivityLogoModal(false))
              }
              activityId={activity.id}
              activityType={activity.type}
              logo={activity.logo}
            />
          </div>
        }
        closeIcon={true}
        disabledFooterButton={isSubmitting}
        footer={t(`common:saveChanges`)}
        footerAction={() => {
          handleSubmit()
          if (_.isEmpty(errors)) {
            document.body.className = ``
          }
        }}
        deleteFooter={t(`common:deleteActivity`)}
        deleteAction={() => toggleDeleteModalOpen(true)}
        confirmDeletion={false}
        footerStyle={{ flexDirection: `column` }}
      />

      <JourneyModal
        visible={!!isJourneyModalOpen && activity.journeys?.length}
        onClose={() => {
          toggleJourneyModal(0)
          setTimeout(() => {
            document.body.className = `modal-open overflow-hidden`
          }, 100)
        }}
        activity={activity}
        editable
      />

      {!reference && (
        <AddReferenceModal
          visible={isReferenceModalVisible}
          onClose={() => setReferenceModalVisible(false)}
          referenceType={ReferenceType.Activity}
          activity={activity}
        />
      )}

      {reference && (
        <ReferenceModal
          reference={reference}
          visible={isReferenceModalVisible}
          onToggleVisibility={() =>
            setReferenceModalVisible(!isReferenceModalVisible)
          }
          viewType={`view`}
        />
      )}

      <MessageModal
        title={t(`common:success`)}
        message={t(`common:activityUpdated`)}
        visible={isSuccessModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
          toggle()
          document.body.className = ``
        }}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggle={() => toggleDeleteModalOpen(false)}
        footerAction={() => {
          activity.type === ActivityType.SPIRIT
            ? dispatch(
                actions.deleteSpirit({ id: activity.id, type: activity.type }),
              )
            : dispatch(
                actions.deleteActivity({
                  id: activity.id,
                  type: activity.type,
                }),
              )
          toggleDeleteModalOpen(false)
          toggle()
          document.body.className = ``
        }}
      />
      {isUnsavedModalOpen ? (
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
      ) : null}
    </>
  )
}
